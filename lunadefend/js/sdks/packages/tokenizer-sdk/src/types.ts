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
import { LunaSecError } from '@lunasec/isomorphic-common';

import { MetaData } from './generated';

export interface TokenizerClientConfig {
  /** The address of the tokenizer backend */
  url: string;
  metaEncoding?: 'base64';
  /** Used for when the tokenizer is running on the serverside and wants to authenticate itself */
  authenticationToken?: string;
  lockToSession?: boolean;
}

export interface FileInfo {
  filename: string;
  options: FilePropertyBag;
  headers: Record<string, string>;
  url: string;
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
  headers: Record<string, string>;
  downloadUrl: string;
}

export interface TokenizerFailApiResponse {
  success: false;
  error: LunaSecError;
}

export interface TokenizerDetokenizeFileInfo {
  success: true;
  fileInfo: FileInfo;
}

export interface TokenizerDetokenizeFileResponse {
  success: true;
  file: File;
}

export type SuccessOrFailOutput<S> = Promise<S | TokenizerFailApiResponse>;
