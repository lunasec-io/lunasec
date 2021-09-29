FROM node:14-alpine as lunasec-precached-dependencies

ENV NODE_OPTIONS "--unhandled-rejections=strict"

RUN apk update && apk add openjdk11 curl sqlite

COPY ./ /repo

WORKDIR /repo

RUN yarn global add lerna

RUN lerna bootstrap --ignore-scripts --ci

WORKDIR ../

RUN rm -rf /repo
