FROM node:16-slim AS repo-bootstrap

COPY . /usr/repo
WORKDIR /usr/repo

# --immutable not working, something is trying to edit the lock file
ENV CYPRESS_INSTALL_BINARY="0"
ENV SKIP_LUNA_POSTINSTALL=true

RUN corepack enable

RUN CI=true yarn install
