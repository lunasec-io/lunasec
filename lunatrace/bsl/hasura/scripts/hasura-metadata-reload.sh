#!/bin/sh
export HASURA_GRAPHQL_ENDPOINT=https://lunatrace.lunasec.io/api/hasura HASURA_GRAPHQL_ADMIN_SECRET="$(aws secretsmanager get-secret-value --secret-id lunatrace-HasuraAdminSecret | jq -r .SecretString)"
hasura metadata reload
