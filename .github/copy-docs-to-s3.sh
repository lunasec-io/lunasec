#!/bin/bash
# Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

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

# TODO: Migrate this to v2 of the AWS CLI
pip install --quiet --no-cache-dir awscli=='1.20.21'

echo "Setting up AWS credentials folder"
mkdir -p ~/.aws
touch ~/.aws/credentials

echo "Writing AWS credentials"

echo "[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}" > ~/.aws/credentials

echo "Copying to AWS S3"
aws s3 sync ${LOCAL_FILES_TO_COPY} s3://${AWS_S3_BUCKET} --exact-timestamps --delete --acl public-read --region ${AWS_DEFAULT_REGION} $*

# TODO: Add Cloudfront invalidation step

echo "Cleaning up AWS credentials"

rm -rf ~/.aws