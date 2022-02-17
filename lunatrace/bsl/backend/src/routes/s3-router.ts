/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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
  console.log('PRESIGN ROUTE CALLED');
  const preSignedUrlGenerator = new PreSignedUrlGenerator({
    awsCredentials: defaultProvider(),
    awsRegion,
    s3Bucket: manifestBucket,
  });
  console.log('created s3 generator');
  const projectId = req.body.input.project_id as string | undefined;
  console.log('request body is ', req.body);
  if (!projectId) {
    return res.status(400).send({ error: true, message: 'Missing project_id in request' });
  }

  const today = new Date();
  const uniqueId = uuid();

  const objectKey = `${encodeURIComponent(projectId)}
  /${today.getFullYear()}/${today.getMonth()}/${today.getDay()}/${today.getHours()}
  /${encodeURIComponent(uniqueId)}`;
  console.log('about to try');

  try {
    console.log('attempting to contact s3');
    const result = await preSignedUrlGenerator.generatePresignedS3Url(objectKey, 'PUT');
    console.log('s3 responded ', result);
    return res.json({ error: false, ...result });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Failed to generate S3 presigned url' });
  }
});
