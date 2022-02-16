import { defaultProvider } from '@aws-sdk/credential-provider-node';
import express from 'express';
import { v4 as uuid } from 'uuid';

import { PreSignedUrlGenerator } from '../s3/pre-signed-url-generator';

export const s3Router = express.Router();

const awsRegion = process.env.AWS_DEFAULT_REGION;
const manifestBucket = process.env.S3_MANIFEST_BUCKET || 'test-manifest-bucket-one';

if (!awsRegion || !manifestBucket) {
  throw new Error('Missing AWS_DEFAULT_REGION or S3_MANIFEST_BUCKET env var');
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-misused-promises
s3Router.post('/presign-manifest-upload', async (req, res) => {
  const preSignedUrlGenerator = new PreSignedUrlGenerator({
    awsCredentials: defaultProvider(),
    awsRegion,
    s3Bucket: manifestBucket,
  });

  const projectId = req.body.project_id as string | undefined;
  if (!projectId) {
    return res.status(400).send({ error: 'Missing project_id in request' });
  }

  const today = new Date();
  const uniqueId = uuid();

  const objectKey = `${encodeURIComponent(projectId)}
  /${today.getFullYear()}/${today.getMonth()}/${today.getDay()}/${today.getHours()}
  /${encodeURIComponent(uniqueId)}`;

  try {
    const result = await preSignedUrlGenerator.generatePresignedS3Url(objectKey, 'PUT');
    return res.json({ error: false, uploadUrl: result });
  } catch (e) {
    return res.status(400).json({ error: 'Failed to generate S3 presigned url' });
  }
});
