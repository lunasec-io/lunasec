FROM golang AS builder

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates

ADD . /repo
WORKDIR /repo/go
RUN make containermodifier tag=lambda

FROM scratch

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /code/build/containermodifier_lambda /containermodifier

WORKDIR /
ENTRYPOINT ["/containermodifier"]
