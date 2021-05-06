import { TokenizerClientConfig } from './types';

const __TOKENIZER_URL__: string = process.env.TOKENIZER_URL;
const __CLIENT_SECRET__: string = process.env.CLIENT_SECRET;

export const CONFIG_DEFAULTS: TokenizerClientConfig = {
  host: __TOKENIZER_URL__,
  secret: __CLIENT_SECRET__,
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
