# Pulls from this cache with multiple build requirements like java and aws, not just npm
FROM lunasec/cached-npm-dependencies:v0.0.10 as lerna-bootstrap

COPY . /repo

WORKDIR /repo

# Uncomment to make replicable builds
RUN lerna bootstrap --ci
# Do this because this package isnt part of the lerna-bootstrap but we still need to lint it
RUN cd js/internal-infrastructure/metrics-server-backend && yarn install
# Do this to save space
RUN yarn cache clean --all

RUN npm rebuild sqlite3

RUN yarn run compile:dev:sdks

FROM lerna-bootstrap as application-back-end

WORKDIR /repo/js/demo-apps/packages/demo-back-end

ENTRYPOINT ["yarn", "start:dev"]

FROM lerna-bootstrap as application-front-end

RUN yarn global add serve

# These are required to bake the image at build time (we're compiling assets statically)
ARG REACT_APP_EXPRESS_URL
ARG REACT_APP_GRAPHQL_URL
ARG REACT_APP_TOKENIZER_URL
ARG REACT_APP_SIMPLE_TOKENIZER_URL

WORKDIR /repo/js/demo-apps/packages/react-front-end

RUN yarn run build

ENTRYPOINT ["yarn", "run", "serve-static", "-l", "3000"]

FROM lerna-bootstrap as lunasec-cli
# Overwrite this when calling docker from CI
ENV HOST_MACHINE_PWD=""

WORKDIR /repo/js/sdks/packages/cli

WORKDIR /repo

# This is required because we aren't able to pass additional command arguments via Docker-Compose unless we are invoking
# via the "exec" Entrypoint syntax. This lets us then expand environment variables at runtime.
# This gives a better explanation: https://stackoverflow.com/questions/49133234/docker-entrypoint-with-env-variable-and-optional-arguments
ENTRYPOINT ["bash", "/repo/js/sdks/packages/cli/scripts/docker-entrypoint.sh"]

FROM cypress/included:8.0.0 as integration-test

RUN apt update && apt install -y xvfb

# RUN cypress install --force

ENV VERBOSE_CYPRESS_LOGS="always"

COPY --from=lerna-bootstrap /repo /repo

WORKDIR /repo/

# We would use test:all but couldn't easily get golang into this container, so those run on bare box
ENTRYPOINT /repo/tools/service-scripts/wait-for-services.sh "$DEPENDENCIES__INTEGRATION_TEST" yarn run test:e2e:docker

FROM lerna-bootstrap as secure-frame-iframe

WORKDIR /repo/js/sdks/packages/secure-frame-iframe

RUN yarn run compile

RUN npm i -g http-server

CMD ["-a", "0.0.0.0", "-p", "8000"]
ENTRYPOINT ["http-server"]