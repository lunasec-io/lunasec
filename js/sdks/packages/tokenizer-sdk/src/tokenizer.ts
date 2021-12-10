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
import { OutgoingHttpHeaders } from 'http';

import { LunaSecError } from '@lunasec/isomorphic-common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FileWithPath } from 'react-dropzone';

import { downloadFromS3WithSignedUrl, uploadToS3WithSignedUrl } from './aws';
import { AUTHORIZATION_HEADER, CONFIG_DEFAULTS, SESSION_HASH_HEADER } from './constants';
import { Configuration, DefaultApi, ErrorResponse, ErrorResponseError, MetaData } from './generated';
import {
  FileInfo,
  SuccessOrFailOutput,
  TokenizerClientConfig,
  TokenizerDetokenizeFileInfo,
  TokenizerDetokenizeFileResponse,
  TokenizerDetokenizeResponse,
  TokenizerDetokenizeToUrlResponse,
  TokenizerFailApiResponse,
  TokenizerGetMetadataResponse,
  TokenizerTokenizeResponse,
  TokenizerVerifyGrantResponse,
} from './types';

// Uses an openAPI generated client to query the tokenizer.  The biggest gotchas here are that:
// 1) Axios returns an res object with the tokenizer's response on the 'data' property, but the tokenizer also wraps its responses with 'data'
// So the actual response body is res.data.data.  We handle that here
// 2) Axios throws for any non 200 response code, and then we lose the typing of the error response, so we catch and then stick it back on.

export class Tokenizer {
  readonly config!: TokenizerClientConfig;
  readonly apiClient: DefaultApi;
  private reqOptions: { headers: OutgoingHttpHeaders };

  constructor(config: Partial<TokenizerClientConfig>) {
    // Deep clone config for mutation safety.
    this.config = JSON.parse(JSON.stringify(Object.assign({}, CONFIG_DEFAULTS, config)));

    const headers: OutgoingHttpHeaders = {
      'Content-Type': 'application/json',
    };
    const jwtToken = this.config.authenticationToken;
    if (jwtToken) {
      headers[AUTHORIZATION_HEADER] = jwtToken;
    }
    this.reqOptions = { headers }; // This is passed to the openapi client on every request

    // openapi stuff
    const openAPIConfig = new Configuration({ basePath: this.config.url });
    const axiosInstance = axios.create({});
    this.apiClient = new DefaultApi(openAPIConfig, undefined, axiosInstance);
  }

  private handleError(e: AxiosError | Error | unknown): TokenizerFailApiResponse {
    if (!(e instanceof Error)) {
      // this will likely never happen but TS makes you handle it
      throw e;
    }
    // this will be what happens
    return {
      success: false,
      error: this.constructError(e),
    };
  }

  private constructError(e: AxiosError<ErrorResponse> | Error): LunaSecError {
    if ('response' in e && e.response) {
      const errorWithCoercedType = e.response.data.error as ErrorResponseError & {
        errorMessage?: string;
      };

      // Parse the axios error, if it has any meaningful data about the response
      return new LunaSecError({
        name: e.response.data.error.name || 'TokenizerError',
        // TODO: Update this to "message" to conform with openAPI spec once the Tokenizer Backend uses OpenAPI
        message: errorWithCoercedType.message || errorWithCoercedType.errorMessage || 'Unknown Tokenizer Error',
        code: e.response.status.toString(),
      });
    }
    if (e instanceof Error) {
      return new LunaSecError(e); // This can handle axios errors where we dont even get a response, or any other case
    }
    return new LunaSecError({ name: 'unknownTokenizerError', message: 'Unknown Tokenization Error', code: '500' });
  }

  public async createGrant(sessionId: string, tokenId: string, customDuration?: string) {
    try {
      const res = await this.apiClient.setGrant(
        {
          sessionId,
          tokenId,
          customDuration,
        },
        this.reqOptions
      );
      return {
        success: res.data.success,
      };
    } catch (e) {
      return this.handleError(e);
    }
  }

  async verifyGrant(sessionId: string, tokenId: string): SuccessOrFailOutput<TokenizerVerifyGrantResponse> {
    try {
      const res = await this.apiClient.verifyGrant(
        {
          sessionId,
          tokenId,
        },
        this.reqOptions
      );
      return {
        success: true,
        valid: res.data.data.valid,
      };
    } catch (e) {
      return this.handleError(e);
    }
  }

  async getMetadata(tokenId: string): SuccessOrFailOutput<TokenizerGetMetadataResponse> {
    try {
      const res = await this.apiClient.getMetaData(
        {
          tokenId,
        },
        this.reqOptions
      );
      return {
        success: true,
        metadata: res.data.data.metadata,
        tokenId: tokenId, // Not sure why we pass this back, seems useless in this context
      };
    } catch (e) {
      return this.handleError(e);
    }
  }

  async tokenize(input: string | Buffer, metadata: MetaData): SuccessOrFailOutput<TokenizerTokenizeResponse> {
    try {
      const res = await this.apiClient.tokenize(
        {
          metadata,
        },
        this.reqOptions
      );
      const data = res.data.data;
      await uploadToS3WithSignedUrl(data.uploadUrl, data.headers as OutgoingHttpHeaders, input);

      return {
        success: true,
        tokenId: data.tokenId,
      };
    } catch (e) {
      return this.handleError(e);
    }
  }

  async detokenize(tokenId: string): SuccessOrFailOutput<TokenizerDetokenizeResponse> {
    const response = await this.detokenizeToUrl(tokenId);

    if (!response.success) {
      return response;
    }
    const { headers, downloadUrl } = response;
    return {
      success: true,
      tokenId: tokenId,
      value: await downloadFromS3WithSignedUrl(downloadUrl, headers),
    };
  }

  /**
   * Binds this instance of the tokenizer to a session so that any requests after the first detokenization will include
   * a hash generated by the Tokenizer Backend as a header.  Any requests that include a hash not matching the current session
   * will not be honored by the Backend, locking this tokenizer to the session of the first request it made
   */
  private handleSessionHashTracking(response: AxiosResponse): { success: false; error: LunaSecError } | null {
    if (!this.config.lockToSession) {
      return null;
    }
    // already bound to a session
    if (this.reqOptions.headers[SESSION_HASH_HEADER]) {
      return null;
    }
    const sessionHash = response.headers[SESSION_HASH_HEADER] as string | undefined;
    if (sessionHash === undefined) {
      return {
        success: false,
        error: new LunaSecError({
          name: 'detokenizationiFrameSessionBinding',
          message: 'session hash was not set in response when detokenizing, unable to bind iFrame to a session',
          code: '500',
        }),
      };
    }
    this.reqOptions.headers[SESSION_HASH_HEADER] = sessionHash;
    return null;
  }

  async detokenizeToUrl(tokenId: string): SuccessOrFailOutput<TokenizerDetokenizeToUrlResponse> {
    try {
      const response = await this.apiClient.detokenize(
        {
          tokenId,
        },
        this.reqOptions
      );
      const sessionError = this.handleSessionHashTracking(response);
      if (sessionError) {
        return sessionError;
      }

      const res = response.data;

      if (!res.data) {
        return {
          success: false,
          error: new LunaSecError({
            name: 'badDetokenizeResponse',
            message: 'Invalid response from Tokenizer when detokenizing data',
            code: '500',
          }),
        };
      }

      const { downloadUrl, headers } = res.data;
      return {
        success: true,
        tokenId: tokenId,
        headers: headers as Record<string, string>,
        downloadUrl: downloadUrl,
      };
    } catch (e) {
      return this.handleError(e);
    }
  }

  /**
   * // Fetches file info and pre-signed URL needed to start a file download.
   * Useful when we want to prepare the option to start a download but not yet start one.
   * Grabs the file URL and metadata in parallel.  Similar to detokenizeToUrl but for files
   * @param token
   */
  async detokenizeToFileInfo(token: string): SuccessOrFailOutput<TokenizerDetokenizeFileInfo> {
    const metaPromise = this.getMetadata(token);
    // TODO: make this function able to skip detokenizing to URL optionally because sometimes we dont need it.
    const urlPromise = this.detokenizeToUrl(token);
    const [metaRes, urlRes] = await Promise.all([metaPromise, urlPromise]);
    if (!metaRes.success) {
      return metaRes;
    }
    if (!urlRes.success) {
      return urlRes;
    }

    const meta = metaRes.metadata;

    if (meta.dataType !== 'file' || !('fileinfo' in meta)) {
      return {
        success: false,
        error: new LunaSecError({
          name: 'wrongMetaDataType',
          code: '400',
          message: "Couldn't find metadata information for a file, it may have been the wrong type of token.",
        }),
      };
    }

    const fileMeta = meta.fileinfo;
    const fileInfo: FileInfo = {
      filename: fileMeta.filename,
      options: {
        lastModified: fileMeta.lastModified,
        type: fileMeta.type,
      },
      headers: urlRes.headers,
      url: urlRes.downloadUrl,
    };
    return {
      success: true,
      fileInfo,
    };
  }

  /**
   * BROWSER ONLY
   * Triggers a download of a file that we already got the file info for using getFileInfo
   * @param fileInfo LunaSec's custom FileInfo object which tells us about the tokenized file
   */
  async detokenizeFileFromFileInfo(fileInfo: FileInfo): SuccessOrFailOutput<TokenizerDetokenizeFileResponse> {
    const axiosInstance = axios.create();
    try {
      const res = await axiosInstance.get(fileInfo.url, {
        headers: fileInfo.headers,
        responseType: 'blob',
      });
      return {
        success: true,
        file: new File([res.data], fileInfo.filename, fileInfo.options),
      };
    } catch (e) {
      return this.handleError(e);
    }
  }

  /**
   * BROWSER ONLY
   * Takes a token and downloads and returns a File object, complete with proper name, mime type, and lastModified fields
   * @param token
   */
  async detokenizeFile(token: string): SuccessOrFailOutput<TokenizerDetokenizeFileResponse> {
    const fileInfoRes = await this.detokenizeToFileInfo(token);
    if (!fileInfoRes.success) {
      return fileInfoRes;
    }
    return this.detokenizeFileFromFileInfo(fileInfoRes.fileInfo);
  }

  /**
   * BROWSER ONLY
   * uploads a file into LunaSec and returns a tokenId, just like `tokenize`
   * @param file
   * @param customMetadata
   */
  async tokenizeFile(
    file: File | FileWithPath,
    customMetadata?: Record<string, unknown>
  ): SuccessOrFailOutput<TokenizerTokenizeResponse> {
    try {
      const arrayBuf = await file.arrayBuffer();
      // Turn the JS ArrayBuffer into a Node type Buffer for tokenizer
      // todo: try skipping this
      const buf = Buffer.from(new Uint8Array(arrayBuf));
      const meta: MetaData = {
        dataType: 'file',
        fileinfo: {
          filename: file.name,
          type: file.type,
          lastModified: file.lastModified,
        },
        customFields: customMetadata,
      };
      return this.tokenize(buf, meta);
    } catch (e) {
      return this.handleError(e);
    }
  }
}
