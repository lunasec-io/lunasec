#!/bin/bash
if [[ -z "${LOCALSTACK_HOSTNAME}" ]]; then
  LOCALSTACK_HOSTNAME="localhost"
fi

# bucket names are random in localstack, so this script gets the bucket name from aws if none is set in the env vars
echo "get-bucket-name.sh script started" >&2
if [ "$CIPHERTEXT_S3_BUCKET" != "" ]; then
  echo "Found s3 bucket in env variable as $CIPHERTEXT_S3_BUCKET, using it" >&2
  echo "$CIPHERTEXT_S3_BUCKET"

elif [ -f /outputs/aws_resources.json ]; then
  jq -r .aws_gateway.ciphertext_bucket /outputs/aws_resources.json
else
  echo "assuming local dev mode and reading bucket name from file: $(dirname "$0")/../../../../outputs/aws_resources.json" >&2
  while [ ! -f "$(dirname "$0")/../../../../outputs/aws_resources.json" ]; do
     echo "Waiting for aws_resources.json to be created" >&2
     sleep 1
   done
  jq -r .aws_gateway.ciphertext_bucket $(dirname "$0")/../../../../outputs/aws_resources.json
fi

#here is a way to read the name out of the resource file if we ever decide we want to do it that way instead
#awk '/ciphertext_bucket/{print $NF}' ../../../../go/config/secureframe/aws_resources.json
