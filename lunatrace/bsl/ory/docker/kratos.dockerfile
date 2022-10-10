FROM oryd/kratos:v0.9.0

# Cannot bind to port in ECS without this.
USER root

RUN apk add gettext

ARG KRATOS_DOMAIN_NAME

ADD kratos/ /config/
ADD scripts /scripts/

# Builds /generated/rules.yaml and /generated/config.yaml
RUN cd /config && /scripts/build-config.sh
