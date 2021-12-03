#!/bin/bash

if [ -z ${RUNNING_IN_CI+x} ]; then
  yarn run license:install;
else
  echo "running in CI, skipping postinstall hooks...";
fi

