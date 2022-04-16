FROM lunasec/precached-dependencies:v1.0.1 as lerna-bootstrap

COPY . /repo

WORKDIR /repo

RUN node -v

RUN yarn install --immutable

RUN yarn run compile:dev:sdks

RUN cd lunatrace/bsl/common && yarn run compile

# Increases the amount of memory that node can use, which is needed for our massive linting job.
ENV NODE_OPTIONS="--max-old-space-size=8192"

FROM lerna-bootstrap as application-back-end

WORKDIR /repo/lunadefend/js/demo-apps/packages/demo-back-end

ENTRYPOINT ["sh", "/repo/go/scripts/wait-for-file.sh", "/outputs/aws_resources.json", "yarn", "start:prod"]

FROM lerna-bootstrap as application-front-end

# These are required to bake the image at build time (we're compiling assets statically)
ARG REACT_APP_EXPRESS_URL
ARG REACT_APP_GRAPHQL_URL
ARG REACT_APP_TOKENIZER_URL
ARG REACT_APP_SIMPLE_TOKENIZER_URL

WORKDIR /repo/lunadefend/js/demo-apps/packages/react-front-end

RUN yarn run build

CMD ["serve-static", "-l", "3000"]
ENTRYPOINT ["yarn", "run"]

FROM lerna-bootstrap as lunasec-cli

# Overwrite this when calling docker from CI
ENV HOST_MACHINE_PWD=""

ENV DOCKER_BUILDKIT="1"

WORKDIR /repo

# This is required because we aren't able to pass additional command arguments via Docker-Compose unless we are invoking
# via the "exec" Entrypoint syntax. This lets us then expand environment variables at runtime.
# This gives a better explanation: https://stackoverflow.com/questions/49133234/docker-entrypoint-with-env-variable-and-optional-arguments
ENTRYPOINT ["sh", "/repo/js/sdks/packages/cli/scripts/docker-entrypoint.sh"]

FROM cypress/included:9.1.0 as integration-test

RUN apt update && apt install -y xvfb

ENV VERBOSE_CYPRESS_LOGS="always"

COPY --from=lerna-bootstrap /repo /repo

WORKDIR /repo/

ENTRYPOINT /repo/tools/service-scripts/wait-for-services.sh "$DEPENDENCIES__INTEGRATION_TEST" yarn run test:e2e:docker

FROM lerna-bootstrap as secure-frame-iframe

WORKDIR /repo/js/sdks/packages/secure-frame-iframe

RUN yarn run compile

RUN npm i -g http-server

CMD ["-a", "0.0.0.0", "-p", "8000"]
ENTRYPOINT ["http-server"]
