FROM node:14-alpine as lunasec-precached-dependencies

ENV NODE_OPTIONS "--unhandled-rejections=strict"

RUN apk update && apk add openjdk11 curl

COPY ./ /repo

WORKDIR /repo

RUN yarn global add lerna

RUN lerna bootstrap

WORKDIR ../

RUN rm -rf /repo
