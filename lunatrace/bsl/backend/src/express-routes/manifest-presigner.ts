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

import { getEtlBucketConfig } from '../config';
import { aws } from '../utils/aws-utils';

export const manifestPresignerRouter = express.Router();

const sbomHandlerConfig = getEtlBucketConfig();

manifestPresignerRouter.post('/s3/presign-manifest-upload', async (req, res) => {
  const projectId = req.body.input.project_id as string | undefined;
  if (!projectId) {
    return res.status(400).send({ error: true, error_message: 'Missing project_id in request' });
  }

  const today = new Date();
  const uniqueId = uuid();

  const objectKey = `${encodeURIComponent(
    projectId
  )}/${today.getFullYear()}/${today.getMonth()}/${today.getDay()}/${today.getHours()}/${encodeURIComponent(uniqueId)}`;

  try {
    const result = await aws.generatePresignedS3Url(sbomHandlerConfig.manifestBucket, objectKey, 'PUT');
    return res.json({ error: false, key: objectKey, bucket: sbomHandlerConfig.manifestBucket, ...result });
  } catch (e) {
    return res.status(400).json({ error: true, error_message: 'Failed to generate S3 presigned url' });
  }
});
