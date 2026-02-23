# STAGE 1: Build Angular app
FROM node:14-alpine as builder

WORKDIR /ng-app

# git needed for buble dependency (popper → buble from GitHub)
# Force HTTPS instead of SSH for GitHub clones (no SSH keys in container)
RUN apk --no-cache add git && \
    git config --global url."https://github.com/".insteadOf "ssh://git@github.com/" && \
    git config --global url."https://github.com/".insteadOf "git@github.com:"

# Copy vendored source
COPY ./src-vendored/ .

# Install and build (Angular 7 works on Node 10-14)
RUN npm ci --legacy-peer-deps && \
    npm run ng build -- --prod --output-path=dist

# STAGE 2: Serve with nginx
FROM nginx:1.24-alpine

# Copy nginx config
COPY nginx/*.conf /etc/nginx/conf.d/

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app from builder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

# downloads dir populated via host bind mount (pk3s synced by build.sh)
RUN mkdir -p /usr/share/nginx/html/downloads

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
