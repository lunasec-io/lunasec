#!/bin/bash
# bucket names are random in localstack, so this script gets the bucket name from aws if none is set in the env vars
if [ "$CIPHERTEXT_S3_BUCKET" != "" ]; then
  echo "$CIPHERTEXT_S3_BUCKET"
else
  name=$(aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks --stack-name LunasecSecureEnclave --query "Stacks[0].Outputs[?ExportName==\`ciphertextbucketArnOutput\`].OutputValue" | jq -r ".[0]")
  echo "$name"
fi