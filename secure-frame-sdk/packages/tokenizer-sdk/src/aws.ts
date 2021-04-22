import {URL as URI} from 'url';
import {BadHttpResponseError, makeRawRequest} from '@esluna/common';
import * as http from 'http';

function getUploadHeaders(input?: string) {
  if (input !== undefined) {
    const contentLength = Buffer.byteLength(input);

    return {
      'Content-Length': contentLength
    };
  }

  return {};
}

function makeS3HttpRequestOptions(signedUrl: string, headers: http.OutgoingHttpHeaders, method: 'PUT' | 'GET', input?: string): [string, string, http.ClientRequestArgs, string | undefined] {
  const uploadUrl = new URI(signedUrl);

  const host = uploadUrl.protocol + '//' + uploadUrl.hostname;

  const httpParams: http.ClientRequestArgs = {
    method: method,
    headers: {
      ...headers,
      ...getUploadHeaders(input)
    },
    hostname: uploadUrl.hostname,
    port: uploadUrl.port,
    path: uploadUrl.pathname + uploadUrl.search,
    protocol: uploadUrl.protocol
  };

  return [host, uploadUrl.pathname, httpParams, input];
}

export async function uploadToS3WithSignedUrl(signedUrl: string, headers: http.OutgoingHttpHeaders, input: string) {
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
