import express from 'express';
import { CONFIG_DEFAULTS } from '../constants';
import { TEST_TOKENIZER_SECRET } from './test-constants';
import tape from 'tape';

export function verifySecretHeader(test: tape.Test, secret: string = TEST_TOKENIZER_SECRET) {
  return async (req: express.Request) => {
    test.equal(req.headers[CONFIG_DEFAULTS.headers.key], secret, 'secret header passed correctly');
  };
}

export function verifyHeaders(test: tape.Test, headers: Record<string, string>) {
  return async (req: express.Request) => {
    Object.keys(headers).forEach((header) =>
      test.equal(req.headers[header], headers[header], `header matches: ${header}`)
    );
  };
}
