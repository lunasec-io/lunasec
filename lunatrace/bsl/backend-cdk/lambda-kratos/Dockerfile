FROM node:16 as builder

RUN mkdir /kratos

WORKDIR /kratos

COPY install-kratos.sh /kratos

RUN ./install-kratos.sh -d -b . kratos v0.8.2-alpha.1

WORKDIR /

FROM node:16-slim as output

RUN mkdir /kratos

COPY --from=builder /kratos/kratos /kratos/kratos

COPY lambda-entrypoint.sh /lambda-entrypoint.sh
COPY lambda-runtime.sh /var/runtime/bootstrap
COPY aws-lambda-rie /usr/local/bin/aws-lambda-rie

ENTRYPOINT [ '/lambda-entrypoint.sh' ]
