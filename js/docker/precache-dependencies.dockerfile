FROM openjdk:18-alpine3.15 as lunasec-precache-dependencies

ENV NODE_OPTIONS "--unhandled-rejections=strict"
ENV CI "true"

RUN apk add --no-cache sqlite jq nodejs npm bash curl

RUN npm install -g yarn

COPY . /repo

WORKDIR /repo

RUN node -v

RUN yarn install --immutable

RUN rm -rf /repo
