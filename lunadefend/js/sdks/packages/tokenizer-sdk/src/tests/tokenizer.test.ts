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
import axios from 'axios';

jest.mock('axios');

import { DetokenizeResponse, GetMetadataResponse, SetGrantResponse, TokenizeResponse } from '../generated';
import { Tokenizer } from '../tokenizer';
import {
  FileInfo,
  TokenizerDetokenizeResponse,
  TokenizerGetMetadataResponse,
  TokenizerSetGrantResponse,
  TokenizerTokenizeResponse,
} from '../types';

const mockAxios = axios as unknown as jest.Mocked<typeof axios>;

const tokenizer = new Tokenizer({ url: 'http://fake-tokenizer-backend.com' });

// TODO: test failure cases
describe('tokenizer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockAxios.create.mockReturnThis();
    // (makeRawRequest as unknown as jest.Mock).mockResolvedValue([{ statusCode: 200 }, Buffer.from('fakeS3Response')]);
    // (getUrl as unknown as jest.Mock).mockReturnValue(URL);
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
      mockAxios.put.mockResolvedValue({ status: 200 });

      const expectedOutput: TokenizerTokenizeResponse = {
        success: true,
        tokenId: 'fakeToken',
      };
      const result = tokenizer.tokenize('fakeString', { dataType: 'string' });
      await expect(result).resolves.toEqual(expectedOutput);
      // request to tokenizer backend
      expect(mockAxios.request).toHaveBeenCalledWith({
        data: '{"metadata":{"dataType":"string"}}',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: 'http://fake-tokenizer-backend.com/tokenize',
      });
      // s3 call
      expect(mockAxios.put).toHaveBeenCalledWith('http://fakeS3Url.com', 'fakeString', {
        headers: { 'Content-Type': 'text/plain', fake: 'header' },
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
      mockAxios.get.mockResolvedValue({ status: 200, data: 'fakeS3Response' });
      const expectedOutput: TokenizerDetokenizeResponse = {
        success: true,
        value: 'fakeS3Response',
        tokenId: 'fakeToken',
      };
      const result = tokenizer.detokenize('fakeToken');
      await expect(result).resolves.toEqual(expectedOutput);
      // tokenizer backend call
      expect(mockAxios.request).toHaveBeenCalledWith({
        data: '{"tokenId":"fakeToken"}',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: 'http://fake-tokenizer-backend.com/detokenize',
      });
      // s3 call
      expect(mockAxios.get).toHaveBeenCalledWith('http://fakeS3Url.com', { headers: { fake: 'header' } });
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
    it('sets full access grant', async () => {
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
      const result = tokenizer.createGrant('fakeSessionId', 'fakeToken');
      await expect(result).resolves.toEqual(expectedOutput);

      expect(mockAxios.request).toHaveBeenCalledWith({
        data: '{"sessionId":"fakeSessionId","tokenId":"fakeToken"}',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: 'http://fake-tokenizer-backend.com/grant/set',
      });
    });
  });

  describe('files', () => {
    const fakeFileInfo: FileInfo = {
      filename: 'fakefile',
      options: { lastModified: 123, type: 'application/pdf' },
      headers: { fake: 'headers' },
      url: 'www.fakeurl.com',
    };
    const fakeBlob = new Blob(['a', 'b', 'c'], { type: 'application/pdf' });
    beforeEach(() => {
      jest.spyOn(tokenizer, 'getMetadata').mockResolvedValue({
        success: true,
        metadata: {
          dataType: 'file',
          createdAt: 123,
          fileinfo: { filename: 'fakefile', type: 'application/pdf', lastModified: 123 },
        },
        tokenId: 'fakeToken', // Not sure why we pass this back, seems useless in this context
      });
      jest.spyOn(tokenizer, 'detokenizeToUrl').mockResolvedValue({
        success: true,
        headers: { fake: 'headers' },
        downloadUrl: 'www.fakeurl.com',
        tokenId: 'fakeToken',
      });

      mockAxios.get.mockResolvedValue({
        data: fakeBlob,
      });
    });
    it('gets file info', async () => {
      const res = await tokenizer.detokenizeToFileInfo('fakeToken');
      expect(res).toEqual({ success: true, fileInfo: fakeFileInfo });
    });

    it('detokenizes from file info', async () => {
      const res = await tokenizer.detokenizeFileFromFileInfo(fakeFileInfo);
      expect(res).toEqual({
        success: true,
        file: new File([fakeBlob], fakeFileInfo.filename, fakeFileInfo.options),
      });
    });

    it('detokenizes from token', async () => {
      const res = await tokenizer.detokenizeFile('fakeToken');
      expect(res).toEqual({
        success: true,
        file: new File([fakeBlob], fakeFileInfo.filename, fakeFileInfo.options),
      });
    });
  });
});
