FROM node:16-alpine

WORKDIR /usr/src/common

COPY common/yarn.lock-workspace /usr/src/common
COPY common/package.json /usr/src/common
RUN mv yarn.lock-workspace yarn.lock
RUN CI=true yarn install --pure-lockfile
COPY ./common /usr/src/common
RUN yarn run compile
RUN yarn link

WORKDIR /usr/src/app

COPY frontend/yarn.lock-workspace /usr/src/app/
COPY frontend/package.json /usr/src/app/
RUN mv yarn.lock-workspace yarn.lock
RUN yarn link "@lunatrace/lunatrace-common"
RUN CI=true yarn install --pure-lockfile

COPY ./frontend /usr/src/app

RUN yarn run build:docker

FROM flashspys/nginx-static
RUN apk update && apk upgrade
COPY --from=0 /usr/src/app/build /static

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
