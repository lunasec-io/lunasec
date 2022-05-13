FROM oryd/oathkeeper:v0.38.19-beta.1-alpine

# Cannot bind to port in ECS without this.
USER root

RUN apk add gettext

ARG OATHKEEPER_FRONTEND_URL
ARG OATHKEEPER_BACKEND_URL
ARG OATHKEEPER_HASURA_URL
ARG OATHKEEPER_KRATOS_URL
ARG OATHKEEPER_MATCH_URL

ADD templates /templates
ADD build-config.sh /
ADD entrypoint.sh /

# Builds /generated/rules.yaml and /generated/config.yaml
RUN ./build-config.sh

ENTRYPOINT ["/entrypoint.sh"]
