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

# Excessive Plus pk3s for Docker build context
# (excessiveplus-pk3s/ must exist in repo root — downloaded manually from ModDB)
if [ -d "$SCRIPT_DIR/excessiveplus-pk3s" ] && ls "$SCRIPT_DIR/excessiveplus-pk3s/"*.pk3 &>/dev/null; then
    echo "Found Excessive Plus pk3s for Docker build: $(ls "$SCRIPT_DIR/excessiveplus-pk3s/"*.pk3 | wc -l) files"
else
    echo "WARNING: excessiveplus-pk3s/ not found or empty — E+ mode will not work"
fi

# OSP mod for Docker build context
# (osp-mod/ must exist in repo root — see docs/q3-server.md for download instructions)
if [ -d "$SCRIPT_DIR/osp-mod" ] && ls "$SCRIPT_DIR/osp-mod/"*.pk3 &>/dev/null; then
    echo "Found OSP mod files for Docker build: $(ls "$SCRIPT_DIR/osp-mod/"*.pk3 | wc -l) pk3 files"
else
    echo "WARNING: osp-mod/ not found or empty — OSP mode will not work"
fi

# Generations Arena 0.99f for Docker build context
if [ -d "$SCRIPT_DIR/generations-mod" ] && ls "$SCRIPT_DIR/generations-mod/"*.pk3 &>/dev/null; then
    echo "Found Generations Arena pk3s for Docker build: $(ls "$SCRIPT_DIR/generations-mod/"*.pk3 | wc -l) files"
else
    echo "WARNING: generations-mod/ not found or empty — Generations mode will not work"
fi

# Ultra Freeze Tag 1.1 for Docker build context
if [ -d "$SCRIPT_DIR/ufreeze-mod" ] && ls "$SCRIPT_DIR/ufreeze-mod/"*.pk3 &>/dev/null; then
    echo "Found Ultra Freeze Tag pk3s for Docker build: $(ls "$SCRIPT_DIR/ufreeze-mod/"*.pk3 | wc -l) files"
else
    echo "WARNING: ufreeze-mod/ not found or empty — UFreeze mode will not work"
fi

# PainKeep Arena 3.0 for Docker build context
if [ -d "$SCRIPT_DIR/pkarena-mod" ] && ls "$SCRIPT_DIR/pkarena-mod/"*.pk3 &>/dev/null; then
    echo "Found PainKeep Arena pk3s for Docker build: $(ls "$SCRIPT_DIR/pkarena-mod/"*.pk3 | wc -l) files"
else
    echo "WARNING: pkarena-mod/ not found or empty — PainKeep mode will not work"
fi

# Frontend download pk3s (complete Q3 experience for clients)
DLDIR="$SCRIPT_DIR/ng-quake3-fe/downloads"
mkdir -p "$DLDIR" "$DLDIR/cpma" "$DLDIR/excessiveplus" "$DLDIR/osp" "$DLDIR/generations" "$DLDIR/ufreeze" "$DLDIR/pkarena"
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
# Excessive Plus mod (all 4 cumulative pk3s)
cp "$SCRIPT_DIR/excessiveplus-pk3s/"*.pk3 "$DLDIR/excessiveplus/" 2>/dev/null || true
# OSP mod (1.03a + OSP2-BE)
cp "$SCRIPT_DIR/osp-mod/"*.pk3 "$DLDIR/osp/" 2>/dev/null || true
# Generations Arena
cp "$SCRIPT_DIR/generations-mod/"*.pk3 "$DLDIR/generations/" 2>/dev/null || true
# Ultra Freeze Tag
cp "$SCRIPT_DIR/ufreeze-mod/"*.pk3 "$DLDIR/ufreeze/" 2>/dev/null || true
# PainKeep Arena
cp "$SCRIPT_DIR/pkarena-mod/"*.pk3 "$DLDIR/pkarena/" 2>/dev/null || true
echo "Staged $(find "$DLDIR" -name '*.pk3' | wc -l) download pk3 files"

# Build all-in-one zip (complete Q3 + enhancements + maps + CPMA)
echo "--- Building all-in-one download bundle ---"
ALL_IN_ONE="$DLDIR/q3-all-in-one.zip"
rm -f "$ALL_IN_ONE"
BUNDLE_DIR="$(mktemp -d -p "${TMPDIR:-$HOME/.cache/podman-tmp}")"
mkdir -p "$BUNDLE_DIR/baseq3" "$BUNDLE_DIR/cpma" "$BUNDLE_DIR/excessiveplus" "$BUNDLE_DIR/osp" "$BUNDLE_DIR/generations" "$BUNDLE_DIR/ufreeze" "$BUNDLE_DIR/pkarena"
cp "$DLDIR"/*.pk3 "$BUNDLE_DIR/baseq3/"
cp "$DLDIR"/autoexec.cfg "$BUNDLE_DIR/baseq3/" 2>/dev/null || true
cp "$DLDIR"/cpma/*.pk3 "$BUNDLE_DIR/cpma/" 2>/dev/null || true
cp "$DLDIR"/excessiveplus/*.pk3 "$BUNDLE_DIR/excessiveplus/" 2>/dev/null || true
cp "$DLDIR"/osp/*.pk3 "$BUNDLE_DIR/osp/" 2>/dev/null || true
cp "$DLDIR"/generations/*.pk3 "$BUNDLE_DIR/generations/" 2>/dev/null || true
cp "$DLDIR"/ufreeze/*.pk3 "$BUNDLE_DIR/ufreeze/" 2>/dev/null || true
cp "$DLDIR"/pkarena/*.pk3 "$BUNDLE_DIR/pkarena/" 2>/dev/null || true
(cd "$BUNDLE_DIR" && zip -0 -r "$ALL_IN_ONE" baseq3/ cpma/ excessiveplus/ osp/ generations/ ufreeze/ pkarena/)
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
    echo "Syncing Excessive Plus files..."
    "${SSH_CMD[@]}" "mkdir -p '$HOST_DATA/server/excessiveplus'"
    rsync -avz --progress -e "$RSYNC_RSH" "$SCRIPT_DIR/excessiveplus-pk3s/" "tim@$HOST:$HOST_DATA/server/excessiveplus/"

    echo ""
    echo "Syncing OSP files..."
    "${SSH_CMD[@]}" "mkdir -p '$HOST_DATA/server/osp'"
    rsync -avz --progress -e "$RSYNC_RSH" "$SCRIPT_DIR/osp-mod/" "tim@$HOST:$HOST_DATA/server/osp/"

    echo ""
    echo "Syncing Generations Arena files..."
    "${SSH_CMD[@]}" "mkdir -p '$HOST_DATA/server/generations'"
    rsync -avz --progress -e "$RSYNC_RSH" "$SCRIPT_DIR/generations-mod/" "tim@$HOST:$HOST_DATA/server/generations/"

    echo ""
    echo "Syncing Ultra Freeze Tag files..."
    "${SSH_CMD[@]}" "mkdir -p '$HOST_DATA/server/ufreeze'"
    rsync -avz --progress -e "$RSYNC_RSH" "$SCRIPT_DIR/ufreeze-mod/" "tim@$HOST:$HOST_DATA/server/ufreeze/"

    echo ""
    echo "Syncing PainKeep Arena files..."
    "${SSH_CMD[@]}" "mkdir -p '$HOST_DATA/server/pkarena'"
    rsync -avz --progress -e "$RSYNC_RSH" "$SCRIPT_DIR/pkarena-mod/" "tim@$HOST:$HOST_DATA/server/pkarena/"

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
