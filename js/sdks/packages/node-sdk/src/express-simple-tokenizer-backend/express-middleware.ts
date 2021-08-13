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
          message: 'Missing tokenId to detokenize token with',
          name: 'noTokenId',
        });
        return;
      }

      if (!isToken(tokenId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid tokenId provided to detokenize',
          name: 'badTokenId',
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
