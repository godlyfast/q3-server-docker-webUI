#!/bin/sh
# Substitute environment variables into server.cfg, then exec ioq3ded.
# This lets the RCON password live in the compose/stack env instead of
# being baked into the image at build time.

CFG="/home/ioq3srv/ioquake3/osp/server.cfg"

if [ -n "$RCON_PASSWORD" ]; then
  sed -i "s/__RCON_PASSWORD__/$RCON_PASSWORD/" "$CFG"
fi

exec /home/ioq3srv/ioquake3/ioq3ded "$@"
