#!/bin/sh
BACKEND_ENV="../backend/.env.dev"
rm $BACKEND_ENV

echo "S3_SBOM_BUCKET=$(jq -r '."lunatrace-breadchris-EtlStorage".SbomBucketName' outputs.dev.json)" >> $BACKEND_ENV
echo "S3_CODE_BUCKET=$(jq -r '."lunatrace-breadchris-EtlStorage".CodeBucketName' outputs.dev.json)" >> $BACKEND_ENV
echo "S3_MANIFEST_BUCKET=$(jq -r '."lunatrace-breadchris-EtlStorage".ManifestBucketName' outputs.dev.json)" >> $BACKEND_ENV
echo "QUEUE_NAME=$(jq -r '."lunatrace-breadchris-EtlStorage".LunaTraceDevelopmentQueueName' outputs.dev.json)" >> $BACKEND_ENV
echo "GOLANG_QUEUE_NAME=$(jq -r '."lunatrace-breadchris-EtlStorage".LunaTraceDevelopmentGolangQueueName' outputs.dev.json)" >> $BACKEND_ENV
echo "LUNATRACE_GRAPHQL_SERVER_URL=http://localhost:8080/v1/graphql" >> $BACKEND_ENV
echo "LUNATRACE_GRAPHQL_SERVER_SECRET=myadminsecretkey" >> $BACKEND_ENV
