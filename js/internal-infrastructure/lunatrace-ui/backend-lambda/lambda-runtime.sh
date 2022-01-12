#!/bin/sh
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

if [ -z "$NODE_PATH" ];
then
  nodejs_mods="/opt/nodejs/node_modules"
  nodejs14_mods="/opt/nodejs/node14/node_modules"
  runtime_mods="/var/runtime/node_modules"
  task="/var/runtime:/var/task"
  export NODE_PATH="$nodejs14_mods:$nodejs_mods:$runtime_mods:$task"
fi

if [ -n "$AWS_LAMBDA_FUNCTION_MEMORY_SIZE" ];
then
  new_space=$(expr $AWS_LAMBDA_FUNCTION_MEMORY_SIZE / 10)
  semi_space=$(expr $new_space / 2)
  old_space=$(expr $AWS_LAMBDA_FUNCTION_MEMORY_SIZE - $new_space)
  MEMORY_ARGS=(
    "--max-semi-space-size=$semi_space"
    "--max-old-space-size=$old_space"
  )
fi

# If NODE_EXTRA_CA_CERTS is being set by the customer, don't override. Else, include RDS CA
if [ -z "${NODE_EXTRA_CA_CERTS+set}" ];
then
  export NODE_EXTRA_CA_CERTS="/etc/pki/tls/certs/ca-bundle.crt"
fi

export AWS_EXECUTION_ENV=AWS_Lambda_nodejs14.x

NODE_ARGS=(
    --expose-gc
    --max-http-header-size 81920
    "${MEMORY_ARGS[@]}"
    /var/runtime/index.js
    )

if [ -z "$AWS_LAMBDA_EXEC_WRAPPER" ]; then
  exec /var/lang/bin/node "${NODE_ARGS[@]}"
else
  wrapper="$AWS_LAMBDA_EXEC_WRAPPER"
  if [ ! -f "$wrapper" ]; then
    echo "$wrapper: does not exist"
    exit 127
  fi
  if [ ! -x "$wrapper" ]; then
    echo "$wrapper: is not an executable"
    exit 126
  fi
    exec -- "$wrapper" /var/lang/bin/node "${NODE_ARGS[@]}"
fi
