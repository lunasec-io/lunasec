# Pulls from this cache with multiple build requirements like java and aws, not just npm
FROM lunasec/cached-npm-dependencies:v0.0.5 as lerna-bootstrap

COPY . /repo

WORKDIR /repo

RUN lerna bootstrap --ignore-scripts --ci
RUN npm cache clean --force

RUN npm rebuild sqlite3

RUN yarn run compile:dev:sdks

FROM lerna-bootstrap as demo-back-end

WORKDIR /repo/js/demo-apps/packages/demo-back-end

ENTRYPOINT yarn start:dev

FROM lerna-bootstrap as react-front-end

WORKDIR /repo/js/demo-apps/packages/react-front-end

ENTRYPOINT yarn run start

FROM lerna-bootstrap as lunasec-cli

WORKDIR /repo/js/sdks/packages/cli

RUN npm i -g aws-cdk@1.126.0 aws-cdk-local@1.65.4
RUN npm link

ENTRYPOINT lunasec

FROM cypress/included:8.4.0 as integration-test

ENV VERBOSE_CYPRESS_LOGS="always"

COPY --from=lerna-bootstrap /repo /repo

WORKDIR /repo/js/demo-apps/packages/react-front-end

ENTRYPOINT npm run test:e2e

FROM lerna-bootstrap as secure-frame-iframe

WORKDIR /repo/js/sdks/packages/secure-frame-iframe

RUN yarn run compile

RUN npm i -g http-server

ENTRYPOINT http-server -a 0.0.0.0 -p 8000
