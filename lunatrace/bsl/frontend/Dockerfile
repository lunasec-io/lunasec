FROM node:16-alpine AS REPO_BOOTSTRAP

COPY . /usr/repo
WORKDIR /usr/repo
RUN yarn set version 3.1.1
# --immutable not working, something is trying to edit the lock file
ENV CYPRESS_INSTALL_BINARY="0"
ENV SKIP_LUNA_POSTINSTALL=true

FROM REPO_BOOTSTRAP as FRONTEND_BUILD

RUN yarn install #--immutable broken for some reason!

WORKDIR /usr/repo/lunatrace/bsl/frontend
RUN yarn run build:docker


FROM flashspys/nginx-static
RUN apk update && apk upgrade
COPY --from=FRONTEND_BUILD /usr/repo/lunatrace/bsl/frontend/build /static

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY /lunatrace/bsl/frontend/nginx.conf /etc/nginx/conf.d/default.conf
