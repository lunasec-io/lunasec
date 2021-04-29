import express from 'express';
import { GetMetadataResponse, GetTokenResponse, SetMetadataResponse, SetTokenResponse } from '../api/types';
import { TEST_METADATA, TEST_PLAINTEXT_VALUE, TEST_QUERY_PARAMS, TEST_S3_HEADERS, TEST_TOKEN } from './test-constants';
import { CONFIG_DEFAULTS } from '../constants';

export type OnResponseCallback = (req: express.Request) => Promise<Record<string, any> | void>;

export interface FakeTokenizerServiceConfig {
  port: number;
  onRequestCallback?: OnResponseCallback;
  onS3Callback?: OnResponseCallback;
}

export function createFakeTokenizerService(config: FakeTokenizerServiceConfig) {
  const awsS3WritePath = '9ff28';

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
    CONFIG_DEFAULTS.endpoints.setToken,
    respondWithJson<SetTokenResponse>({
      success: true,
      data: {
        tokenId: TEST_TOKEN,
        uploadUrl: `http://localhost:${config.port}/${awsS3WritePath}${TEST_QUERY_PARAMS}`,
        headers: TEST_S3_HEADERS.PUT,
      },
    })
  );

  app.use(
    CONFIG_DEFAULTS.endpoints.getToken,
    respondWithJson<GetTokenResponse>({
      success: true,
      data: {
        downloadUrl: `http://localhost:${config.port}/${awsS3WritePath}${TEST_QUERY_PARAMS}`,
        headers: TEST_S3_HEADERS.GET,
      },
    })
  );

  app.use(
    CONFIG_DEFAULTS.endpoints.setMetadata,
    respondWithJson<SetMetadataResponse>({
      success: true,
    })
  );

  app.use(
    CONFIG_DEFAULTS.endpoints.getMetadata,
    respondWithJson<GetMetadataResponse>({
      success: true,
      data: {
        value: TEST_METADATA,
      },
    })
  );

  app.put(`/${awsS3WritePath}`, async (req, res) => {
    if (config.onS3Callback) {
      const customResponse = await config.onS3Callback(req);

      if (customResponse) {
        res.json(customResponse);
        return;
      }
    }

    res.send();
  });

  app.get(`/${awsS3WritePath}`, async (req, res) => {
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
