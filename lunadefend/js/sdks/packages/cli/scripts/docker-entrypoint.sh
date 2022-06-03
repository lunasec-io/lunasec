#!/bin/bash

set -e

exec /repo/tools/service-scripts/wait-for-services.sh "$DEPENDENCIES__CLI" yarn run lunasec "$@"
