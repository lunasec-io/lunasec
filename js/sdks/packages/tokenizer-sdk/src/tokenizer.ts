import { OutgoingHttpHeaders } from 'http';

import { BadHttpResponseError } from '@lunasec/server-common';

import { TokenizerAPI, TokenizerFailApiResponse } from './api/client';
import { downloadFromS3WithSignedUrl, uploadToS3WithSignedUrl } from './aws';
import { CONFIG_DEFAULTS } from './constants';
import { DetokenizeToUrlReturnType, GrantType, MetaData, TokenizerClientConfig } from './types';

export class Tokenizer {
  readonly config!: TokenizerClientConfig;

  private readonly api: TokenizerAPI;
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
    this.api = new TokenizerAPI(this.config.host, headers, backendBasePath);
  }

  async setGrant(sessionId: string, tokenId: string, grantType: GrantType) {
    const response = await this.api.call('/grant/set', {
      sessionId,
      tokenId,
      grantType,
    });

    if (!response.success) {
      return response;
    }

    return {
      success: true,
    };
  }

  async verifyGrant(sessionId: string, tokenId: string, grantType: GrantType) {
    const response = await this.api.call('/grant/verify', {
      sessionId,
      tokenId,
      grantType,
    });

    if (!response.success) {
      return response;
    }

    return {
      success: true,
      valid: response.data.data.valid,
    };
  }

  async getMetadata(tokenId: string) {
    const response = await this.api.call('/metadata/get', {
      tokenId: tokenId,
    });

    if (!response.success) {
      return response;
    }

    return {
      success: true,
      tokenId,
      // TODO: make sure that data matches expected type with validator
      metadata: response.data.data.metadata,
    };
  }

  async setMetadata(tokenId: string, metadata: MetaData) {
    const response = await this.api.call('/metadata/set', {
      tokenId,
      metadata,
    });

    if (!response.success) {
      return response;
    }

    return {
      success: true,
      tokenId,
      metadata,
    };
  }

  // TODO: Add another method that _doesn't_ take a key, so that we handle generation.

  async tokenize(input: string | Buffer, metadata: MetaData) {
    const response = await this.api.call('/tokenize', {
      metadata,
    });

    if (!response.success) {
      return response;
    }

    if (!response.data.data) {
      return {
        success: false,
        error: new Error('Invalid response from Tokenizer when tokenizing data'),
      };
    }

    const data = response.data.data;

    try {
      await uploadToS3WithSignedUrl(data.uploadUrl, data.headers, input);

      return {
        success: true,
        tokenId: data.tokenId,
      };
    } catch (e) {
      console.error('S3 upload error', e);
      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    const response = await this.api.call('/detokenize', {
      tokenId: tokenId,
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

    if (!response.data.data) {
      return {
        success: false,
        error: new Error('Invalid response from Tokenizer when detokenizing data'),
      };
    }

    const { downloadUrl, headers } = response.data.data;

    return {
      success: true,
      tokenId: tokenId,
      headers: headers,
      downloadUrl: downloadUrl,
    };
  }
}
