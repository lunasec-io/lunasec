#!/bin/sh
# Forked from: https://github.com/derekmahar/docker-compose-wait-for-file

set -e

waitFile="$1"
cmd="$2"
shift 2
args="$*"

until test -e "$waitFile"
do
  >&2 echo "Waiting for file [$waitFile]."
  sleep 5
done

>&2 echo "Found file [$waitFile]."
exec "$cmd" "$args"
