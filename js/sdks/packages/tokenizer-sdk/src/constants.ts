import { TokenizerClientConfig } from './types';

const __TOKENIZER_URL__: string = process.env.TOKENIZER_URL;

export const CONFIG_DEFAULTS: TokenizerClientConfig = {
  host: __TOKENIZER_URL__ || 'http://localhost:37766',
  metaEncoding: 'base64',
  baseRoute: '',
};

export const LUNASEC_TOKEN_REGEXP =
  /^lunasec-[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export const SESSION_HASH_HEADER = 'lunasec-session-hash';

export const AUTHORIZATION_HEADER = 'authorization'.toLowerCase();
