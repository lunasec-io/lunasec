#!/bin/sh
echo "Building oathkeeper config...";

GENERATED_DIR="./generated"
mkdir -p "$GENERATED_DIR"

for file in ./templates/* ; do
  if [ -e "$file" ] ; then
    normalized_name=$(basename "$file" | sed -e "s/\.template//g")
    generated_file="$GENERATED_DIR/$normalized_name"
    echo "# Generated with build-config.sh, update $file with changes that you need." > "$generated_file"
    envsubst < "$file" >> "$generated_file"
  fi
done

echo "Built oathkeeper config!"
