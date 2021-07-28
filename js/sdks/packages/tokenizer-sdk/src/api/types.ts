/**
 * When adding a new API request, start by adding it here.
 * Ideally, the Typescript should fail to compile when you do.
 * The next step is to add Request/Response types and then "map" them to each other.
 */

import * as http from 'http';

import { GrantType, MetaData } from '../types';
/// Generic Base Types ///
export interface BaseTokenizerRequest {}

export interface TokenizerApiResponse<T> {
  success: boolean;
  msg?: string;
  result?: T;
}

/// API Request Schemas ///
export interface SetGrantRequest extends BaseTokenizerRequest {
  sessionId: string;
  tokenId: string;
  grantType: GrantType;
}

export interface VerifyGrantRequest extends BaseTokenizerRequest {
  sessionId: string;
  tokenId: string;
  grantType: GrantType;
}

export interface GetMetadataRequest extends BaseTokenizerRequest {
  /**
   * Needs to be a UUID.
   */
  tokenId: string;
}

export interface SetMetadataRequest extends BaseTokenizerRequest {
  /**
   * Needs to be a UUID.
   */
  tokenId: string;
  metadata: MetaData;
}

export interface DetokenizeRequest extends BaseTokenizerRequest {
  /**
   * Needs to be a UUID.
   */
  tokenId: string;
}

export interface TokenizeRequest extends BaseTokenizerRequest {
  metadata: MetaData;
}

/// API Response Schemas ///
export interface SetGrantResponse {
  success: boolean;
  data: Record<any, never>;
}

export interface VerifyGrantResponse {
  success: boolean;
  data: {
    valid: boolean;
  };
}

export interface GetMetadataResponse {
  success: boolean;
  data: {
    metadata: MetaData;
  };
}

export interface SetMetadataResponse {
  success: boolean;
}

export interface DetokenizeResponse {
  success: boolean;
  data: {
    downloadUrl: string;
    headers: http.OutgoingHttpHeaders;
  };
}

export interface TokenizerResponse {
  success: boolean;
  data: {
    tokenId: string;
    uploadUrl: string;
    headers: http.IncomingHttpHeaders;
  };
}

export interface Requests {
  '/grant/set': SetGrantRequest;
  '/grant/verify': VerifyGrantRequest;
  '/metadata/get': GetMetadataRequest;
  '/metadata/set': SetMetadataRequest;
  '/detokenize': DetokenizeRequest;
  '/tokenize': TokenizeRequest;
}

export interface Responses {
  '/grant/set': SetGrantResponse;
  '/grant/verify': VerifyGrantResponse;
  '/metadata/get': GetMetadataResponse;
  '/metadata/set': SetMetadataResponse;
  '/detokenize': DetokenizeResponse;
  '/tokenize': TokenizerResponse;
}

// Just makes sure the above route lists dont drift apart, should go in another file because json-schema hates this kind of weird stuff
// type AssertKeysEqual<T1 extends Record<keyof T2, any>, T2 extends Record<keyof T1, any>> = never;
// export type Assertion = AssertKeysEqual<TokenizerRequests, TokenizerResponses>;
