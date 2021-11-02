#!/bin/bash
sudo rm -f ./outputs/aws_resources.yaml

lunasec start --local-build --env dev
r=$?
if [ $r -ne 0 ]; then
    echo "Unable to bring up local dependencies for the tokenizer"
		exit 1;
fi
