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
import { HeaderBag } from '@aws-sdk/types';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import validate from 'validator';

import { PreSignedUrlGenerator } from './pre-signed-url-generator';

interface ErrorResponse {
  error: true;
  message: string;
}

interface SuccessResponse {
  error: false;
  uploadUrl: { url: string; headers: HeaderBag };
}

function parseRequest(
  event: APIGatewayProxyEventV2
): ErrorResponse | { error: false; orgId: string; projectId: string } {
  const queryParams = event.queryStringParameters;

  if (!queryParams) {
    return {
      error: true,
      message: 'Missing query params',
    };
  }

  const orgId = queryParams.orgId;

  if (!orgId) {
    return {
      error: true,
      message: 'Missing orgId in query params',
    };
  }

  if (!validate.isUUID(orgId)) {
    return {
      error: true,
      message: 'Invalid orgId specified in request',
    };
  }

  const projectId = queryParams.projectId;

  if (!projectId) {
    return {
      error: true,
      message: 'Missing projectId for request',
    };
  }

  if (!validate.isUUID(projectId)) {
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

function generateErrorResponse(errorMessage: string, statusCode = 500): Promise<APIGatewayProxyResultV2> {
  return Promise.resolve({
    statusCode: statusCode,
    headers: { 'Content-Type': 'text/json' },
    body: JSON.stringify({ error: true, message: errorMessage }),
  });
}

export async function generateS3PresignedUrl(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2<ErrorResponse | SuccessResponse>> {
  const region = process.env.AWS_REGION;

  if (!region) {
    return generateErrorResponse('Missing AWS region');
  }

  const bucket = process.env.S3_BUCKET_NAME;

  if (!bucket) {
    return generateErrorResponse('Missing S3 Bucket name');
  }

  const requestArgs = parseRequest(event);

  if (requestArgs.error) {
    return generateErrorResponse(requestArgs.message, 400);
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
        requestArgs.orgId
      )}/${today.getFullYear()}/${today.getMonth()}/${today.getDay()}/${today.getHours()}/${recordId}-${encodeURIComponent(
        requestArgs.projectId
      )}.json.gz`,
      'PUT'
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify({ error: false, uploadUrl: result }),
    };
  } catch (e) {
    return generateErrorResponse('Unable to generate ');
  }
}
