FROM repo-bootstrap as lunatrace-backend-base

RUN apt-get update && apt-get install -y wget curl make

RUN curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b /usr/local/bin

# copy the lunatrace cli from the locally built container
COPY --from=lunatrace-cli /lunatrace /usr/local/bin

WORKDIR /usr/repo/lunatrace/bsl/backend
RUN yarn run compile

FROM lunatrace-backend-base as backend-express-server
ENTRYPOINT ["/bin/bash", "-c","yarn start:prod || sleep 600"]

FROM lunatrace-backend-base as backend-queue-processor
ENTRYPOINT ["/bin/bash", "-c","yarn prod:worker || sleep 600"]
