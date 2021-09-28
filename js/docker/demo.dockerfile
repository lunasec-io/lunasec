FROM lunasec/cached-npm-dependencies:v0.0.2 as lerna-bootstrap

COPY . /repo

WORKDIR /repo

RUN lerna bootstrap --ignore-scripts --ci

WORKDIR /repo/js/sdks
RUN yarn run compile:dev:sdks

WORKDIR /repo

FROM lerna-bootstrap as demo-back-end

WORKDIR /repo/js/demo-apps/packages/demo-back-end

ENV DEMO_NAME="dedicated-passport-express"

ENTRYPOINT yarn start:dev

FROM lerna-bootstrap as react-front-end

WORKDIR /repo/js/demo-apps/packages/react-front-end

ENV DEMO_NAME="dedicated-passport-express"

ENTRYPOINT yarn run start

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
