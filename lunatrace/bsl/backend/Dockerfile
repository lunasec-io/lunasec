FROM node:16-slim

RUN apt update
RUN apt install -y wget

RUN corepack enable

COPY . /app
WORKDIR /app

RUN mv yarn.lock-workspace yarn.lock

RUN CI=true yarn install --pure-lockfile

RUN yarn run compile

ENV PORT 80

ENTRYPOINT ["yarn", "start:prod"]
