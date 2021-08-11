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
  const httpOnlyHost = signedUrl.replace('https:', 'http:');
  const differentPortHost = httpOnlyHost.replace('4567', '4566');

  // TODO: Add some retry logic here, but it'll need to retry only on 500s or other "known" retry cases.
  // TODO: Make this stream to S3 so we don't have to read the entire "input" ahead of time.
  const [res, responseBuffer] = await makeRawRequest(
    ...makeS3HttpRequestOptions(differentPortHost, headers, 'PUT', input)
  );

  const responseData = responseBuffer.toString();

  if (res.statusCode !== 200) {
    throw new BadHttpResponseError(res.statusCode, responseData);
  }
}

export async function downloadFromS3WithSignedUrl(signedUrl: string, headers: http.OutgoingHttpHeaders) {
  const httpOnlyHost = signedUrl.replace('https:', 'http:');
  const differentPortHost = httpOnlyHost.replace('4567', '4566');

  // TODO: Add some retry logic here, but it'll need to retry only on 500s or other "known" retry cases.
  // TODO: Stream back the output so that large files aren't just buffered straight to memory... Or at least the option for that.
  const [res, responseBuffer] = await makeRawRequest(...makeS3HttpRequestOptions(differentPortHost, headers, 'GET'));

  const responseData = responseBuffer.toString();

  if (res.statusCode !== 200) {
    throw new BadHttpResponseError(res.statusCode, responseData);
  }

  return responseData;
}
