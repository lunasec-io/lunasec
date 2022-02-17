FROM node:16-slim

RUN corepack enable
RUN npm install -g yarn@2

COPY . /app
WORKDIR /app

RUN mv yarn.lock-workspace yarn.lock

RUN yarn install

RUN yarn run compile

ENV PORT 80

ENTRYPOINT ["yarn", "start:prod"]
