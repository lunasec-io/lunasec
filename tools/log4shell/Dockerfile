
FROM maven:3.8.4-openjdk-17 AS java-build

WORKDIR /build/hotpatch-payload

COPY payloads/ /build

RUN mvn package

FROM golang:1.17-alpine AS go-build

WORKDIR /build

COPY . /build
COPY --from=java-build /build/hotpatch-payload/target/classes/Log4ShellHotpatch.class /build

RUN go build -o log4shell . 

FROM alpine

COPY --from=go-build /build/log4shell /usr/local/bin/

ENTRYPOINT ["log4shell"]
