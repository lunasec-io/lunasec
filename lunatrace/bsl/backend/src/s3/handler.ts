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
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import validate from 'validator';

import { PreSignedUrlGenerator } from './pre-signed-url-generator';

interface ErrorResponse {
  error: true;
  message: string;
}

function parseRequest(req: Request): ErrorResponse | { error: false; orgId: string; projectId: string } {
  const orgId = req.query.orgId;

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

  const projectId = req.query.projectId;

  if (!projectId) {
    return {
      error: true,
      message: 'Missing projectId for request',
    };
  }

  if (typeof projectId !== 'string' || !validate.isUUID(projectId)) {
    return {
      error: true,
      message: 'Invalid projectId specified in request',
    };
  }

  return {
    error: false,
    orgId: orgId,
    projectId: projectId,
  };
}

function generateErrorResponse(res: Response, errorMessage: string, statusCode = 500) {
  res.send(JSON.stringify({ error: true, message: errorMessage }));
  res.status(statusCode);
}

export async function generatePresignedUrl(req: Request, res: Response) {
  const region = process.env.AWS_REGION;
  if (!region) {
    return generateErrorResponse(res, 'Missing AWS region');
  }

  const bucket = process.env.S3_BUCKET_NAME;

  if (!bucket) {
    return generateErrorResponse(res, 'Missing S3 Bucket name');
  }

  const parsedRequest = parseRequest(req);
  if (parsedRequest.error) {
    return generateErrorResponse(res, parsedRequest.message);
  }

  const preSignedUrlGenerator = new PreSignedUrlGenerator({
    awsCredentials: defaultProvider(),
    awsRegion: region,
    s3Bucket: bucket,
  });

  const today = new Date();
  const recordId: string = uuid();

  try {
    const result = await preSignedUrlGenerator.generatePresignedS3Url(
      `${encodeURIComponent(
        parsedRequest.orgId
      )}/${today.getFullYear()}/${today.getMonth()}/${today.getDay()}/${today.getHours()}/${recordId}-${encodeURIComponent(
        parsedRequest.projectId
      )}.json.gz`,
      'PUT'
    );

    res.send(JSON.stringify({ error: false, uploadUrl: result }));
    res.status(200);
  } catch (e) {
    return generateErrorResponse(res, 'Unable to generate ');
  }
  return;
}
