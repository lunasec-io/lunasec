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
export { MetaData } from './generated';
import { LunaSecError } from '@lunasec/isomorphic-common';

import { GrantType, MetaData } from './generated';
export const GrantTypeEnum = GrantType;

export interface TokenizerClientConfig {
  /** The address of the tokenizer backend */
  host: string;
  /** The baseroute of the tokenizer backend, like /.lunasec/, defaults to nothing */
  baseRoute: string;
  metaEncoding: 'base64';
  headers: {
    auth: string;
  };
  /** Used for when the tokenizer is running on the serverside and wants to authenticate itself */
  authenticationToken?: string;
}

// ______________________ tokenizer.ts Return Types _________________

export interface TokenizerSetGrantResponse {
  success: true;
}
export interface TokenizerVerifyGrantResponse {
  success: true;
  valid: boolean;
}

export interface TokenizerGetMetadataResponse {
  success: true;
  tokenId: string;
  metadata: MetaData;
}

export interface TokenizerTokenizeResponse {
  success: true;
  tokenId: string;
}

export interface TokenizerDetokenizeResponse {
  success: true;
  tokenId: string;
  value: string;
}

export interface TokenizerDetokenizeToUrlResponse {
  success: true;
  tokenId: string;
  headers: Record<any, any>;
  downloadUrl: string;
}

export interface TokenizerFailApiResponse {
  success: false;
  error: LunaSecError;
}

export type SuccessOrFailOutput<S> = Promise<S | TokenizerFailApiResponse>;

export type GrantTypeUnion = GrantType[keyof GrantType];
