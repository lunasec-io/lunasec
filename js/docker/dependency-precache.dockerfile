FROM node:14 as lunasec-precached-dependencies

COPY ./ /repo

WORKDIR /repo

RUN yarn global add lerna

RUN lerna bootstrap

WORKDIR ../

RUN rm -rf /repo
