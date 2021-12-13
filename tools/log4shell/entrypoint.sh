#!/bin/bash

CURRENT_PATH=$(pwd)

# We must resolve the symlink in order to get the path to the NPM module
REAL_PATH=$(readlink -f "$0" | sed 's/entrypoint.sh//')

cd $REAL_PATH

#shift 1
cmd="$@"

# If the user passed us a path, then we will pass that along instead.
if [[ -n "$2" ]]; then
  npm run $1 $2
else
  npm run $1 $CURRENT_PATH
fi

