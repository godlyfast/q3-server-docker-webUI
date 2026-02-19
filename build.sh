#!/bin/bash
# Build and push Q3 server images to homelab registry
# Usage: ./build.sh [registry]
#
# Prerequisites:
#   - Steam Q3 installation at default path
#   - Podman or Docker available
#   - Registry accessible (insecure HTTP OK)

set -euo pipefail

REGISTRY="${1:-192.168.55.100:5000}"
Q3DIR="${Q3DIR:-$HOME/.local/share/Steam/steamapps/common/Quake 3 Arena/baseq3}"
Q3ROOT="${Q3DIR%/baseq3}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Q3 Server Docker Build ==="
echo "Registry: $REGISTRY"
echo "Q3 dir:   $Q3DIR"
echo ""

# Step 1: Copy game files
echo "--- Copying game files from Steam ---"
if [ ! -f "$Q3DIR/pak0.pk3" ]; then
    echo "ERROR: pak0.pk3 not found at $Q3DIR"
    echo "Set Q3DIR to your Quake 3 baseq3 directory"
    exit 1
fi

mkdir -p "$SCRIPT_DIR/build"
for f in pak{0..8}.pk3 q3wpak1.pk3; do
    [ -f "$Q3DIR/$f" ] && cp "$Q3DIR/$f" "$SCRIPT_DIR/build/"
done
# CPM maps
cp "$Q3DIR"/map_cpm*.pk3 "$SCRIPT_DIR/build/" 2>/dev/null || true
# Hires textures
cp "$Q3DIR"/zzz_*.pk3 "$Q3DIR"/wtf-*.pk3 "$SCRIPT_DIR/build/" 2>/dev/null || true

echo "Copied $(ls "$SCRIPT_DIR/build/"*.pk3 2>/dev/null | wc -l) pk3 files"

# Copy ALL pk3s for frontend download page (complete Q3 experience)
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
echo "Staged $(find "$DLDIR" -name '*.pk3' | wc -l) pk3 files for download page"

# Build all-in-one zip (complete Q3 + enhancements + maps + CPMA)
echo "--- Building all-in-one download bundle ---"
ALL_IN_ONE="$DLDIR/q3-all-in-one.zip"
rm -f "$ALL_IN_ONE"
BUNDLE_DIR="$(mktemp -d -p "${TMPDIR:-$HOME/.cache/podman-tmp}")"
mkdir -p "$BUNDLE_DIR/baseq3" "$BUNDLE_DIR/cpma"
cp "$DLDIR"/*.pk3 "$BUNDLE_DIR/baseq3/"
cp "$DLDIR"/cpma/*.pk3 "$BUNDLE_DIR/cpma/" 2>/dev/null || true
(cd "$BUNDLE_DIR" && zip -0 -r "$ALL_IN_ONE" baseq3/ cpma/)
rm -rf "$BUNDLE_DIR"
echo "Created $(du -h "$ALL_IN_ONE" | cut -f1) all-in-one bundle"

# Step 2: Build images
# Use disk-backed TMPDIR to avoid tmpfs size limits on large pk3 COPY layers
export TMPDIR="${TMPDIR:-$HOME/.cache/podman-tmp}"
mkdir -p "$TMPDIR"

echo ""
echo "--- Building q3-server ---"
docker build -t "$REGISTRY/q3-server:latest" -f "$SCRIPT_DIR/Dockerfile" "$SCRIPT_DIR"

echo ""
echo "--- Building q3-backend ---"
docker build -t "$REGISTRY/q3-backend:latest" -f "$SCRIPT_DIR/ng-quake3-be/Dockerfile" "$SCRIPT_DIR/ng-quake3-be/"

echo ""
echo "--- Building q3-frontend ---"
docker build -t "$REGISTRY/q3-frontend:latest" -f "$SCRIPT_DIR/ng-quake3-fe/Dockerfile" "$SCRIPT_DIR/ng-quake3-fe/"

# Step 3: Push
echo ""
echo "--- Pushing images ---"
docker push "$REGISTRY/q3-server:latest"
docker push "$REGISTRY/q3-backend:latest"
docker push "$REGISTRY/q3-frontend:latest"

echo ""
echo "=== Done! ==="
echo "Deploy via Portainer stack at https://192.168.55.100:9443"
echo "See portainer-stack.yml for the compose file"
