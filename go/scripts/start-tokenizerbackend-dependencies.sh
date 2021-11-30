#!/bin/bash
sudo rm -f ./outputs/aws_resources.json

npx lunasec start --local-build=true --env=local-dependencies --force-rebuild
r=$?
if [ $r -ne 0 ]; then
    echo "Unable to bring up local dependencies for the tokenizer"
		exit 1;
fi
