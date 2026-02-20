#!/bin/bash
# Build and push Q3 server images to homelab registry
# Usage: ./build.sh [--sync-data | --sync-only] [registry]
#
# Flags:
#   --sync-data   After building images, rsync game data to host
#   --sync-only   Only sync game data (skip image build/push)
#   (no flag)     Build and push images only (no data sync)
#
# Prerequisites:
#   - Steam Q3 installation at default path
#   - Podman or Docker available
#   - Registry accessible (insecure HTTP OK)

set -euo pipefail

SYNC_DATA=false
SYNC_ONLY=false

# Parse flags
while [[ "${1:-}" == --* ]]; do
    case "$1" in
        --sync-data) SYNC_DATA=true; shift ;;
        --sync-only) SYNC_ONLY=true; SYNC_DATA=true; shift ;;
        *) echo "Unknown flag: $1"; exit 1 ;;
    esac
done

REGISTRY="${1:-192.168.55.100:5000}"
HOST="${Q3_HOST:-192.168.55.100}"
HOST_DATA="/home/tim/q3-data"
Q3DIR="${Q3DIR:-$HOME/.local/share/Steam/steamapps/common/Quake 3 Arena/baseq3}"
Q3ROOT="${Q3DIR%/baseq3}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Q3 Server Docker Build ==="
echo "Registry: $REGISTRY"
echo "Q3 dir:   $Q3DIR"
echo "Sync:     $( $SYNC_ONLY && echo 'data only' || ($SYNC_DATA && echo 'images + data' || echo 'images only') )"
echo ""

# Step 1: Stage game files from Steam
echo "--- Staging game files from Steam ---"
if [ ! -f "$Q3DIR/pak0.pk3" ]; then
    echo "ERROR: pak0.pk3 not found at $Q3DIR"
    echo "Set Q3DIR to your Quake 3 baseq3 directory"
    exit 1
fi

# Server pk3s (base game + maps + hires textures the server needs)
mkdir -p "$SCRIPT_DIR/build"
for f in pak{0..8}.pk3 q3wpak1.pk3; do
    [ -f "$Q3DIR/$f" ] && cp "$Q3DIR/$f" "$SCRIPT_DIR/build/"
done
# CPM maps
cp "$Q3DIR"/map_cpm*.pk3 "$SCRIPT_DIR/build/" 2>/dev/null || true
# Hires textures
cp "$Q3DIR"/zzz_*.pk3 "$Q3DIR"/wtf-*.pk3 "$SCRIPT_DIR/build/" 2>/dev/null || true

echo "Staged $(ls "$SCRIPT_DIR/build/"*.pk3 2>/dev/null | wc -l) server pk3 files"

# CPMA pk3 for Docker build context (Dockerfile COPYs it into image)
cp "$Q3ROOT/cpma"/z-cpma-*.pk3 "$SCRIPT_DIR/" 2>/dev/null || true
echo "Staged CPMA pk3 for Docker build: $(ls "$SCRIPT_DIR"/z-cpma-*.pk3 2>/dev/null)"

# CPMA server files (pk3 + cfg-maps for host bind mount)
CPMA_STAGE="$SCRIPT_DIR/build/cpma"
mkdir -p "$CPMA_STAGE/cfg-maps"
cp "$Q3ROOT/cpma"/z-cpma-*.pk3 "$CPMA_STAGE/" 2>/dev/null || true
cp "$SCRIPT_DIR/cpma-cfg-maps/"*.txt "$CPMA_STAGE/cfg-maps/" 2>/dev/null || true
echo "Staged CPMA server files: pk3 + $(ls "$CPMA_STAGE/cfg-maps/"*.txt 2>/dev/null | wc -l) map list(s)"

# Frontend download pk3s (complete Q3 experience for clients)
DLDIR="$SCRIPT_DIR/ng-quake3-fe/downloads"
mkdir -p "$DLDIR" "$DLDIR/cpma"
# Base game paks
for f in pak{0..8}.pk3 q3wpak1.pk3; do
    [ -f "$Q3DIR/$f" ] && cp "$Q3DIR/$f" "$DLDIR/"
done
# CPM competition maps
cp "$Q3DIR"/map_cpm*.pk3 "$DLDIR/" 2>/dev/null || true
# HD textures (Q3Q, wtf-q3a, Kpax)
cp "$Q3DIR"/zzz_*.pk3 "$Q3DIR"/wtf-*.pk3 "$Q3DIR"/xcsv_bq3hi-res.pk3 "$DLDIR/" 2>/dev/null || true
# Custom Map 4K neural upscale textures
cp "$Q3DIR"/zz-q3-4x-textures.pk3 "$Q3DIR"/zzz-3w-4x-textures.pk3 "$DLDIR/" 2>/dev/null || true
cp "$Q3DIR"/zz-q3-4x-models.pk3 "$Q3DIR"/zz-q3-hqq.pk3 "$DLDIR/" 2>/dev/null || true
# HD weapons (CZ45 + BFG)
cp "$Q3DIR"/zzczhdwr*.pk3 "$Q3DIR"/zzczremBFG*.pk3 "$DLDIR/" 2>/dev/null || true
# Sounds (QC pack + QL announcer)
cp "$Q3DIR"/zzzz-Quake_Champions_Sounds.pk3 "$Q3DIR"/zzzz-QL-Default-Announcer.pk3 "$DLDIR/" 2>/dev/null || true
# Neural upscale players + objects, bug fixes, QL models + FX
cp "$Q3DIR"/pak9tup.pk3 "$Q3DIR"/pak9hqq37.pk3 "$DLDIR/" 2>/dev/null || true
cp "$Q3DIR"/pak9hdplayers.pk3 "$Q3DIR"/pak9hdobjects.pk3 "$DLDIR/" 2>/dev/null || true
cp "$Q3DIR"/ql-playermodels-ioquake3-ql.pk3 "$Q3DIR"/Xsprites.pk3 "$DLDIR/" 2>/dev/null || true
# CPMA mod
cp "$Q3ROOT/cpma"/z-cpma-*.pk3 "$DLDIR/cpma/" 2>/dev/null || true
echo "Staged $(find "$DLDIR" -name '*.pk3' | wc -l) download pk3 files"

# Build all-in-one zip (complete Q3 + enhancements + maps + CPMA)
echo "--- Building all-in-one download bundle ---"
ALL_IN_ONE="$DLDIR/q3-all-in-one.zip"
rm -f "$ALL_IN_ONE"
BUNDLE_DIR="$(mktemp -d -p "${TMPDIR:-$HOME/.cache/podman-tmp}")"
mkdir -p "$BUNDLE_DIR/baseq3" "$BUNDLE_DIR/cpma"
cp "$DLDIR"/*.pk3 "$BUNDLE_DIR/baseq3/"
cp "$DLDIR"/autoexec.cfg "$BUNDLE_DIR/baseq3/" 2>/dev/null || true
cp "$DLDIR"/cpma/*.pk3 "$BUNDLE_DIR/cpma/" 2>/dev/null || true
(cd "$BUNDLE_DIR" && zip -0 -r "$ALL_IN_ONE" baseq3/ cpma/)
rm -rf "$BUNDLE_DIR"
echo "Created $(du -h "$ALL_IN_ONE" | cut -f1) all-in-one bundle"

# Step 2: Build and push lean images (no game data baked in)
if ! $SYNC_ONLY; then
    export TMPDIR="${TMPDIR:-$HOME/.cache/podman-tmp}"
    mkdir -p "$TMPDIR"

    echo ""
    echo "--- Building q3-server (lean, no pk3s) ---"
    docker build -t "$REGISTRY/q3-server:latest" -f "$SCRIPT_DIR/Dockerfile" "$SCRIPT_DIR"

    echo ""
    echo "--- Building q3-backend ---"
    docker build -t "$REGISTRY/q3-backend:latest" -f "$SCRIPT_DIR/ng-quake3-be/Dockerfile" "$SCRIPT_DIR/ng-quake3-be/"

    echo ""
    echo "--- Building q3-frontend (lean, no downloads) ---"
    docker build -t "$REGISTRY/q3-frontend:latest" -f "$SCRIPT_DIR/ng-quake3-fe/Dockerfile" "$SCRIPT_DIR/ng-quake3-fe/"

    echo ""
    echo "--- Pushing images ---"
    docker push "$REGISTRY/q3-server:latest"
    docker push "$REGISTRY/q3-backend:latest"
    docker push "$REGISTRY/q3-frontend:latest"
fi

# Step 3: Sync game data to host via rsync
if $SYNC_DATA; then
    echo ""
    echo "--- Syncing game data to $HOST:$HOST_DATA ---"

    RSYNC_RSH="sshpass -p 123456 ssh -o StrictHostKeyChecking=no"
    SSH_CMD=(sshpass -p 123456 ssh -o StrictHostKeyChecking=no "tim@$HOST")

    echo "Syncing server pk3s..."
    rsync -avz --progress -e "$RSYNC_RSH" "$SCRIPT_DIR/build/"*.pk3 "tim@$HOST:$HOST_DATA/server/baseq3/"

    echo ""
    echo "Syncing CPMA server files (pk3 + cfg-maps)..."
    "${SSH_CMD[@]}" "mkdir -p '$HOST_DATA/server/cpma/cfg-maps'"
    rsync -avz --progress -e "$RSYNC_RSH" "$CPMA_STAGE/" "tim@$HOST:$HOST_DATA/server/cpma/"

    echo ""
    echo "Syncing download files..."
    rsync -avz --progress -e "$RSYNC_RSH" "$DLDIR/" "tim@$HOST:$HOST_DATA/downloads/"

    echo ""
    echo "Ensuring baseq3 symlink for sv_dlURL..."
    "${SSH_CMD[@]}" "cd '$HOST_DATA/downloads' && ln -sfn . baseq3"

    echo ""
    echo "--- Sync complete ---"
    echo "Server pk3s: $("${SSH_CMD[@]}" "ls '$HOST_DATA/server/baseq3/'*.pk3 2>/dev/null | wc -l")"
    echo "Download files: $("${SSH_CMD[@]}" "find '$HOST_DATA/downloads' -name '*.pk3' | wc -l") pk3s + zip + cfg"
fi

echo ""
echo "=== Done! ==="
if ! $SYNC_ONLY; then
    echo "Deploy via Portainer stack at https://192.168.55.100:9443"
    echo "See portainer-stack.yml for the compose file"
fi
if $SYNC_DATA; then
    echo "Game data synced to $HOST:$HOST_DATA"
fi
