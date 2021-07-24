import { TokenizerClientConfig } from './types';

const __TOKENIZER_URL__: string = process.env.TOKENIZER_URL;

export const CONFIG_DEFAULTS: TokenizerClientConfig = {
  host: __TOKENIZER_URL__ || 'http://localhost:37766',
  metaEncoding: 'base64',
  backendMode: 'standalone',
  headers: {
    auth: 'Authorization'.toLowerCase(),
  },
};

export const TOKEN_PREFIX = 'lunasec-';
