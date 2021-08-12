jest.mock('axios');
jest.mock('@lunasec/server-common');
import { getUrl, makeRawRequest } from '@lunasec/server-common';
import axios from 'axios';

import { DetokenizeResponse, GetMetadataResponse, SetGrantResponse, TokenizeResponse } from '../generated';
import { Tokenizer } from '../tokenizer';
import {
  TokenizerDetokenizeResponse,
  TokenizerGetMetadataResponse,
  TokenizerSetGrantResponse,
  TokenizerTokenizeResponse,
} from '../types';

const mockAxios = axios as unknown as jest.Mocked<typeof axios>;

const tokenizer = new Tokenizer({ host: 'http://fake-tokenizer-backend.com' });

// TODO: test failure cases

describe('fetchData', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (makeRawRequest as unknown as jest.Mock).mockResolvedValue([{ statusCode: 200 }, Buffer.from('fakeS3Response')]);
    (getUrl as unknown as jest.Mock).mockReturnValue(URL);
  });

  describe('tokenize', () => {
    it('works', async () => {
      const axiosRes: { data: TokenizeResponse } = {
        data: {
          success: true,
          data: {
            tokenId: 'fakeToken',
            uploadUrl: 'http://fakeS3Url.com',
            headers: { fake: 'header' },
          },
        },
      };
      mockAxios.request.mockResolvedValue(axiosRes);

      const expectedOutput: TokenizerTokenizeResponse = {
        success: true,
        tokenId: 'fakeToken',
      };
      const result = tokenizer.tokenize('fakeString', { dataType: 'string' });
      await expect(result).resolves.toEqual(expectedOutput);

      expect(mockAxios.request).toHaveBeenCalledWith({
        data: '{"metadata":{"dataType":"string"}}',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: 'http://fake-tokenizer-backend.com/tokenize',
      });
    });
  });

  describe('detokenize', () => {
    it('works', async () => {
      const axiosRes: { data: DetokenizeResponse } = {
        data: {
          success: true,
          data: {
            headers: { fake: 'header' },
            downloadUrl: 'http://fakeS3Url.com',
          },
        },
      };
      mockAxios.request.mockResolvedValue(axiosRes);

      const expectedOutput: TokenizerDetokenizeResponse = {
        success: true,
        value: 'fakeS3Response',
        tokenId: 'fakeToken',
      };
      const result = tokenizer.detokenize('fakeToken');
      await expect(result).resolves.toEqual(expectedOutput);

      expect(mockAxios.request).toHaveBeenCalledWith({
        data: '{"tokenId":"fakeToken"}',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: 'http://fake-tokenizer-backend.com/detokenize',
      });
    });
  });

  describe('getMetadata', () => {
    it('works', async () => {
      const axiosRes: { data: GetMetadataResponse } = {
        data: {
          success: true,
          data: {
            metadata: {
              dataType: 'string',
            },
          },
        },
      };
      mockAxios.request.mockResolvedValue(axiosRes);

      const expectedOutput: TokenizerGetMetadataResponse = {
        success: true,
        tokenId: 'fakeToken',
        metadata: {
          dataType: 'string',
        },
      };
      const result = tokenizer.getMetadata('fakeToken');
      await expect(result).resolves.toEqual(expectedOutput);

      expect(mockAxios.request).toHaveBeenCalledWith({
        data: '{"tokenId":"fakeToken"}',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: 'http://fake-tokenizer-backend.com/metadata/get',
      });
    });
  });

  describe('grants', () => {
    it('sets read grant', async () => {
      const axiosRes: { data: SetGrantResponse } = {
        data: {
          success: true,
          data: {},
        },
      };
      mockAxios.request.mockResolvedValue(axiosRes);

      const expectedOutput: TokenizerSetGrantResponse = {
        success: true,
      };
      const result = tokenizer.createReadGrant('fakeSessionId', 'fakeToken');
      await expect(result).resolves.toEqual(expectedOutput);

      expect(mockAxios.request).toHaveBeenCalledWith({
        data: '{"sessionId":"fakeSessionId","tokenId":"fakeToken","grantType":"read_token"}',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: 'http://fake-tokenizer-backend.com/grant/set',
      });
    });

    it('sets store grant', async () => {
      const axiosRes: { data: SetGrantResponse } = {
        data: {
          success: true,
          data: {},
        },
      };
      mockAxios.request.mockResolvedValue(axiosRes);

      const expectedOutput: TokenizerSetGrantResponse = {
        success: true,
      };
      const result = tokenizer.createDataBaseStoreGrant('fakeSessionId', 'fakeToken');
      await expect(result).resolves.toEqual(expectedOutput);

      expect(mockAxios.request).toHaveBeenCalledWith({
        data: '{"sessionId":"fakeSessionId","tokenId":"fakeToken","grantType":"store_token"}',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: 'http://fake-tokenizer-backend.com/grant/set',
      });
    });
  });
});
