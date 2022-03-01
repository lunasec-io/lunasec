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

RUN --mount=target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    OUTPUT_DIR=/out make analyticscollector tag=$tag version=$version

FROM alpine

RUN apk add curl

ARG tag

COPY config/analyticscollector/config.yaml /config/analyticscollector/config.yaml

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /out/analyticscollector_$tag /analyticscollector
COPY --from=builder /tmp /tmp

WORKDIR /
ENTRYPOINT ["/analyticscollector"]
