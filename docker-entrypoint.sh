#!/bin/sh
# Read server mode from shared volume, substitute RCON password,
# then exec ioq3ded with the appropriate fs_game and config.
#
# Modes:
#   "cpma"           - CPMA mod with VQ3 gameplay, map rotation via cfg-maps/
#   "excessiveplus"  - Excessive Plus v2.3 FreezeTag (g_gametype 8)
#   "baseq3"         - Vanilla Q3 FFA with vstr map rotation (default)

MODE_FILE="/shared/server-mode"
MODE="baseq3"
[ -f "$MODE_FILE" ] && MODE=$(cat "$MODE_FILE")

if [ "$MODE" = "cpma" ]; then
  CFG="/home/ioq3srv/ioquake3/cpma/server.cfg"
  GAME_ARGS="+set fs_game cpma +exec server.cfg"
elif [ "$MODE" = "excessiveplus" ]; then
  CFG="/home/ioq3srv/.q3a/excessiveplus/server.cfg"
  GAME_ARGS="+set fs_game excessiveplus +exec server.cfg"
else
  CFG="/home/ioq3srv/.q3a/baseq3/server.cfg"
  GAME_ARGS="+exec server.cfg"
fi

if [ -n "$RCON_PASSWORD" ]; then
  sed -i "s/__RCON_PASSWORD__/$RCON_PASSWORD/" "$CFG"
fi

exec /home/ioq3srv/ioquake3/ioq3ded $GAME_ARGS "$@"
