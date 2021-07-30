import { OutgoingHttpHeaders } from 'http';

import { BadHttpResponseError } from '@lunasec/server-common';

import { TokenizerApiWrapper, TokenizerFailApiResponse } from './api/client';
import { downloadFromS3WithSignedUrl, uploadToS3WithSignedUrl } from './aws';
import { CONFIG_DEFAULTS } from './constants';
import { Configuration, DefaultApi, GrantType } from './generated';
import { DetokenizeToUrlReturnType, MetaData, TokenizerClientConfig } from './types';

export class Tokenizer {
  readonly config!: TokenizerClientConfig;
  readonly openApi: DefaultApi;
  private readonly apiWrapper: TokenizerApiWrapper;

  constructor(config?: Partial<TokenizerClientConfig>) {
    // Deep clone config for mutation safety.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.config = JSON.parse(JSON.stringify(Object.assign({}, CONFIG_DEFAULTS, config)));

    const headers: OutgoingHttpHeaders = {
      'Content-Type': 'application/json',
    };
    // The iframe doesnt set this to anything at the moment, not sure if that's okay
    const jwtToken = this.config.authenticationToken;
    if (jwtToken) {
      headers[this.config.headers.auth] = jwtToken;
    }
    const backendBasePath = this.config.backendMode === 'express-plugin' ? '/.lunasec' : '';

    // openapi stuff

    const openAPIConfig = new Configuration({ basePath: backendBasePath });
    this.openApi = new DefaultApi(openAPIConfig);

    this.apiWrapper = new TokenizerApiWrapper(this.config.host, headers);
  }

  public createReadGrant(sessionId: string, tokenId: string) {
    return this.createAnyGrant(sessionId, tokenId, GrantType.ReadToken);
  }

  public createDataBaseStoreGrant(sessionId: string, tokenId: string) {
    return this.createAnyGrant(sessionId, tokenId, GrantType.StoreToken);
  }

  private async createAnyGrant(sessionId: string, tokenId: string, grantType: GrantType) {
    const response = await this.apiWrapper.wrap(this.openApi.setGrant.bind(this.openApi), {
      sessionId,
      tokenId,
      grantType: grantType,
    });

    if (!response.success) {
      return response;
    }

    return {
      success: true,
    };
  }

  async verifyGrant(sessionId: string, tokenId: string, grantType: GrantType) {
    const response = await this.apiWrapper.wrap(this.openApi.verifyGrant.bind(this.openApi), {
      sessionId,
      tokenId,
      grantType: grantType,
    });
    if (!response.success) {
      return response;
    }
    console.log(response);
    return {
      success: true,
      valid: response.data.valid,
    };
  }

  async getMetadata(tokenId: string) {
    const response = await this.apiWrapper.wrap(this.openApi.getMetaData.bind(this.openApi), {
      tokenId,
    });

    if (!response.success) {
      return response;
    }

    return {
      success: true,
      tokenId,
      // TODO: make sure that data matches expected type with validator
      metadata: response.data.metadata,
    };
  }

  // TODO: Add another method that _doesn't_ take a key, so that we handle generation.

  async tokenize(input: string | Buffer, metadata: MetaData) {
    const response = await this.apiWrapper.wrap(this.openApi.tokenize.bind(this.openApi), {
      metadata,
    });

    if (!response.success) {
      return response;
    }

    if (!response.data) {
      return {
        success: false,
        error: new Error('Invalid response from Tokenizer when tokenizing data'),
      };
    }

    const data = response.data;

    try {
      await uploadToS3WithSignedUrl(data.uploadUrl, data.headers as OutgoingHttpHeaders, input);

      return {
        success: true,
        tokenId: data.tokenId,
      };
    } catch (e) {
      console.error('S3 upload error', e);
      return {
        success: false,
        error: e,
      };
    }
  }

  async detokenize(tokenId: string) {
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

  async detokenizeToUrl(tokenId: string): Promise<TokenizerFailApiResponse | DetokenizeToUrlReturnType> {
    const response = await this.apiWrapper.wrap(this.openApi.detokenize.bind(this.openApi), {
      tokenId,
    });

    if (!response.success) {
      if (response.error instanceof BadHttpResponseError) {
        const httpError = response.error;

        return {
          ...response,
          errorCode: httpError.responseCode,
        };
      }

      return response;
    }

    if (!response.data) {
      return {
        success: false,
        error: new Error('Invalid response from Tokenizer when detokenizing data'),
      };
    }

    const { downloadUrl, headers } = response.data;

    return {
      success: true,
      tokenId: tokenId,
      headers: headers as OutgoingHttpHeaders,
      downloadUrl: downloadUrl,
    };
  }
}
