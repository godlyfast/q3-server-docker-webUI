FROM alpine:latest as builder

# Build ioquake3 dedicated server
RUN \
  echo "# INSTALL DEPENDENCIES ##########################################" && \
  apk --no-cache add cmake curl g++ gcc git make && \
  mkdir -p /tmp/build && \
  echo "# FETCH COMPILE SCRIPT ##########################################" && \
  curl https://raw.githubusercontent.com/ioquake/ioq3/master/misc/linux/server_compile.sh -o /tmp/build/compile.sh && \
  echo "# COMPILE IOQUAKE3 #############################################" && \
  echo "y" | sh /tmp/build/compile.sh

# Install OSP mod
RUN \
  wget http://osp.dget.cc/orangesmoothie/downloads/osp-Quake3-1.03a_full.zip && \
  unzip osp-Quake3-1.03a_full.zip -d /root/ioquake3 && \
  rm osp-Quake3-1.03a_full.zip

FROM alpine:latest
RUN adduser ioq3srv -D

# Copy ioquake3 + OSP from builder
COPY --from=builder /root/ioquake3 /home/ioq3srv/ioquake3

# Copy all pk3 files (base game pak0-8, CPM maps, hires textures from Steam)
COPY ./build/*.pk3 /home/ioq3srv/ioquake3/baseq3/

# Copy server.cfg template (RCON password substituted at startup)
COPY ./server.cfg /home/ioq3srv/ioquake3/osp/server.cfg

# Copy entrypoint (substitutes env vars into server.cfg, then execs ioq3ded)
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Fix ownership so ioq3srv can write logs/configs
RUN chown -R ioq3srv:ioq3srv /home/ioq3srv/ioquake3

USER ioq3srv
EXPOSE 27960/udp
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["+set", "fs_game", "osp", "+exec", "server.cfg"]
