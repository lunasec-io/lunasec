#!/bin/bash

if [ -z ${CI+x} ]; then
  yarn run license:install;
else
  echo "running in CI, skipping postinstall hooks...";
fi

