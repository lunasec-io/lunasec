#!/bin/sh

if [ -d "/config" ]
then
  echo "Detected /config volume mount, regenerating oathkeeper config..."
  cp /config/templates/* /templates
  /build-config.sh
fi

oathkeeper "$@"
