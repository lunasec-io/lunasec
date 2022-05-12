#!/bin/sh
if [ -z ${OATHKEEPER_ENV+x} ];
 then OATHKEEPER_ENV=dev;
fi

echo "Building oathkeeper rules for $OATHKEEPER_ENV...";

GENERATED_DIR="./generated"
mkdir -p "$GENERATED_DIR"

ENV_FILE=".env.$OATHKEEPER_ENV"

# shellcheck disable=SC2046
export $(xargs < $ENV_FILE)

for file in ./templates/* ; do
  if [ -e "$file" ] ; then
    normalized_name=$(basename "$file" | sed -e "s/\.template//g")
    generated_file="$GENERATED_DIR/$normalized_name"
    echo "# Generated with build-config.sh with $ENV_FILE, update $file with changes that you need." > "$generated_file"
    envsubst < "$file" >> "$generated_file"
  fi
done

echo "Built oathkeeper config!"
