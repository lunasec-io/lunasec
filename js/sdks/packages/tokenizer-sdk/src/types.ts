import * as http from 'http';

export interface TokenizerClientConfig {
  host: string;
  metaEncoding: 'base64';
  backendMode: 'express-plugin' | 'standalone';
  headers: {
    auth: string;
  };
  authenticationToken?: string;
}

// ______________________ tokenizer.ts Return Types _________________

export interface DetokenizeToUrlReturnType {
  success: true;
  tokenId: string;
  headers: http.OutgoingHttpHeaders;
  downloadUrl: string;
}
export interface TokenizerSetGrantResponse {
  success: true;
}

// ______________________ MetaData ______________________________

export interface BaseMeta {
  customFields?: Record<string, any>;
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
