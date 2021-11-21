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

export const CONFIG_DEFAULTS: TokenizerClientConfig = {
  url: 'http://localhost:37766',
  metaEncoding: 'base64',
  lockToSession: false,
};

export const LUNASEC_TOKEN_REGEXP =
  /^lunasec-[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export const SESSION_HASH_HEADER = 'lunasec-session-hash';

export const AUTHORIZATION_HEADER = 'authorization'.toLowerCase();
