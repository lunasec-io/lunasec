# Pulls from this cache with multiple build requirements like java and aws, not just npm
FROM lunasec/cached-npm-dependencies:v0.0.10 as lerna-bootstrap

COPY . /repo

WORKDIR /repo

# Uncomment to make replicable builds
RUN lerna bootstrap --ci
# I think this is to save space, not sure if this will work with yarn though
RUN npm cache clean --force

RUN npm rebuild sqlite3

RUN yarn run compile:dev:sdks

FROM lerna-bootstrap as application-back-end

WORKDIR /repo/js/demo-apps/packages/demo-back-end

ENTRYPOINT yarn start:dev

FROM lerna-bootstrap as application-front-end

WORKDIR /repo/js/demo-apps/packages/react-front-end

ENTRYPOINT yarn run start

FROM lerna-bootstrap as lunasec-cli
# Overwrite this when calling docker from CI
ENV HOST_MACHINE_PWD=""

WORKDIR /repo/js/sdks/packages/cli

RUN npm i -g aws-cdk@1.126.0 aws-cdk-local@1.65.4

WORKDIR /repo

ENTRYPOINT ["yarn", "run", "lunasec"]

# IF YOU CHANGE THIS CYPRESS VERSION, CHANGE IT IN THE DEMO REACT APP PACKAGE.JSON ALSO
FROM cypress/included:7.0.0 as integration-test

#RUN cypress install --force

ENV VERBOSE_CYPRESS_LOGS="always"

COPY --from=lerna-bootstrap /repo /repo

WORKDIR /repo/
# We would use test:all but couldn't easily get golang into this container, so those run on bare box
ENTRYPOINT yarn run test:unit:tokenizer && yarn run test:unit:auth && yarn run test:e2e:local

FROM lerna-bootstrap as secure-frame-iframe

WORKDIR /repo/js/sdks/packages/secure-frame-iframe

RUN yarn run compile

RUN npm i -g http-server

ENTRYPOINT http-server -a 0.0.0.0 -p 8000
