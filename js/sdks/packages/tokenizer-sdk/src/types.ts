export { MetaData } from './generated';
import { LunaSecError } from '@lunasec/isomorphic-common';

import { MetaData } from './generated';

export interface TokenizerClientConfig {
  /** The address of the tokenizer backend */
  host: string;
  /** The baseroute of the tokenizer backend, like /.lunasec/, defaults to nothing */
  baseRoute: string;
  metaEncoding: 'base64';
  /** Used for when the tokenizer is running on the serverside and wants to authenticate itself */
  authenticationToken?: string;
  lockToSession: boolean;
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
