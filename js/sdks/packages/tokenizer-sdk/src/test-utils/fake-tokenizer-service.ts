import express from 'express';

import { DetokenizeResponse, GetMetadataResponse, SetMetadataResponse, TokenizerResponse } from '../api/types';
import { CONFIG_DEFAULTS } from '../constants';

import {
  makeS3Url,
  TEST_METADATA,
  TEST_PLAINTEXT_VALUE,
  TEST_S3_FILE_PATH,
  TEST_S3_HEADERS,
  TEST_TOKEN,
} from './test-constants';

export type OnResponseCallback = (req: express.Request) => Promise<Record<string, any> | void>;

export interface FakeTokenizerServiceConfig {
  port: number;
  onRequestCallback?: OnResponseCallback;
  onS3Callback?: OnResponseCallback;
}

export function createFakeTokenizerService(config: FakeTokenizerServiceConfig) {
  const app = express();

  function respondWithJson<T>(json: T) {
    return async function jsonResponder(req: express.Request, res: express.Response) {
      if (config.onRequestCallback) {
        const customResponse = await config.onRequestCallback(req);

        if (customResponse) {
          res.json(customResponse);
          return;
        }
      }

      res.json(json);
    };
  }

  app.use(
    '/tokenize',
    respondWithJson<TokenizerResponse>({
      success: true,
      data: {
        tokenId: TEST_TOKEN,
        uploadUrl: makeS3Url(config.port),
        headers: TEST_S3_HEADERS.PUT,
      },
    })
  );

  app.use(
    '/detokenize',
    respondWithJson<DetokenizeResponse>({
      success: true,
      data: {
        downloadUrl: makeS3Url(config.port),
        headers: TEST_S3_HEADERS.GET,
      },
    })
  );

  app.use(
    '/metadata/set',
    respondWithJson<SetMetadataResponse>({
      success: true,
    })
  );

  app.use(
    '/metadata/get',
    respondWithJson<GetMetadataResponse>({
      success: true,
      data: {
        metadata: TEST_METADATA,
      },
    })
  );

  app.put(`/${TEST_S3_FILE_PATH}`, async (req, res) => {
    if (config.onS3Callback) {
      const customResponse = await config.onS3Callback(req);

      if (customResponse) {
        res.json(customResponse);
        return;
      }
    }

    res.send();
  });

  app.get(`/${TEST_S3_FILE_PATH}`, async (req, res) => {
    if (config.onS3Callback) {
      const customResponse = await config.onS3Callback(req);

      if (customResponse) {
        res.json(customResponse);
        return;
      }
    }

    res.send(TEST_PLAINTEXT_VALUE);
  });

  return app.listen(config.port);
}
