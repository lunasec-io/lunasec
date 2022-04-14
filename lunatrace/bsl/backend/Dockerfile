FROM repo-bootstrap as lunatrace-backend-base

RUN apt-get update && apt-get install -y wget

COPY --from=lunasec/lunatrace-cli:v0.0.6 /lunatrace /usr/local/bin

WORKDIR /usr/repo/lunatrace/bsl/backend
RUN yarn run compile

ENV PORT 80

FROM lunatrace-backend-base as backend-express-server
ENTRYPOINT ["yarn", "start:prod"]

FROM lunatrace-backend-base as backend-queue-processor
ENTRYPOINT ["yarn", "prod:worker"]
