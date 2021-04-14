/**
 * When adding a new API request, start by adding it here.
 * Ideally, the Typescript should fail to compile when you do.
 * The next step is to add Request/Response types and then "map" them to each other.
 */
export enum TokenizerRequest {
  getMetadata = "getMetadata",
  setMetadata = "setMetadata",
  setToken = "setToken",
  getToken = "getToken",
}

export type ValidTokenizerApiRequestTypes = (keyof typeof TokenizerRequest | keyof TokenizerRequestResponseMessageMap | keyof TokenizerRequestMessageMap);

/// Generic Base Types ///
export interface BaseTokenizerRequest {
}

export interface TokenizerApiResponse<T> {
  success: boolean,
  msg?: string,
  result?: T
}

/// API Request Schemas ///

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
  value: string;
}

export interface GetTokenRequest extends BaseTokenizerRequest {
  /**
   * Needs to be a UUID.
   */
  tokenId: string;
}

export interface SetTokenRequest extends BaseTokenizerRequest {
  value: string;
}


/// API Response Schemas ///
export interface GetMetadataResponse {
  success: boolean;
  data: {
    value: string;
  }
}

export interface SetMetadataResponse {
  success: boolean;
}

export interface GetTokenResponse {
  success: boolean;
  data: {
    downloadUrl: string;
    headers: Record<string, string>;
  }
}

export interface SetTokenResponse {
  success: boolean;
  data: {
    tokenId: string;
    uploadUrl: string;
    headers: Record<string, string>;
  }
}

/// Request Type Lookup ///
export type TokenizerRequestLookup = {
  [key in keyof typeof TokenizerRequest]: BaseTokenizerRequest
}

export interface TokenizerRequestMessageMap extends TokenizerRequestLookup {
  getMetadata: GetMetadataRequest,
  setMetadata: SetMetadataRequest,
  getToken: GetTokenRequest,
  setToken: SetTokenRequest,
}

/// Response Type Lookup ///
export type TokenizerResponseLookup = {
  [key in keyof typeof TokenizerRequest]: TokenizerRequestResponseMessageMap[key]
}

export interface TokenizerRequestResponseMessageMap extends TokenizerResponseLookup {
  getMetadata: GetMetadataResponse,
  setMetadata: SetMetadataResponse,
  getToken: GetTokenResponse,
  setToken: SetTokenResponse,
}
