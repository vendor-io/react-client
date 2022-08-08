FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:alpine AS host
WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 80