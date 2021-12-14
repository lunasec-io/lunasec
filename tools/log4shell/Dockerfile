FROM golang:1.17 AS build

COPY . /build
WORKDIR /build

RUN go build .

FROM scratch

COPY --from=build /build/log4shell /

ENTRYPOINT /log4shell
