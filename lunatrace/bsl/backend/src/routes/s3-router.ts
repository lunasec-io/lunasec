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
import express from 'express';
import { v4 as uuid } from 'uuid';

import { aws } from '../utils/aws-utils';
export const s3Router = express.Router();

const manifestBucket = process.env.S3_MANIFEST_BUCKET || 'test-manifest-bucket-one';

if (!manifestBucket) {
  throw new Error('Missing S3_MANIFEST_BUCKET env var');
}

// TODO: move this to the manifest router
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

s3Router.post('/presign-manifest-upload', async (req, res) => {
  const projectId = req.body.input.project_id as string | undefined;
  if (!projectId) {
    return res.status(400).send({ error: true, error_message: 'Missing project_id in request' });
  }

  const today = new Date();
  const uniqueId = uuid();

  const objectKey = `${encodeURIComponent(
    projectId
  )}/${today.getFullYear()}/${today.getMonth()}/${today.getDay()}/${today.getHours()}/${encodeURIComponent(uniqueId)}`;

  console.log('object key is ', objectKey);
  try {
    const result = await aws.generatePresignedS3Url(manifestBucket, objectKey, 'PUT');
    return res.json({ error: false, key: objectKey, bucket: manifestBucket, ...result });
  } catch (e) {
    return res.status(400).json({ error: true, error_message: 'Failed to generate S3 presigned url' });
  }
});
