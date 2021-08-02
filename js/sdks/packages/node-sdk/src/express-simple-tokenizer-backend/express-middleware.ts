import { isToken } from '@lunasec/tokenizer-sdk';
import bodyParser from 'body-parser';
import { Application } from 'express';
import { v4 as uuid } from 'uuid';

import { SimpleTokenizerBackend } from './simple-tokenizer-backend';

export function registerExpressMiddleware(app: Application, tokenizerBackend: SimpleTokenizerBackend) {
  const bodyParserMiddleware = bodyParser.json();

  app.post('/.lunasec/detokenize', bodyParserMiddleware, async (req, res) => {
    const tokenId = req.body.tokenId;

    if (!tokenId) {
      res.status(400).json({
        success: false,
        error: 'Missing tokenId to detokenize token with',
        errorCode: 400,
      });
      return;
    }

    if (!isToken(tokenId)) {
      res.status(400).json({
        success: false,
        error: 'Invalid tokenId provided to detokenize',
        errorCode: 400,
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
  });

  app.post('/.lunasec/tokenize', bodyParserMiddleware, async (_req, res) => {
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
