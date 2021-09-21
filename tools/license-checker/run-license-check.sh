#!/bin/bash

# TODO: Add support for OSes other than Linux.

LICENSE_TOOL_DIRECTORY=$(dirname $0)

echo $LICENSE_TOOL_DIRECTORY

LICENSE_TOOL_COMMAND="$1"
LICENSE_TOOL_PATH="$LICENSE_TOOL_DIRECTORY/skywalking-eyes/bin/linux/license-eye"

# TODO: DRY up the calls to the license tool

if [ "$LICENSE_TOOL_COMMAND" == "fix" ]; then
  $LICENSE_TOOL_PATH -c $LICENSE_TOOL_DIRECTORY/configs/apache2.yaml -v info header fix
  $LICENSE_TOOL_PATH -c $LICENSE_TOOL_DIRECTORY/configs/CC-BY-SA-4_0.yaml -v info header fix
elif [ "$LICENSE_TOOL_COMMAND" == "check" ]; then
  $LICENSE_TOOL_PATH -c $LICENSE_TOOL_DIRECTORY/configs/apache2.yaml -v info header check
  $LICENSE_TOOL_PATH -c $LICENSE_TOOL_DIRECTORY/configs/CC-BY-SA-4_0.yaml -v info header check
else
    echo "Missing license check command -- Must be 'fix' or 'check'."
fi


