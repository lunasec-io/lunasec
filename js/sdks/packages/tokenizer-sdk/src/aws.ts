import * as http from 'http';

import { BadHttpResponseError, getUrl, makeRawRequest } from '@lunasec/server-common';
import globalAxios from 'axios';

const axios = globalAxios.create({ withCredentials: false });

export async function uploadToS3WithSignedUrl(
  signedUrl: string,
  headers: http.OutgoingHttpHeaders,
  input: string | Buffer
) {
  const { host, ...scrubbedHeaders } = headers;

  const res = await axios.put(signedUrl, input, {
    headers: {
      ...scrubbedHeaders,
      'Content-Type': 'text/plain', // Needed to get axios to not encode form data and send it raw instead
    },
  });

  if (res.status !== 200) {
    throw new BadHttpResponseError(res.status, res.data);
  }
  return;
}

export async function downloadFromS3WithSignedUrl(signedUrl: string, headers: http.OutgoingHttpHeaders) {
  const { host, ...scrubbedHeaders } = headers;
  const res = await axios.get(signedUrl, {
    headers: scrubbedHeaders,
  });

  if (res.status !== 200) {
    throw new BadHttpResponseError(res.status, res.data); // TODO: Replace with LunaSecError maybe, just to be consistent
  }

  return res.data;
}
