#!/bin/bash

# wipe out our previous run-data
rm -f ./outputs/aws_resources.json
# make this directory ahead of time so that it has more open permissions when docker creates the volume
mkdir -p ./outputs

yarn run lunasec start --local-build --env=local-dependencies --force-rebuild=true
r=$?
if [ $r -ne 0 ]; then
    echo "Unable to bring up local dependencies for the tokenizer"
		exit 1;
fi
