FROM golang AS base

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates

WORKDIR /src
ENV CGO_ENABLED=0
COPY go.* .
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

FROM base as builder

RUN --mount=target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    OUTPUT_DIR=/out make lunasec tag=cli
FROM node

RUN npm i -g aws-cdk@1.114.0 aws-cdk-local@1.65.4

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /out/lunasec_cli /lunasec
COPY --from=builder /tmp /tmp

WORKDIR /
ENTRYPOINT ["/lunasec"]
