FROM repo-bootstrap as lunatrace-backend-base

RUN apt-get update && apt-get install -y wget curl

COPY --from=lunasec/lunatrace-cli:v0.0.7 /lunatrace /usr/local/bin
RUN curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b /usr/local/bin

WORKDIR /usr/repo/lunatrace/bsl/backend
RUN yarn run compile

FROM lunatrace-backend-base as backend-express-server
ENTRYPOINT ["yarn", "start:prod"]

FROM lunatrace-backend-base as backend-queue-processor
ENTRYPOINT ["yarn", "prod:worker"]
