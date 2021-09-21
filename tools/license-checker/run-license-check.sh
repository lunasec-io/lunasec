#!/bin/bash

# TODO: Add support for OSes other than Linux.

LICENSE_TOOL_DIRECTORY=$(dirname $0)

echo $LICENSE_TOOL_DIRECTORY

cd "$LICENSE_TOOL_DIRECTORY/../../" || exit

LICENSE_TOOL_COMMAND="$1"
LICENSE_TOOL_PATH="$LICENSE_TOOL_DIRECTORY/skywalking-license-eye-0.1.0-bin/bin/linux/license-eye"

# TODO: DRY up the calls to the license tool

if [ "$LICENSE_TOOL_COMMAND" == "fix" ]; then
  $LICENSE_TOOL_PATH -c $LICENSE_TOOL_DIRECTORY/configs/apache2.yaml -v debug header fix
  $LICENSE_TOOL_PATH -c $LICENSE_TOOL_DIRECTORY/configs/CC-BY-SA-4_0.yaml -v debug header fix
elif [ "$LICENSE_TOOL_COMMAND" == "check" ]; then
  $LICENSE_TOOL_PATH -c $LICENSE_TOOL_DIRECTORY/configs/apache2.yaml -v debug header check
  $LICENSE_TOOL_PATH -c $LICENSE_TOOL_DIRECTORY/configs/CC-BY-SA-4_0.yaml -v debug header check
else
    echo "Missing license check command -- Must be 'fix' or 'check'."
fi


