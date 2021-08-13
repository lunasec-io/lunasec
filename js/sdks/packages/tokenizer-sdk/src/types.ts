export { MetaData } from './generated';
import { LunaSecError } from '@lunasec/isomorphic-common';

import { GrantType, MetaData } from './generated';
export const GrantTypeEnum = GrantType;

export interface TokenizerClientConfig {
  host: string;
  baseRoute: string;
  metaEncoding: 'base64';
  headers: {
    auth: string;
  };
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
  errorCode?: 400 | 401 | 404 | 500;
}

export type SuccessOrFailOutput<S> = Promise<S | TokenizerFailApiResponse>;

export type GrantTypeUnion = GrantType[keyof GrantType];
