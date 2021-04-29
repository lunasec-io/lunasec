import {Tokenizer} from '@lunasec/tokenizer-sdk';
import {TOKENIZER_ERROR_CODES} from '@lunasec/tokenizer-sdk/build/main/api/client';

export async function detokenizeToken(token: string) {
  // TODO: When we want to build the "SaaS" version of this service, will we want to read this from a header instead?
  const tokenizer = new Tokenizer({
    secret: process.env.SECURE_FRAME_CLIENT_SECRET
  });

  const response = await tokenizer.detokenize(token);

  if (!response.success) {
    if (response.errorCode && response.errorCode === TOKENIZER_ERROR_CODES.NOT_FOUND) {
      return {
        success: false,
        tokenId: token,
        notFound: true
      };
    }

    console.error('Detokenization error:', response.error);
    return {
      success: false,
      tokenId: token,
      error: true
    };
  }

  return {
    success: true,
    tokenId: token,
    // Default to an empty string, otherwise the front-end will show "undefined" as text
    value: response.value !== undefined ? response.value : ''
  };
}

export async function tokenizeValue(value: string) {
  // TODO: When we want to build the "SaaS" version of this service, will we want to read this from a header instead?
  const tokenizer = new Tokenizer({
    secret: process.env.SECURE_FRAME_CLIENT_SECRET
  });

  return await tokenizer.tokenize(value);
}
