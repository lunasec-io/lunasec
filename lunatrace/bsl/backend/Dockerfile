FROM node:16-slim

COPY . /app
WORKDIR /app/lunatrace/bsl/backend

RUN yarn run compile

ENTRYPOINT ["yarn", "start:prod"]
