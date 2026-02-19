# Q3 Server Docker + Web UI

Quake 3 Arena dedicated server with a web-based admin dashboard. Forked from [kalik1/q3-server-docker-webUI](https://github.com/kalik1/q3-server-docker-webUI) with vendored dependencies, fixed Dockerfiles, and custom server config.

![Screenshot](screenshot_q3.png)
![Screenshot](screenshot_q3_map.png)

## Architecture

3-service Docker stack:

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| `quake3` | `q3-server` | 27960/udp | ioquake3 dedicated server + OSP mod |
| `ng-quake3-be` | `q3-backend` | 9009 (internal) | Node.js REST API + Socket.io RCON bridge |
| `ng-quake3-fe` | `q3-frontend` | 8080/tcp | Angular web UI + game file downloads served by nginx |

## Prerequisites

- **Quake 3 Arena** installed via Steam (need `pak0.pk3` at minimum)
- **Podman** or **Docker** on the build machine
- **Docker registry** accessible at your target (default: `192.168.55.100:5000`)
- **Portainer** (optional) for stack deployment

## Quick Start

```bash
# 1. Clone
git clone https://github.com/godlyfast/q3-server-docker-webUI.git
cd q3-server-docker-webUI

# 2. Set your Q3 path if not default Steam location
export Q3DIR="$HOME/.local/share/Steam/steamapps/common/Quake 3 Arena/baseq3"

# 3. Edit server.cfg — set rconPassword, server name, etc.
vim server.cfg

# 4. Build and push all 3 images
./build.sh                     # Default registry: 192.168.55.100:5000
./build.sh myregistry:5000     # Override registry

# 5. Deploy via Portainer (paste portainer-stack.yml) or docker compose
#    Make sure Q3SERV_PASS in the stack matches rconPassword in server.cfg
```

## What build.sh Does

1. Copies pk3 files from your Steam Q3 installation (base paks, CPM maps, hires textures, enhancements)
2. Copies **all 68 baseq3 pk3s + CPMA mod** into `ng-quake3-fe/downloads/` for the client download page
3. Builds a 5.4 GB all-in-one zip (`q3-all-in-one.zip`) with `baseq3/` and `cpma/` directories
4. Builds all 3 Docker images (game server compiles ioquake3 from C source)
5. Pushes to the specified registry

## Game Files

The `build/` directory is populated by `build.sh` at build time for the **game server**. The `ng-quake3-fe/downloads/` directory holds the **complete client download bundle**. Neither is checked into git (too large).

### Server (build/)
- `pak0.pk3` - `pak8.pk3` — Base game + official patches
- `q3wpak1.pk3` — Point release data
- `map_cpm*.pk3` — 38 CPM competition maps
- `zzz_*.pk3`, `wtf-*.pk3` — Hires texture packs

### Client Downloads (ng-quake3-fe/downloads/)

All files served by nginx at `/downloads/` with `Content-Disposition: attachment`:

| Category | Files | Size |
|----------|-------|------|
| Base game | pak0-pak8, q3wpak1 | ~530 MB |
| CPM maps | 38 `map_cpm*.pk3` files | ~100 MB |
| HD textures | Q3Q HD 4x, wtf-q3a v3, Kpax Hires | ~1.4 GB |
| 4K neural textures | Custom Map 4K (maps, models, 3rd party) | ~2.9 GB |
| HD weapons | CZ45 weapons + BFG remodel | ~22 MB |
| Sounds | QC Sounds pack + QL Announcer | ~23 MB |
| Neural upscale | HD Players + HD Objects | ~340 MB |
| Bug fixes/HUD | TUP + HQQ | ~29 MB |
| QL content | QL Player Models + FX Replacer | ~200 MB |
| CPMA mod | z-cpma-pak153.pk3 (in `cpma/` subdir) | ~16 MB |
| **All-in-one zip** | **q3-all-in-one.zip** (baseq3/ + cpma/) | **~5.4 GB** |

## Download Page

The web UI at `/download` provides a complete setup page for LAN players with 6 rows of cards:

1. **Quick Start** — All-in-one bundle (5.4 GB) with everything included
2. **Game Data + Windows + macOS** — pak0.pk3 + ioquake3 engine downloads
3. **Linux/Steam Deck + Android + OSP** — platform engines + competitive mod
4. **HD Textures + HD Weapons + QC Sounds** — visual and audio enhancements
5. **Neural Upscale + Bug Fixes + QL Models** — AI upscaled textures + patches
6. **4K Neural Textures + CPMA Mod + CPM Maps** — ultimate quality + competitive mode

All enhancement pk3s are self-hosted (no external ModDB dependency). Individual files can be downloaded separately or grab the all-in-one zip for the complete experience.

## Server Config

`server.cfg` is baked into the game server image at `/home/ioq3srv/ioquake3/osp/server.cfg`. Key settings:

- **Game type**: FFA (g_gametype 0)
- **sv_pure**: 0 (required for hires textures — clients don't need matching pk3s)
- **Bot fill**: 4 minimum players
- **Mod**: OSP (Orange Smoothie Productions)
- **Map rotation**: 10-map cycle via `vstr` chain

To change the config, edit `server.cfg`, rebuild the game server image, and redeploy.

## Insecure Registry Setup

If using an HTTP (non-TLS) registry, configure both build and target machines:

**Podman** (build machine) — `/etc/containers/registries.conf.d/01-registry.conf`:
```ini
[[registry]]
location = "192.168.55.100:5000"
insecure = true
```

**Docker** (target host) — `/etc/docker/daemon.json`:
```json
{"insecure-registries": ["192.168.55.100:5000"]}
```

## Known Build Issues

| Issue | Fix |
|-------|-----|
| `no space left on device` during game server build | Podman uses tmpfs for layers. `build.sh` sets `TMPDIR=~/.cache/podman-tmp` to use disk instead |
| `ENOENT spawn git` during frontend build | Frontend Dockerfile includes `apk add git` for buble npm dependency |
| ioquake3 binary name wrong | CMake builds install as `ioq3ded` (not `ioq3ded.x86_64` like old Makefile builds) |

## Security Notes

- `server.cfg` in this repo uses placeholder `CHANGEME` for rconPassword — set the real password before building
- `portainer-stack.yml` also uses `CHANGEME` for `Q3SERV_PASS` — update when deploying
- **Do NOT expose port 8080 to the internet** — the web UI has no authentication and gives full RCON control
- Only forward **UDP 27960** for internet play

## Credits

- Original project: [kalik1/q3-server-docker-webUI](https://github.com/kalik1/q3-server-docker-webUI)
- Backend: [kalik1/q3-server-docker-rest-api](https://github.com/kalik1/q3-server-docker-rest-api)
- Frontend: [kalik1/q3-server-docker-webUI-angular](https://github.com/kalik1/q3-server-docker-webUI-angular)
- Game engine: [ioquake3](https://github.com/ioquake/ioq3)
- Mod: OSP (Orange Smoothie Productions) — original site defunct
