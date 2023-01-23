# THIS IS ONLY USED IN PROD, locally we just use the hasura base image directly in the docker compose
FROM hasura/graphql-engine:v2.9.0.cli-migrations-v3

#RUN apt install wget -y
RUN apt update
RUN apt install -y curl

ENV HASURA_GRAPHQL_METADATA_DIR /hasura/metadata
#ENV HASURA_GRAPHQL_MIGRATIONS_DIR /hasura/migrations

COPY metadata/ /hasura/metadata
COPY migrations/ /hasura/migrations
