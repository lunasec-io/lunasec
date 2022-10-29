#!/bin/bash
# This script will rebuild all the graphql generated code and metadata for the custom resolvers from our backend, through hasura, through to the frontend
# useful for active dev when the schema needs to change on the backend
cd $(dirname "$0")
cd ../../lunatrace/bsl/backend
yarn run generate
sleep 2
../../../tools/service-scripts/wait-for-it.sh localhost:3002
cd ../hasura
hasura metadata reload --skip-update-check
cd ../frontend
yarn run generate
