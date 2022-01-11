/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { HeaderBag } from '@aws-sdk/types';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import slugify from 'slugify';
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
): ErrorResponse | { error: false; email: string; metadata: string } {
  const queryParams = event.queryStringParameters;

  if (!queryParams) {
    return {
      error: true,
      message: 'Missing email in query params',
    };
  }

  const email = queryParams.email;

  if (!email) {
    return {
      error: true,
      message: 'Missing email in query params',
    };
  }

  if (!validate.isEmail(email)) {
    return {
      error: true,
      message: 'Invalid email specified in request',
    };
  }

  const metadata = queryParams.metadata;

  if (!metadata) {
    return {
      error: true,
      message: 'Missing metadata for request',
    };
  }

  try {
    const parsedMetadata = JSON.parse(metadata);

    if (!parsedMetadata.name) {
      return {
        error: true,
        message: 'Missing name in metadata for request',
      };
    }
  } catch (e) {
    return {
      error: true,
      message: 'Invalid metadata for request, it must be JSON',
    };
  }

  return {
    error: false,
    email: email,
    metadata: metadata,
  };
}

function generateErrorResponse(errorMessage: string, statusCode = 500): Promise<APIGatewayProxyResultV2> {
  return Promise.resolve({
    statusCode: statusCode,
    headers: { 'Content-Type': 'text/json' },
    body: JSON.stringify({ error: true, message: errorMessage }),
  });
}

export async function handler(
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

  const sluggedMetadata: string = slugify(requestArgs.metadata);

  try {
    const result = await preSignedUrlGenerator.generatePresignedS3Url(
      `${encodeURIComponent(
        requestArgs.email
      )}/${today.getFullYear()}/${today.getMonth()}/${today.getDay()}/${today.getHours()}/${recordId}-${encodeURIComponent(
        sluggedMetadata
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
