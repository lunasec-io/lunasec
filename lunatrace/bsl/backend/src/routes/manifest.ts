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

export const manifestRouter = express.Router();
import { aws } from '../utils/aws-utils';

// Promises in handlers are fine now, they work great in express 5.  Just no types yet.
// eslint-disable-next-line @typescript-eslint/no-misused-promises
manifestRouter.post('/scan', async (req, res) => {
  console.log('scan manifest called! ', req.body);
  const { key, bucket } = req.body.input;
  if (!key || !bucket) {
    return res.status(400).send({ error: true, error_message: 'Missing key or bucket in request' });
  }
  const fileString = await aws.getFileFromS3(key, bucket);
  console.log('file string is ', fileString);

  return res.send({ error: false, build_id: 'fakebuildid' });
});
