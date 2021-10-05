FROM alpine:3

RUN mkdir /src

COPY ./build/* /src/

RUN mkdir /src/blobs

COPY ./blobs/* /src/blobs/

WORKDIR /src

ENTRYPOINT ["/src/metricsserverbackend_lambda"]
