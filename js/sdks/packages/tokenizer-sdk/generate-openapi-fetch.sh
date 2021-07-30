#!/bin/bash
# This script to generate OpenAPI using the docker image must be run with sudo if you dont have rootless docker
# it expects the schema(tokenizer.yaml) to be symlinked into this directory(tokenizer-sdk)
MODULE_PATH="$(realpath "$(dirname $0)")"
docker run --rm -v "$MODULE_PATH":/module_path openapitools/openapi-generator-cli generate \
    -i /module_path/tokenizer.yaml \
    -g typescript-axios \
    -o /module_path/src/generated

chmod -R 755 "$MODULE_PATH"/src/generated
