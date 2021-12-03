FROM openjdk:18-alpine3.15 as lerna-bootstrap

ENV NODE_OPTIONS "--unhandled-rejections=strict"
ENV RUNNING_IN_CI "true"
ENV CI "true"

RUN apk add --no-cache sqlite jq nodejs npm bash curl

RUN npm install -g yarn

COPY . /repo

WORKDIR /repo

RUN node -v

RUN yarn install --immutable

RUN yarn run compile:dev:sdks

FROM lerna-bootstrap as application-back-end

WORKDIR /repo/js/demo-apps/packages/demo-back-end

ENTRYPOINT ["sh", "/repo/go/scripts/wait-for-file.sh", "/outputs/aws_resources.json", "yarn", "start:dev"]

FROM lerna-bootstrap as application-front-end

# These are required to bake the image at build time (we're compiling assets statically)
ARG REACT_APP_EXPRESS_URL
ARG REACT_APP_GRAPHQL_URL
ARG REACT_APP_TOKENIZER_URL
ARG REACT_APP_SIMPLE_TOKENIZER_URL

WORKDIR /repo/js/demo-apps/packages/react-front-end

RUN yarn run build

CMD ["serve-static", "-l", "3000"]
ENTRYPOINT ["yarn", "run"]

FROM lerna-bootstrap as lunasec-cli

RUN apk add --no-cache docker docker-compose curl python3 bash

# Overwrite this when calling docker from CI
ENV HOST_MACHINE_PWD=""

WORKDIR /repo/js/sdks/packages/cli

WORKDIR /repo

# This is required because we aren't able to pass additional command arguments via Docker-Compose unless we are invoking
# via the "exec" Entrypoint syntax. This lets us then expand environment variables at runtime.
# This gives a better explanation: https://stackoverflow.com/questions/49133234/docker-entrypoint-with-env-variable-and-optional-arguments
ENTRYPOINT ["sh", "/repo/js/sdks/packages/cli/scripts/docker-entrypoint.sh"]

FROM cypress/included:9.1.0 as integration-test

RUN apt update && apt install -y xvfb

# RUN cypress install --force

ENV VERBOSE_CYPRESS_LOGS="always"

COPY --from=lerna-bootstrap /repo /repo

WORKDIR /repo/

# We would use test:all but couldn't easily get golang into this container, so those run on bare box
ENTRYPOINT /repo/tools/service-scripts/wait-for-services.sh "$DEPENDENCIES__INTEGRATION_TEST" yarn run test:unit:tokenizer && yarn run test:unit:auth && yarn run test:e2e:docker

FROM lerna-bootstrap as secure-frame-iframe

WORKDIR /repo/js/sdks/packages/secure-frame-iframe

RUN yarn run compile

RUN npm i -g http-server

CMD ["-a", "0.0.0.0", "-p", "8000"]
ENTRYPOINT ["http-server"]
