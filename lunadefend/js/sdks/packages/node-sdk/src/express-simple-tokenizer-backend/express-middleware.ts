/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// NOTE: TypeScript is unhappy about Express being handed an async function. This disabled that check.

import {
  DetokenizeRequest,
  DetokenizeResponse,
  ErrorResponse,
  isToken,
  TokenizeRequest,
  TokenizeResponse,
} from '@lunasec/tokenizer-sdk';
import bodyParser from 'body-parser';
import { Application, Request, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { v4 as uuid } from 'uuid';

import { SimpleTokenizerBackend } from './simple-tokenizer-backend';

interface TypedRequest<B> extends Request {
  body: B;
}
interface TypedResponse<R> extends Response {
  json: (response: R | ErrorResponse) => this;
}

export function registerExpressMiddleware(app: Application, tokenizerBackend: SimpleTokenizerBackend) {
  const validator = OpenApiValidator.middleware({
    apiSpec: __dirname + '/../../../copied-schema/simple-tokenizer.yaml',
    validateResponses: true, // false by default
  });

  const bodyParserMiddleware = bodyParser.json();

  app.use(/^\/\.lunasec\/.*/, validator);
  app.use(/^\/\.lunasec\/.*/, bodyParserMiddleware);

  app.post(
    '/.lunasec/detokenize',
    async (req: TypedRequest<DetokenizeRequest>, res: TypedResponse<DetokenizeResponse>) => {
      const tokenId = req.body.tokenId;
      if (!tokenId) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Missing tokenId to detokenize token with',
            name: 'noTokenId',
          },
        });
        return;
      }

      if (!isToken(tokenId)) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Invalid tokenId provided to detokenize',
            name: 'badTokenId',
          },
        });
        return;
      }

      const { url, headers } = await tokenizerBackend.getTokenPresignedUrl(tokenId);

      res.status(200).json({
        success: true,
        data: {
          downloadUrl: url,
          headers: headers,
        },
      });
    }
  );

  app.post('/.lunasec/tokenize', async (_req: TypedRequest<TokenizeRequest>, res: TypedResponse<TokenizeResponse>) => {
    const tokenId = `lunasec-${uuid()}`;

    const { url, headers } = await tokenizerBackend.createTokenPresignedUrl(tokenId);

    res.status(200).json({
      success: true,
      data: {
        tokenId: tokenId,
        uploadUrl: url,
        headers: headers,
      },
    });
  });
}
