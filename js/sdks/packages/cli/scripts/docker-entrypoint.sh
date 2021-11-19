#!/bin/bash

set -e

exec /repo/tools/service-scripts/wait-for-services.sh "$LOCAL_HTTPS_PROXY" yarn run lunasec "$@"
