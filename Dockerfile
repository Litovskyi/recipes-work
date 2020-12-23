FROM node:12.16.1-alpine As builder

ENV ENV FIREBASE_TOOLS_VERSION=8.16.2

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g firebase-tools

RUN yarn global add firebase-tools@${FIREBASE_TOOLS_VERSION} && \
    yarn cache clean && \
   firebase -V && \
   mkdir $HOME/.cache

RUN apk --no-cache add openjdk8-jre bash curl nginx openssl nginx gettext
RUN firebase setup:emulators:database

RUN mkdir -p /firebase
RUN mkdir -p /run/nginx

COPY . .

RUN npm run build --prod

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/recipes-work/ /usr/share/nginx/html
