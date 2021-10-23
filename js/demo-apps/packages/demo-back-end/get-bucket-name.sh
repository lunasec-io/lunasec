#!/bin/bash
# bucket names are random in localstack, so this script gets the bucket name from aws if none is set in the env vars
echo "get-bucket-name.sh script started" >&2
if [ "$CIPHERTEXT_S3_BUCKET" != "" ]; then
  echo "Found s3 bucket in env variable as $CIPHERTEXT_S3_BUCKET, using it" >&2
  echo "$CIPHERTEXT_S3_BUCKET"
else
  while :
  do
    echo "Attempting to query aws localstack for bucket name and looping until success, please wait..." >&2
    name=$(aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks --stack-name LunasecSecureEnclave --query "Stacks[0].Outputs[?ExportName==\`ciphertextbucketArnOutput\`].OutputValue" | jq -r ".[0]")
    if [ "$name" != "" ]; then
      echo "Received bucket name from aws: $name" >&2
      break
    fi
    sleep 2
  done
  echo "$name"
fi

#here is a way to read the name out of the resource file if we ever decide we want to do it that way instead
#awk '/s3_bucket/{print $NF}' ../../../../go/config/secureframe/aws_resources.yaml