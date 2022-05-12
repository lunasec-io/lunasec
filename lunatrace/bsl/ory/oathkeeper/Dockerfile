FROM oryd/oathkeeper:v0.38.19-beta.1-alpine

# Cannot bind to port in ECS without this.
USER root

RUN apk add gettext

# Default environment variables for local development
ENV OATHKEEPER_HASURA_URL "http://graphql-engine:8080"
ENV OATHKEEPER_FRONTEND_URL "http://host.docker.internal:3000"
ENV OATHKEEPER_BACKEND_URL "http://host.docker.internal:3002"
ENV OATHKEEPER_KRATOS_URL "http://kratos:4433"
ENV OATHKEEPER_MATCH_URL "<https|http|ws>://localhost:4455"

ADD templates /templates
ADD build-config.sh /
ADD entrypoint.sh /

# Builds /generated/rules.yaml and /generated/config.yaml
RUN ./build-config.sh

ENTRYPOINT ["/entrypoint.sh"]
