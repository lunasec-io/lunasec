#!/bin/bash
CALLER_DIR="$(pwd)"
SCRIPT_DIR="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
PROJECT_DIR="$SCRIPT_DIR/.."


sudo docker run --rm -v "$SCRIPT_DIR":/local swaggerapi/swagger-codegen-cli generate \
    -i /local/api-sec/tokenizer.yaml \
    -l typescript-fetch \
    -o /local/out/fetch

sudo chmod -R 755 out