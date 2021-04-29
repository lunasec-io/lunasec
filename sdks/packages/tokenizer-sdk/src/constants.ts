import { TokenizerClientConfig } from './types';

export const CONFIG_DEFAULTS: TokenizerClientConfig = {
  host: 'http://localhost:37765',
  metaEncoding: 'base64',
  endpoints: {
    setMetadata: '/metadata/set',
    getMetadata: '/metadata/get',
    getToken: '/detokenize',
    setToken: '/tokenize',
  },
  headers: {
    key: 'X-Tokenizer-Secret-Key'.toLowerCase(),
    meta: 'X-Tokenizer-Meta'.toLowerCase(),
  },
};
