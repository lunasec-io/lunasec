#!/bin/bash
sudo rm -f ./outputs/aws_resources.json

yarn run lunasec start --local-build --env=local-dependencies --force-rebuild=true
r=$?
if [ $r -ne 0 ]; then
    echo "Unable to bring up local dependencies for the tokenizer"
		exit 1;
fi
