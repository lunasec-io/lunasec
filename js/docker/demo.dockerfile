

FROM lunasec/cicd-images:lunasec-precached-dependencies as lerna-bootstrap

COPY . /repo

WORKDIR /repo

RUN lerna bootstrap --ignore-scripts --ci

WORKDIR /repo/js/sdks

WORKDIR /repo/js/sdks/
RUN yarn run compile

WORKDIR /repo

FROM lerna-bootstrap as demo-back-end

WORKDIR /repo/js/demo-apps/packages/express-back-end

ENV DEMO_NAME="dedicated-passport-express"

ENTRYPOINT yarn start:dev

FROM lerna-bootstrap as react-front-end

WORKDIR /repo/js/demo-apps/packages/react-front-end

ENV DEMO_NAME="dedicated-passport-express"

ENTRYPOINT yarn run start

FROM lerna-bootstrap as secure-frame-iframe

WORKDIR /repo/js/sdks/packages/secure-frame-iframe
RUN yarn run compile

RUN npm i -g http-server

ENTRYPOINT http-server -a 0.0.0.0 -p 8000
