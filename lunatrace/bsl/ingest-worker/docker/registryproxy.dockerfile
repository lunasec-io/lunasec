FROM golang:1.18-alpine AS builder

COPY --from=repo-bootstrap /usr/repo/ /build/
WORKDIR /build/lunatrace/bsl/ingest-worker

RUN CGO_ENABLED=0 GOOS=linux go build -o registryproxy ./cmd/registryproxy

FROM gcr.io/distroless/base

COPY --from=builder /build/lunatrace/bsl/ingest-worker/registryproxy /

ENTRYPOINT ["/registryproxy"]
