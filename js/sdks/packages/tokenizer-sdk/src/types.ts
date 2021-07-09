export interface TokenizerClientConfig {
  host: string;
  metaEncoding: 'base64';
  endpoints: {
    setMetadata: string;
    getMetadata: string;
    getToken: string;
    setToken: string;
    setGrant: string;
    verifyGrant: string;
  };
  headers: {
    auth: string;
  };
  token?: string;
}

// _________________________  Responses ___________________________________

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

export interface TokenizerSetMetadataResponse {
  success: true;
  tokenId: string;
  metadata: Record<string, any>;
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

// ______________________ MetaData ______________________________

export interface BaseMeta {
  customFields?: Record<any, any>;
}

export interface StringMeta extends BaseMeta {
  dataType: 'string';
}

export interface FileMeta extends BaseMeta {
  dataType: 'file';
  fileinfo: {
    filename: string;
    type?: string;
    lastModified?: number;
  };
}

export type MetaData = StringMeta | FileMeta;

// ______________________ Grants ______________________________

export type GrantType = 'read_token' | 'store_token';
