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

import { downloadFromS3WithSignedUrl, uploadToS3WithSignedUrl } from './aws';
import { AUTHORIZATION_HEADER, CONFIG_DEFAULTS, SESSION_HASH_HEADER } from './constants';
import { Configuration, DefaultApi, ErrorResponse, ErrorResponseError, MetaData } from './generated';
import {
  FileInfo,
  SuccessOrFailOutput,
  TokenizerClientConfig,
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
  readonly openApi: DefaultApi;
  private reqOptions: { headers: OutgoingHttpHeaders };

  constructor(config?: Partial<TokenizerClientConfig>) {
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

    const basePath = this.getBasePath();
    // openapi stuff
    const openAPIConfig = new Configuration({ basePath });
    const axiosInstance = axios.create({});
    this.openApi = new DefaultApi(openAPIConfig, undefined, axiosInstance);
  }

  private getBasePath(): string {
    if (this.config.baseRoute !== '') {
      return new URL(this.config.baseRoute, this.config.host).toString();
    }
    return new URL(this.config.host).origin;
  }

  private handleError(e: AxiosError | Error): TokenizerFailApiResponse {
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
      const res = await this.openApi.setGrant(
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
      if (e instanceof Error) {
        return this.handleError(e);
      }

      throw e;
    }
  }

  async verifyGrant(sessionId: string, tokenId: string): SuccessOrFailOutput<TokenizerVerifyGrantResponse> {
    try {
      const res = await this.openApi.verifyGrant(
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
      if (e instanceof Error) {
        return this.handleError(e);
      }

      throw e;
    }
  }

  async getMetadata(tokenId: string): SuccessOrFailOutput<TokenizerGetMetadataResponse> {
    try {
      const res = await this.openApi.getMetaData(
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
      if (e instanceof Error) {
        return this.handleError(e);
      }

      throw e;
    }
  }

  async tokenize(input: string | Buffer, metadata: MetaData): SuccessOrFailOutput<TokenizerTokenizeResponse> {
    try {
      const res = await this.openApi.tokenize(
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
      if (e instanceof Error) {
        return this.handleError(e);
      }

      throw e;
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
      const response = await this.openApi.detokenize(
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
      if (e instanceof Error) {
        return this.handleError(e);
      }

      throw e;
    }
  }

  /**
   * // Fetches file info needed by the browser to start a file download.  Grabs the file URL and metadata in parallel
   * @param token
   * @throws LunaSecError
   */
  async getFileInfo(token: string): Promise<FileInfo> {
    const metaPromise = this.getMetadata(token);
    const urlPromise = this.detokenizeToUrl(token);
    const [metaRes, urlRes] = await Promise.all([metaPromise, urlPromise]);
    if (!metaRes.success) {
      throw metaRes.error;
    }
    if (!urlRes.success) {
      throw urlRes.error;
    }

    const meta = metaRes.metadata;

    if (meta.dataType !== 'file' || !('fileinfo' in meta)) {
      throw new LunaSecError({
        name: 'wrongMetaDataType',
        code: '400',
        message: "Couldn't find metadata information for a file, it may have been the wrong type of token.",
      });
    }

    const fileMeta = meta.fileinfo;
    return {
      filename: fileMeta.filename,
      options: {
        lastModified: fileMeta.lastModified,
        type: fileMeta.type,
      },
      headers: urlRes.headers,
      url: urlRes.downloadUrl,
    };
  }

  async downloadFileFromFileInfo(fileInfo: FileInfo) {
    const axiosInstance = axios.create();
    const res = await axiosInstance.get(fileInfo.url, {
      headers: fileInfo.headers,
      responseType: 'blob',
    });
    // const bits = await res.data;
    return new File([res.data], fileInfo.filename, fileInfo.options);
  }

  async detokenizeFile(token: string): Promise<File> {
    const fileInfo = await this.getFileInfo(token);
    return this.downloadFileFromFileInfo(fileInfo);
  }

  async tokenizeFile(
    file: File,
    customMetadata: Record<string, unknown>
  ): SuccessOrFailOutput<TokenizerTokenizeResponse> {
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
  }
}
