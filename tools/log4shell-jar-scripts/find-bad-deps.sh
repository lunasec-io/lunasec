#!/bin/bash

if [[ -z $1 ]]; then
  echo "Must provide a path to the folder to check deps for."
  exit 1
fi


CVE_HASH_PATH="$(pwd)/hashes/sha256sums.txt"

if [[ ! -f $CVE_HASH_PATH ]]; then
  ./setup.sh
fi

cd $1

BAD_PACKAGES=$(find ./ -type f \( -iname \*.jar -o -iname \*.war \) | xargs -I% sh -c "sha256sum % | cut -c1-64 | xargs -I^ grep -q ^ $CVE_HASH_PATH && echo %")

if [[ -z $BAD_PACKAGES ]]; then
  echo "No bad packages were found with known any hashes."
  exit 0
fi

for path in $BAD_PACKAGES; do
  echo "Found Vulnerable Package At: $path"
done
