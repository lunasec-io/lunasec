#FROM node:14 as dependency-precache
#
#
#COPY ./ /repo
#
#WORKDIR /repo
#
#RUN ls
#RUN yarn global add lerna
#
#RUN lerna bootstrap
#
#WORKDIR /
#
#RUN rm -rf repo


FROM lunasec/cicd-images:lunasec-precached-dependencies as lerna-bootstrap

COPY . /repo

WORKDIR /repo

RUN lerna bootstrap

WORKDIR /repo/js/sdks

WORKDIR /repo/js/sdks/
RUN npx tsc -b tsconfig.build.json

WORKDIR /repo

FROM lerna-bootstrap as demo-back-end

WORKDIR /repo/js/demo-apps/packages/express-back-end

ENV DEMO_NAME="dedicated-passport-express"

ENTRYPOINT yarn start:dev

FROM lerna-bootstrap as react-front-end

WORKDIR /repo/js/demo-apps/packages/react-front-end

ENV DEMO_NAME="dedicated-passport-express"

ENTRYPOINT npm run start

FROM lerna-bootstrap as secure-frame-iframe

WORKDIR /repo/js/sdks/packages/secure-frame-iframe
RUN npm run compile

RUN npm i -g http-server

ENTRYPOINT http-server -a 0.0.0.0 -p 8000
