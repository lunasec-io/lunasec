#!/bin/bash

SETUP_ID=$(tr -dc a-z </dev/urandom | head -c 10)
CIPHERTEXT_BUCKET_NAME="ciphertextbucket-$SETUP_ID"
CIPHERTEXT_BUCKET_ARN="arn:aws:s3:::$(aws s3 mb "s3://$CIPHERTEXT_BUCKET_NAME" | sed 's/make_bucket: //g')"
aws s3api put-bucket-cors --bucket $CIPHERTEXT_BUCKET_NAME --cors-configuration "$(cat s3bucket_cors.json)"

SECURE_FRAME_KEYSET_ARN=$(aws secretsmanager create-secret --name "secure-frame-keyset-$SETUP_ID" --secret-binary "$(cat test_secrets/secure_frame_keyset)" | jq .ARN)
SECURE_FRAME_SIGNING_KEYS_ARN=$(aws secretsmanager create-secret --name "secure-frame-signing-keys-$SETUP_ID" --secret-binary "$(cat test_secrets/secure_frame_signing_keys)}" | jq .ARN)

echo "CIPHERTEXT_BUCKET_ARN=$CIPHERTEXT_BUCKET_ARN \
SECURE_FRAME_KEYSET_ARN=$SECURE_FRAME_KEYSET_ARN \
SECURE_FRAME_SIGNING_KEYS_ARN=$SECURE_FRAME_SIGNING_KEYS_ARN"
