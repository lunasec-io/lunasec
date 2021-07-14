import { BadHttpResponseError } from '@lunasec/server-common';

import { makeSpecificApiClient, SpecificApiClient, TokenizerFailApiResponse } from './api/client';
import { ValidTokenizerApiRequestTypes } from './api/types';
import { downloadFromS3WithSignedUrl, uploadToS3WithSignedUrl } from './aws';
import { CONFIG_DEFAULTS } from './constants';
import {
  GrantType,
  TokenizerClientConfig,
  TokenizerDetokenizeResponse,
  TokenizerDetokenizeToUrlResponse,
  TokenizerGetMetadataResponse,
  TokenizerSetGrantResponse,
  TokenizerSetMetadataResponse,
  TokenizerTokenizeResponse,
  TokenizerVerifyGrantResponse,
} from './types';

export class Tokenizer {
  readonly config!: TokenizerClientConfig;

  private readonly getMetadataClient!: SpecificApiClient<'getMetadata'>;
  private readonly setMetadataClient!: SpecificApiClient<'setMetadata'>;
  private readonly getTokenClient!: SpecificApiClient<'getToken'>;
  private readonly setTokenClient!: SpecificApiClient<'setToken'>;
  private readonly setGrantClient!: SpecificApiClient<'setGrant'>;
  private readonly verifyGrantClient!: SpecificApiClient<'verifyGrant'>;

  constructor(config?: Partial<TokenizerClientConfig>) {
    // Deep clone config for mutation safety.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.config = JSON.parse(JSON.stringify(Object.assign({}, CONFIG_DEFAULTS, config)));

    const jwtToken = this.config.authenticationToken;
    console.log('set jwtToken in tokenizer: ', jwtToken);
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers[this.config.headers.auth] = jwtToken;
    }

    const makeApiClient = <T extends ValidTokenizerApiRequestTypes>(endpoint: string) => {
      return makeSpecificApiClient<T>(this.config.host, endpoint, {
        method: 'POST',
        headers,
      });
    };

    this.getMetadataClient = makeApiClient<'getMetadata'>(this.config.endpoints.getMetadata);
    this.setMetadataClient = makeApiClient<'setMetadata'>(this.config.endpoints.setMetadata);
    this.getTokenClient = makeApiClient<'getToken'>(this.config.endpoints.getToken);
    this.setTokenClient = makeApiClient<'setToken'>(this.config.endpoints.setToken);
    this.setGrantClient = makeApiClient<'setGrant'>(this.config.endpoints.setGrant);
    this.verifyGrantClient = makeApiClient<'verifyGrant'>(this.config.endpoints.verifyGrant);
  }

  async setGrant(
    sessionId: string,
    tokenId: string,
    grantType: GrantType
  ): Promise<TokenizerFailApiResponse | TokenizerSetGrantResponse> {
    const response = await this.setGrantClient({
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

  async verifyGrant(
    sessionId: string,
    tokenId: string,
    grantType: GrantType
  ): Promise<TokenizerFailApiResponse | TokenizerVerifyGrantResponse> {
    const response = await this.verifyGrantClient({
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

  async getMetadata(tokenId: string): Promise<TokenizerFailApiResponse | TokenizerGetMetadataResponse> {
    const response = await this.getMetadataClient({
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

  async setMetadata<T extends Record<string, any>>(
    tokenId: string,
    metadata: T
  ): Promise<TokenizerFailApiResponse | TokenizerSetMetadataResponse> {
    // TODO: set up proper typing/schema for the metadata object and share it between the whole project
    // This check is really hard to do right in JS and we should probably just skip it altogether
    if (!(metadata instanceof Object)) {
      throw new Error('Metadata must be an object');
    }

    const response = await this.setMetadataClient({
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

  async tokenize(
    input: string | Buffer,
    metadata?: Record<string, any>
  ): Promise<TokenizerFailApiResponse | TokenizerTokenizeResponse> {
    if (metadata === undefined) {
      metadata = {};
    }

    const response = await this.setTokenClient({
      metadata: metadata,
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

  async detokenize(tokenId: string): Promise<TokenizerFailApiResponse | TokenizerDetokenizeResponse> {
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

  async detokenizeToUrl(tokenId: string): Promise<TokenizerFailApiResponse | TokenizerDetokenizeToUrlResponse> {
    const response = await this.getTokenClient({
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
