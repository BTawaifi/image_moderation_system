FROM node:16.15.1 AS builder
WORKDIR /moderation_backend
COPY package*.json ./
RUN npm install
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:16.15.1

WORKDIR /moderation_backend
COPY package.json ./
RUN npm install --production

COPY --from=builder /moderation_backend/build ./build

#For Standalone
ENV MYSQL_HOST = "localhost"
ENV MYSQL_LOCAL_PORT = "3306"
ENV MYSQL_USERNAME = "root"
ENV MYSQL_PASSWORD = "root"
ENV MYSQL_DATABASE = "moderation_db"
ENV BACKEND_LOCAL_PORT = "3000"
ENV PREFILTER_API_USER = ""
ENV PREFILTER_API_SECRET = ""
ENV FILESERVER_HOST = "http://localhost"
ENV FILESERVER_LOCAL_PORT = "8080"

EXPOSE 3000
CMD node build/index.js