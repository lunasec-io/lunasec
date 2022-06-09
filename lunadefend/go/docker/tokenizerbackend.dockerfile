FROM golang AS base

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates

WORKDIR /src
ENV CGO_ENABLED=0
COPY go.* .
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

FROM base as builder

ARG tag
ARG version

RUN --mount=target=repo \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    cd repo/lunadefend/go && OUTPUT_DIR=/out make tokenizerbackend tag=$tag version=$version

FROM alpine

# TODO (cthompson) we could probably use 'scratch' and just copy the curl bin from another build image
RUN apk add curl

ARG tag

COPY lunadefend/go/config/tokenizerbackend/config.yaml /config/tokenizerbackend/config.yaml
COPY lunadefend/go/views/tokenizerbackend/ /views/tokenizerbackend/

# base config only for demo app, otherwise remove it
COPY lunadefend/go/config/tokenizerbackend/dev.yaml /config/tokenizerbackend/dev.yaml
RUN if [ "$tag" != "dev" ] ; then rm /config/tokenizerbackend/dev.yaml ; fi

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /out/tokenizerbackend_$tag /tokenizerbackend
COPY --from=builder /tmp /tmp

COPY lunadefend/go/fixtures/tokenizerbackend/cert.pem /usr/local/share/ca-certificates/proxy.crt
RUN cat /usr/local/share/ca-certificates/proxy.crt >> /etc/ssl/certs/ca-certificates.crt

# Sets up the script to wait for the resource config to be available.
COPY lunadefend/go/scripts/wait-for-file.sh /tmp/wait-for-file.sh
RUN chmod +x /tmp/wait-for-file.sh

WORKDIR /
ENTRYPOINT /tmp/wait-for-file.sh /config/tokenizerbackend/outputs/aws_resources.json /tokenizerbackend
