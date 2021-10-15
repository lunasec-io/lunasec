# Pulls from this cache with multiple build requirements like java and aws, not just npm
FROM lunasec/cached-npm-dependencies:v0.0.4 as lerna-bootstrap

COPY . /repo

WORKDIR /repo

RUN lerna bootstrap --ignore-scripts --ci
RUN npm rebuild --workspaces

RUN yarn run compile:dev:sdks

FROM lerna-bootstrap as demo-back-end

WORKDIR /repo/js/demo-apps/packages/demo-back-end

ENTRYPOINT yarn start:dev

FROM lerna-bootstrap as react-front-end

WORKDIR /repo/js/demo-apps/packages/react-front-end

ENTRYPOINT yarn run start

FROM cypress/included:8.6.0 as integration-test

ENV VERBOSE_CYPRESS_LOGS="always"

COPY --from=lerna-bootstrap /repo /repo
COPY --from=lerna-bootstrap /root/.cache /root/.cache

WORKDIR /repo/

FROM lerna-bootstrap as secure-frame-iframe

WORKDIR /repo/js/sdks/packages/secure-frame-iframe

RUN yarn run compile

RUN npm i -g http-server

ENTRYPOINT http-server -a 0.0.0.0 -p 8000
