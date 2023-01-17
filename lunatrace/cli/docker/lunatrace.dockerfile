FROM golang:1.18-alpine AS go-build

RUN apk add make

COPY . /build/
WORKDIR /build/lunatrace/cli/

RUN make lunatrace

FROM scratch

COPY --from=go-build /build/lunatrace/cli/bin/lunatrace /

ENTRYPOINT ["/lunatrace"]
