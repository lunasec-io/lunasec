FROM hasura/graphql-engine:v2.9.0.cli-migrations-v3

RUN apt install wget -y

ENV HASURA_GRAPHQL_METADATA_DIR /hasura/metadata

COPY metadata/ /hasura/metadata
