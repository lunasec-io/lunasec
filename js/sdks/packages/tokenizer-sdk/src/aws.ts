/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
import * as http from 'http';

import { BadHttpResponseError, getUrl, makeRawRequest } from '@lunasec/server-common';

function getUploadHeaders(input?: string | Buffer) {
  if (input !== undefined) {
    const contentLength = Buffer.byteLength(input);

    return {
      'Content-Length': contentLength,
    };
  }

  return {};
}

function makeS3HttpRequestOptions(
  signedUrl: string,
  headers: http.OutgoingHttpHeaders,
  method: 'PUT' | 'GET',
  input?: string | Buffer
): [string, string, http.ClientRequestArgs, string | Buffer | undefined] {
  const URL = getUrl();
  const uploadUrl = new URL(signedUrl);

  const host = uploadUrl.protocol + '//' + uploadUrl.hostname;

  const httpParams: http.ClientRequestArgs = {
    method: method,
    headers: {
      ...headers,
      ...getUploadHeaders(input),
    },
    hostname: uploadUrl.hostname,
    port: uploadUrl.port,
    path: uploadUrl.pathname + uploadUrl.search,
    protocol: uploadUrl.protocol,
  };

  return [host, uploadUrl.pathname, httpParams, input];
}

export async function uploadToS3WithSignedUrl(
  signedUrl: string,
  headers: http.OutgoingHttpHeaders,
  input: string | Buffer
) {
  // TODO: Add some retry logic here, but it'll need to retry only on 500s or other "known" retry cases.
  // TODO: Make this stream to S3 so we don't have to read the entire "input" ahead of time.
  const [res, responseBuffer] = await makeRawRequest(...makeS3HttpRequestOptions(signedUrl, headers, 'PUT', input));

  const responseData = responseBuffer.toString();

  if (res.statusCode !== 200) {
    throw new BadHttpResponseError(res.statusCode, responseData);
  }
}

export async function downloadFromS3WithSignedUrl(signedUrl: string, headers: http.OutgoingHttpHeaders) {
  // TODO: Add some retry logic here, but it'll need to retry only on 500s or other "known" retry cases.
  // TODO: Stream back the output so that large files aren't just buffered straight to memory... Or at least the option for that.
  const [res, responseBuffer] = await makeRawRequest(...makeS3HttpRequestOptions(signedUrl, headers, 'GET'));

  const responseData = responseBuffer.toString();

  if (res.statusCode !== 200) {
    throw new BadHttpResponseError(res.statusCode, responseData);
  }

  return responseData;
}
