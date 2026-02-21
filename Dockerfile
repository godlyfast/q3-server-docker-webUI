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

FROM alpine:latest
RUN adduser ioq3srv -D

# Copy ioquake3 from builder
COPY --from=builder /root/ioquake3 /home/ioq3srv/ioquake3

# baseq3 dir populated via host bind mount (pk3s synced by build.sh)
RUN mkdir -p /home/ioq3srv/ioquake3/baseq3

# Install CPMA mod (pk3 staged by build.sh from Steam install)
RUN mkdir -p /home/ioq3srv/ioquake3/cpma
COPY z-cpma-pak153.pk3 /home/ioq3srv/ioquake3/cpma/

# Copy CPMA server.cfg template (RCON password substituted at startup)
COPY ./server.cfg /home/ioq3srv/ioquake3/cpma/server.cfg

# Install Excessive Plus mod (4 cumulative pk3s downloaded manually, see docs/q3-server.md)
RUN mkdir -p /home/ioq3srv/ioquake3/excessiveplus
COPY excessiveplus-pk3s/ /home/ioq3srv/ioquake3/excessiveplus/

# Copy vanilla server.cfg to fs_homepath (not covered by baseq3 bind mount)
RUN mkdir -p /home/ioq3srv/.q3a/baseq3
COPY ./server-baseq3.cfg /home/ioq3srv/.q3a/baseq3/server.cfg

# Copy E+ server.cfg to fs_homepath (not covered by excessiveplus bind mount)
RUN mkdir -p /home/ioq3srv/.q3a/excessiveplus
COPY ./server-excessiveplus.cfg /home/ioq3srv/.q3a/excessiveplus/server.cfg

# Copy entrypoint (reads mode from /shared, substitutes env vars, execs ioq3ded)
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Fix ownership so ioq3srv can write logs/configs
RUN chown -R ioq3srv:ioq3srv /home/ioq3srv/ioquake3 /home/ioq3srv/.q3a

USER ioq3srv
EXPOSE 27960/udp
ENTRYPOINT ["docker-entrypoint.sh"]
CMD []
