FROM golang:1.18-alpine AS go-build

COPY . /build/
WORKDIR /build/lunatrace/cli/

# generate the graphql code from the schema
RUN go generate ./...

WORKDIR /build/lunatrace/bsl/ingest-worker

RUN CGO_ENABLED=0 GOOS=linux go build -o ingestworker ./cmd/lpt

FROM scratch

COPY --from=go-build /build/lunatrace/bsl/ingest-worker/ingestworker /

ENTRYPOINT ["/ingestworker"]
