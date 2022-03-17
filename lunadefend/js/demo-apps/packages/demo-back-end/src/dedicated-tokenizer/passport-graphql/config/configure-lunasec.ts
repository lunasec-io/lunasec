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
import { LunaSec } from '@lunasec/node-sdk';

import { readSessionFromRequest } from './auth-helpers';

if (!process.env.TOKENIZER_URL) {
  throw new Error('Secure frame url env var is not set');
}

const publicTokenizerUrl = process.env.REACT_APP_TOKENIZER_URL;

export const lunaSec = new LunaSec({
  tokenizerURL: process.env.TOKENIZER_URL,
  auth: {
    secrets: { provider: 'environment' },
    // pluginBaseUrl: '/api', This prepends the .lunasec routes with any string you wish, useful if your API lives behind a base route

    // Provide a small middleware(ours is called lunaSecSessionIdProvider) that takes in the req object and returns a promise containing a session token
    // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
    sessionIdProvider: readSessionFromRequest,
    publicTokenizerUrl,
  },
});
