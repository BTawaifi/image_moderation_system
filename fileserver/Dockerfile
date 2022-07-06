FROM node:16.15.1 AS builder
WORKDIR /moderation_fileserver
COPY package*.json ./
RUN npm install
COPY tsconfig*.json src ./
RUN npm run build

FROM node:16.15.1

WORKDIR /moderation_fileserver
COPY package.json ./
RUN npm install --production
COPY --from=builder /moderation_fileserver/build ./build

#For Standalone
ENV FILESERVER_DOCKER_PORT=8080
ENV NODE_ENV=production

EXPOSE 8080
CMD node build/index.js