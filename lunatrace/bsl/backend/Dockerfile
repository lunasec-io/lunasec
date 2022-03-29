FROM node:16-slim as lunatrace-backend-base

RUN apt update
RUN apt install -y wget

RUN corepack enable

COPY --from=lunasec/lunatrace-cli:v0.0.3 /lunatrace /usr/local/bin

COPY . /app
WORKDIR /app

RUN mv yarn.lock-workspace yarn.lock

RUN CI=true yarn install --pure-lockfile

RUN yarn run compile

ENV PORT 80

FROM lunatrace-backend-base as backend-express-server
ENTRYPOINT ["yarn", "start:prod"]

FROM lunatrace-backend-base as backend-queue-processor
ENTRYPOINT ["yarn","prod:sqs-listener"]
