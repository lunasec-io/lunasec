FROM repo-bootstrap as lunatrace-backend-base

RUN apt-get update && apt-get install -y wget curl make

RUN curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b /usr/local/bin

# Build the lunatrace CLI
WORKDIR /usr/repo/lunatrace/cli/
RUN make lunatrace
RUN mv build/lunatrace /usr/local/bin

WORKDIR /usr/repo/lunatrace/bsl/backend
RUN yarn run compile

FROM lunatrace-backend-base as backend-express-server
ENTRYPOINT ["yarn", "start:prod"]

FROM lunatrace-backend-base as backend-queue-processor
ENTRYPOINT ["yarn", "prod:worker"]
