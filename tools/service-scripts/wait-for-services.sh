#!/usr/bin/env bash
# Takes a list of services and verifies that they are all running before continuing execution.

set -e

waitForServices="$1"
shift
cmd="$*"

IFS=',' read -ra services <<< "$waitForServices"

waitForTimeout=30
if [ -n "$WAIT_FOR_TIMEOUT" ] && [ "$WAIT_FOR_TIMEOUT" != " " ]; then
  waitForTimeout=$WAIT_FOR_TIMEOUT
fi

printf "%s\n" "${services[@]}" | xargs -i -I % "$(dirname "$0")/wait-for-it.sh" % -q -t "$waitForTimeout"

>&2 echo "Finished waiting for services [${waitForServices//,/, }]."

if [ -n "$cmd" ] && [ "$cmd" != " " ]; then
  exec "$@"
fi
