FROM golang AS base

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates

WORKDIR /src
ENV CGO_ENABLED=0
COPY go.* .
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

FROM base as builder

ARG BUILD_TAG
ARG VERSION

RUN --mount=target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    OUTPUT_DIR=/out make analyticscollector tag=$BUILD_TAG version=$VERSION

FROM alpine

RUN apk add curl

ARG BUILD_TAG

COPY config/analyticscollector/config.yaml /config/analyticscollector/config.yaml

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /out/analyticscollector_$BUILD_TAG /analyticscollector
COPY --from=builder /tmp /tmp

WORKDIR /
ENTRYPOINT ["/analyticscollector"]
