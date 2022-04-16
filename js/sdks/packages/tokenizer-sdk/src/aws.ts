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

import { BadHttpResponseError } from '@lunasec/server-common';
import globalAxios from 'axios';

export async function uploadToS3WithSignedUrl(
  signedUrl: string,
  headers: http.OutgoingHttpHeaders,
  input: string | Buffer
) {
   
  const { host, ...scrubbedHeaders } = headers;
  const axios = globalAxios.create({ withCredentials: false }); // create this every time so we can mock it for testing
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
  const axios = globalAxios.create({ withCredentials: false });
  const res = await axios.get(signedUrl, {
    headers: scrubbedHeaders,
  });

  if (res.status !== 200) {
    throw new BadHttpResponseError(res.status, res.data);
  }

   
  return res.data;
}
