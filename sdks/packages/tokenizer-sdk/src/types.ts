export interface TokenizerClientConfig {
  host: string;
  metaEncoding: 'base64';
  endpoints: {
    setMetadata: string;
    getMetadata: string;
    getToken: string;
    setToken: string;
  };
  headers: {
    auth: string;
  };
  token?: string;
}

export interface TokenizerGetMetadataResponse {
  success: true;
  tokenId: string;
  metadata: Record<string, string>;
}

export interface TokenizerSetMetadataResponse {
  success: true;
  tokenId: string;
  metadata: Record<string, string>;
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
