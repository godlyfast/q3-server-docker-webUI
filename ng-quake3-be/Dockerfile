# Backend REST API + Socket.io RCON bridge
FROM node:14-alpine

WORKDIR /app

# Copy vendored source
COPY ./src-vendored/ .

# Install dependencies (legacy peer deps for 2019-era packages)
RUN npm ci --legacy-peer-deps && \
    npm run build

EXPOSE 9009
CMD ["npm", "start"]
