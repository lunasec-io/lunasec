FROM golang:1.17-alpine AS go-build

RUN apk add make

WORKDIR /build
COPY . /build

RUN make lunatrace

FROM scratch

COPY --from=go-build /build/bin/lunatrace /

ENTRYPOINT ["/lunatrace"]
