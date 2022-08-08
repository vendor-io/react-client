FROM node:16 AS builder
WORKDIR /app
COPY . .

RUN --mount=type=secret,id=VITE_BACKEND_SERVER \
   --mount=type=secret,id=VITE_DOMAIN \
   --mount=type=secret,id=VITE_FIREBASE_API_KEY \
   --mount=type=secret,id=VITE_FIREBASE_AUTH_DOMAIN \
   --mount=type=secret,id=VITE_FIREBASE_PROJECT_ID \
   --mount=type=secret,id=VITE_FIREBASE_STORAGE_BUCKET \
   --mount=type=secret,id=VITE_FIREBASE_MESSAGING_SENDER_ID \
   --mount=type=secret,id=VITE_FIREBASE_APP_ID \
   --mount=type=secret,id=VITE_STRIPE_KEY \
   --mount=type=secret,id=VITE_STRIPE_SECRET \
   echo "VITE_BACKEND_SERVER=$(cat /run/secrets/VITE_BACKEND_SERVER)" \
   "VITE_DOMAIN=$(cat /run/secrets/VITE_DOMAIN)" \
   "VITE_FIREBASE_API_KEY=$(cat /run/secrets/VITE_FIREBASE_API_KEY)" \
   "VITE_FIREBASE_AUTH_DOMAIN=$(cat /run/secrets/VITE_FIREBASE_AUTH_DOMAIN)" \
   "VITE_FIREBASE_PROJECT_ID=$(cat /run/secrets/VITE_FIREBASE_PROJECT_ID)" \
   "VITE_FIREBASE_STORAGE_BUCKET=$(cat /run/secrets/VITE_FIREBASE_STORAGE_BUCKET)" \
   "VITE_FIREBASE_MESSAGING_SENDER_ID=$(cat /run/secrets/VITE_FIREBASE_MESSAGING_SENDER_ID)" \
   "VITE_FIREBASE_APP_ID=$(cat /run/secrets/VITE_FIREBASE_APP_ID)" \
   "VITE_STRIPE_KEY=$(cat /run/secrets/VITE_STRIPE_KEY)" \
   "VITE_STRIPE_SECRET=$(cat /run/secrets/VITE_STRIPE_SECRET)" > .env

RUN yarn install && yarn build

FROM nginx:alpine AS host
WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 80