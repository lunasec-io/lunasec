FROM node:18 AS repo-bootstrap

COPY . /usr/repo
WORKDIR /usr/repo

# --immutable not working, something is trying to edit the lock file
ENV CYPRESS_INSTALL_BINARY="0"
ENV SKIP_LUNA_POSTINSTALL=true

RUN corepack enable

RUN CI=true yarn install

# build common code
RUN cd lunatrace/bsl/common && yarn run compile

# build logger
RUN cd lunatrace/bsl/logger && yarn run compile
