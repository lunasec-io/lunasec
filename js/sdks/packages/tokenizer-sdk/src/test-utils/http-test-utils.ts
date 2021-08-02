// import express from 'express';
// import tape from 'tape';
//
// import { CONFIG_DEFAULTS } from '../constants';
//
// import { TEST_TOKENIZER_SECRET } from './test-constants';
//
// export function verifySecretHeader(test: tape.Test, secret: string = TEST_TOKENIZER_SECRET) {
//   return async (req: express.Request) => {
//     test.equal(req.headers[CONFIG_DEFAULTS.headers.auth], secret, 'secret header passed correctly');
//   };
// }
//
// export function verifyHeaders(test: tape.Test, headers: Record<string, string>) {
//   return async (req: express.Request) => {
//     Object.keys(headers).forEach((header) =>
//       test.equal(req.headers[header], headers[header], `header matches: ${header}`)
//     );
//   };
// }
