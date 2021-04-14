
export interface TokenizerClientConfig {
  host: string,
  metaEncoding: "base64",
  endpoints: {
    setMetadata: string,
    getMetadata: string,
    getToken: string,
    setToken: string,
  },
  headers: {
    key: string,
    meta: string,
  },
  secret?: string
}

export interface TokenizerTokenizeResponse {
  success: true,
  tokenId: string
}

export interface TokenizerDetokenizeResponse {
  success: true,
  tokenId: string,
  value: string
}
