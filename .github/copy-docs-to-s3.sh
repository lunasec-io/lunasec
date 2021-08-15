#!/bin/bash

# Code in this file was written from references from code in this repo:
# https://github.com/turnerlabs/s3-docusaurus-sync-action/blob/master/entrypoint.sh

set -e

if [ -z "$LOCAL_FILES_TO_COPY" ]; then
  echo "LOCAL_FILES_TO_COPY is not set. Quitting."
  exit 1
fi

if [ -z "$AWS_S3_BUCKET" ]; then
  echo "AWS_S3_BUCKET is not set. Quitting."
  exit 1
fi

if [ -z "$AWS_ACCESS_KEY_ID" ]; then
  echo "AWS_ACCESS_KEY_ID is not set. Quitting."
  exit 1
fi

if [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "AWS_SECRET_ACCESS_KEY is not set. Quitting."
  exit 1
fi

if [ -z "$AWS_DEFAULT_REGION" ]; then
  echo "AWS_DEFAULT_REGION is not set. Quitting."
  exit 1
fi


echo "Setting up AWS credentials folder"
mkdir -p ~/.aws
touch ~/.aws/credentials

echo "Writing AWS credentials"

echo "[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}" > ~/.aws/credentials

echo "Copying to AWS S3"
aws s3 sync ${LOCAL_FILES_TO_COPY} s3://${AWS_S3_BUCKET} --exact-timestamps --delete --region ${AWS_DEFAULT_REGION} $*

echo "Cleaning up AWS credentials"

rm -rf ~/.aws