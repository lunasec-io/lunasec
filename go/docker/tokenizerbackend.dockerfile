FROM golang AS base

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates

WORKDIR /src
ENV CGO_ENABLED=0
COPY go.* .
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

FROM base as builder

ARG BUILD_TAG

RUN --mount=target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    OUTPUT_DIR=/out make tokenizerbackend tag=$BUILD_TAG

FROM alpine

# TODO (cthompson) we could probably use 'scratch' and just copy the curl bin from another build image
RUN apk add curl

ARG BUILD_TAG

COPY config/tokenizerbackend/config.yaml /config/tokenizerbackend/config.yaml
COPY views/tokenizerbackend/ /views/tokenizerbackend/

# base config only for demo app, otherwise remove it
COPY config/tokenizerbackend/dev.yaml /config/tokenizerbackend/dev.yaml
RUN if [ "$BUILD_TAG" != "dev" ] ; then rm /config/tokenizerbackend/dev.yaml ; fi

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /out/tokenizerbackend_$BUILD_TAG /tokenizerbackend
COPY --from=builder /tmp /tmp

WORKDIR /
ENTRYPOINT ["/tokenizerbackend"]