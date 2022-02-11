FROM node:16-slim

COPY . /app
WORKDIR /app

RUN mv yarn.lock-workspace yarn.lock

RUN yarn install

RUN yarn run compile

ENV PORT 80

ENTRYPOINT ["yarn", "start:prod"]
