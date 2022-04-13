#!/bin/sh

if [ ! -z ${CI+x} ] || [ ! -z ${SKIP_LUNA_POSTINSTALL} ]; then
  echo "running in CI, skipping postinstall hooks...";
else
    yarn run license:install;
fi

