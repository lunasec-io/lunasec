FROM golang AS builder
ADD . /code
WORKDIR /code/go
RUN make runtime tag=release

FROM scratch

COPY --from=builder /code/build/runtime_release /var/runtime/bootstrap
COPY --from=builder /code/config/tokenizer/config.yaml /config/tokenizer/
