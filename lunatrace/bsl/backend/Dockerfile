FROM node:16-slim as lunatrace-backend-base

RUN apt update
RUN apt install -y wget

RUN corepack enable

COPY --from=lunasec/lunatrace-cli:v0.0.5 /lunatrace /usr/local/bin

WORKDIR /common

COPY ./common/yarn.lock-workspace /common
COPY ./common/package.json /common
RUN mv yarn.lock-workspace yarn.lock
RUN CI=true yarn install --pure-lockfile
COPY ./common /common
RUN yarn run compile
RUN yarn link

WORKDIR /app

COPY ./backend/yarn.lock-workspace /app
COPY ./backend/package.json /app
RUN mv yarn.lock-workspace yarn.lock
RUN yarn link "@lunatrace/lunatrace-common"
RUN CI=true yarn install --pure-lockfile
COPY ./backend /app

RUN yarn run compile

ENV PORT 80

FROM lunatrace-backend-base as backend-express-server
ENTRYPOINT ["yarn", "start:prod"]

FROM lunatrace-backend-base as backend-queue-processor
ENTRYPOINT ["yarn","prod:sqs-listener"]
