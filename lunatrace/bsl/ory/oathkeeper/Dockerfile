FROM oryd/oathkeeper:v0.38.19-beta.1-alpine

USER root

ARG OATHKEEPER_ENV=prod

ADD .env.$OATHKEEPER_ENV /
ADD templates/ /
ADD build-config.sh /

# Only used in development
ADD jwks.dev.json /

# Builds /generated/rules.yaml and /generated/config.yaml
RUN ./build-config.sh
