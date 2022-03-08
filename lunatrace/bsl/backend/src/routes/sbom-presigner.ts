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
import express, { Request, Response } from 'express';
import validate from 'validator';

import { sbomBucket } from '../constants';
import { aws } from '../utils/aws-utils';

interface ErrorResponse {
  error: true;
  message: string;
}

export const sbomPresignerRouter = express.Router();

function parseRequest(req: Request): ErrorResponse | { error: false; buildId: string; orgId: string } {
  const buildId = req?.body?.input?.buildId;

  if (!buildId) {
    return {
      error: true,
      message: 'Missing buildId in query params',
    };
  }

  if (typeof buildId !== 'string' || !validate.isUUID(buildId)) {
    return {
      error: true,
      message: 'Invalid buildId specified in request',
    };
  }

  const orgId = req?.body?.input?.orgId;

  if (!orgId) {
    return {
      error: true,
      message: 'Missing orgId in query params',
    };
  }

  if (typeof orgId !== 'string' || !validate.isUUID(orgId)) {
    return {
      error: true,
      message: 'Invalid orgId specified in request',
    };
  }

  return {
    error: false,
    buildId: buildId,
    orgId: orgId,
  };
}

function generateErrorResponse(res: Response, errorMessage: string, statusCode = 500) {
  res.status(statusCode);
  res.send(JSON.stringify({ error: true, message: errorMessage }));
}

sbomPresignerRouter.post('/s3/presign-sbom-upload', async (req, res) => {
  const parsedRequest = parseRequest(req);
  if (parsedRequest.error) {
    return generateErrorResponse(res, parsedRequest.message);
  }

  try {
    const result = await aws.generatePresignedS3Url(
      sbomBucket,
      aws.generateSbomS3Key(parsedRequest.orgId, parsedRequest.buildId),
      'PUT'
    );

    res.send(JSON.stringify({ error: false, uploadUrl: result }));
    res.status(200);
  } catch (e) {
    return generateErrorResponse(res, 'Unable to generate ');
  }
  return;
});
