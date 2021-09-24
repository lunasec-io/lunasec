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
import { TokenizerClientConfig } from './types';

const __TOKENIZER_URL__: string = process.env.TOKENIZER_URL;

export const CONFIG_DEFAULTS: TokenizerClientConfig = {
  host: __TOKENIZER_URL__ || 'http://localhost:37766', // Todo: (forrest) I think we should get rid of this and just let people read their own env vars
  metaEncoding: 'base64',
  baseRoute: '',
  lockToSession: false,
};

export const LUNASEC_TOKEN_REGEXP =
  /^lunasec-[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export const SESSION_HASH_HEADER = 'lunasec-session-hash';

export const AUTHORIZATION_HEADER = 'authorization'.toLowerCase();
