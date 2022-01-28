#!/bin/bash

if [ -z "${14}" ]; then
  exec sudo docker "$@"
fi

FINAL_COMMAND="${14}"

set -- "${@:1:$(($#-1))}"

readarray -td '' ESBUILD_COMMAND < <(awk '{ gsub(/, /,"\0"); print; }' <<<"$FINAL_COMMAND, "); unset 'ESBUILD_COMMAND[-1]';
declare -p ESBUILD_COMMAND;

echo "$ESBUILD_COMMAND"
echo sudo docker "$@" "$ESBUILD_COMMAND"

exec sudo docker "$@" "$ESBUILD_COMMAND"
