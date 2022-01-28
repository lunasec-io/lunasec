#!/bin/bash

# TODO: Add support for OSes other than Linux.

ROOT_REPO_DIRECTORY=$(dirname "$0")

LICENSE_TOOL_COMMAND="$1"
LICENSE_TOOL_PATH="$ROOT_REPO_DIRECTORY/skywalking-eyes/bin/linux/license-eye"

# TODO: DRY up the calls to the license tool

if [ "$LICENSE_TOOL_COMMAND" == "fix" ]; then
  $LICENSE_TOOL_PATH -c "$ROOT_REPO_DIRECTORY"/configs/apache2.yaml -v error header fix
  $LICENSE_TOOL_PATH -c "$ROOT_REPO_DIRECTORY"/configs/bsl-lunatrace.yaml -v error header fix
  $LICENSE_TOOL_PATH -c "$ROOT_REPO_DIRECTORY"/configs/CC-BY-SA-4_0.yaml -v error header fix
elif [ "$LICENSE_TOOL_COMMAND" == "check" ]; then
  $LICENSE_TOOL_PATH -c "$ROOT_REPO_DIRECTORY"/configs/apache2.yaml -v error header check
  $LICENSE_TOOL_PATH -c "$ROOT_REPO_DIRECTORY"/configs/bsl-lunatrace.yaml -v error header check
  $LICENSE_TOOL_PATH -c "$ROOT_REPO_DIRECTORY"/configs/CC-BY-SA-4_0.yaml -v error header check
elif [ "$LICENSE_TOOL_COMMAND" == "with-config" ]; then
  $LICENSE_TOOL_PATH -c "$ROOT_REPO_DIRECTORY"/configs/"$2" -v error header fix
else
    echo "Missing license check command -- Must be 'fix' or 'check'."
fi


