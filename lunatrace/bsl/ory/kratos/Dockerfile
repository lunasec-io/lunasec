FROM golang:1.17-alpine3.15 AS base

##################################################
# THIS ENTIRE FILE IS FULL OF SPIKES TO FALL ON! #
##################################################

# Forked from: https://github.com/ory/kratos/blob/v0.8.3-alpha.1.pre.0/.docker/Dockerfile-build
# Because we needed access to "complex config setting" which was landed here:
# https://github.com/ory/kratos/commit/c45bf83a9e6744a0b3f2f24e3b07a6f0131d9a40

# TODO: When v0.8.3 or newer is released, delete everything in this file except the lines at the BOTTOM.

RUN apk -U --no-cache add build-base git gcc bash

WORKDIR /go/src/github.com/ory

RUN git clone https://github.com/ory/kratos.git

WORKDIR /go/src/github.com/ory/kratos

RUN git checkout v0.8.3-alpha.1.pre.0

# ADD go.mod go.mod
# ADD go.sum go.sum
# ADD internal/httpclient/go.* internal/httpclient/

ENV GO111MODULE on
ENV CGO_ENABLED 1

RUN go mod download

ARG VERSION
ARG COMMIT
ARG BUILD_DATE

RUN go build -tags sqlite \
    -ldflags="-X 'github.com/ory/kratos/driver/config.Version=${VERSION}' -X 'github.com/ory/kratos/driver/config.Date=${BUILD_DATE}' -X 'github.com/ory/kratos/driver/config.Commit=${COMMIT}'" \
    -o /usr/bin/kratos

FROM alpine:3.15.0

RUN addgroup -S ory; \
    adduser -S ory -G ory -D -u 10000 -h /home/ory -s /bin/nologin; \
    chown -R ory:ory /home/ory

COPY --from=base /usr/bin/kratos /usr/bin/kratos

# By creating the sqlite folder as the ory user, the mounted volume will be owned by ory:ory, which
# is required for read/write of SQLite.
RUN mkdir -p /var/lib/sqlite
RUN chown ory:ory /var/lib/sqlite
VOLUME /var/lib/sqlite

# Exposing the ory home directory to simplify passing in Kratos configuration (e.g. if the file $HOME/.kratos.yaml
# exists, it will be automatically used as the configuration file).
VOLUME /home/ory

# Declare the standard ports used by Kratos (4433 for public service endpoint, 4434 for admin service endpoint)
EXPOSE 4433 4434

USER 10000

ENTRYPOINT ["kratos"]
CMD ["serve"]

# TODO: Uncomment this when this exists and delete everything ABOVE this line!
# FROM oryd/kratos:v0.8.3

USER root

ADD config.yaml /config.yaml

ADD identity.schema.json /config/identity.schema.json
ADD oidc.github.jsonnet /config/oidc.github.jsonnet
