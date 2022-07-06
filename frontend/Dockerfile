FROM node:16.15.1 as builder
WORKDIR /moderation_frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#For Standalone
ENV NODE_ENV=production
ENV PORT=8000
ENV GENERATE_SOURCEMAP=false

FROM nginx
COPY --from=builder /moderation_frontend/build /usr/share/nginx/html