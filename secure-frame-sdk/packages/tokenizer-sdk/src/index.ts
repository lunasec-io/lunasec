import {
  makeSpecificApiClient,
  SpecificApiClient, TokenizerFailApiResponse
} from './api/client';
import {downloadFromS3WithSignedUrl, uploadToS3WithSignedUrl} from './aws';
import {
  TokenizerClientConfig,
  TokenizerDetokenizeResponse,
  TokenizerGetMetadataResponse,
  TokenizerSetMetadataResponse,
  TokenizerTokenizeResponse
} from './types';
import {CONFIG_DEFAULTS} from './constants';
import {ValidTokenizerApiRequestTypes} from './api/types';
import {BadHttpResponseError} from '@esluna/common';

export class Tokenizer {
  readonly config!: TokenizerClientConfig;

  private readonly getMetadataClient!: SpecificApiClient<"getMetadata">;
  private readonly setMetadataClient!: SpecificApiClient<"setMetadata">;
  private readonly getTokenClient!: SpecificApiClient<"getToken">;
  private readonly setTokenClient!: SpecificApiClient<"setToken">;

  constructor(config?: Partial<TokenizerClientConfig>) {
    // Deep clone config for mutation safety.
    this.config = JSON.parse(JSON.stringify(Object.assign({}, CONFIG_DEFAULTS, config)));

    const SECRET_VALUE = this.config.secret || process.env.ESLUNA_TOKENIZER_SECRET;

    if (!SECRET_VALUE) {
      throw new Error('Unable to create esluna Tokenizer client without secret value');
    }

    const headers = {
      [this.config.headers.key]: SECRET_VALUE
    };

    const makeApiClient = <T extends ValidTokenizerApiRequestTypes>(endpoint: string) => {
      return makeSpecificApiClient<T>(this.config.host, endpoint, {
        method: 'POST',
        headers
      });
    }

    this.getMetadataClient = makeApiClient<"getMetadata">(this.config.endpoints.getMetadata);
    this.setMetadataClient = makeApiClient<"setMetadata">(this.config.endpoints.setMetadata);
    this.getTokenClient = makeApiClient<"getToken">(this.config.endpoints.getToken);
    this.setTokenClient = makeApiClient<"setToken">(this.config.endpoints.setToken);
  }

  // TODO: Evaluate adding back keygenSet and keygenGet methods

  async getMetadata(tokenId: string): Promise<TokenizerFailApiResponse | TokenizerGetMetadataResponse> {
    const response = await this.getMetadataClient({
      tokenId: tokenId
    });

    if (!response.success) {
      return response;
    }

    return {
      success: true,
      tokenId,
      value: response.data.data.value
    };
  }

  async setMetadata(tokenId: string, metadata: string): Promise<TokenizerFailApiResponse | TokenizerSetMetadataResponse> {
    if (typeof metadata !== 'string') {
      throw new Error('Metadata must be a string value');
    }

    const response = await this.setMetadataClient({
      tokenId,
      value: metadata
    });

    if (!response.success) {
      return response;
    }

    return {
      success: true,
      tokenId,
      value: metadata
    }
  }

  // TODO: Add another method that _doesn't_ take a key, so that we handle generation.
  async tokenize(input: string): Promise<TokenizerFailApiResponse | TokenizerTokenizeResponse> {
    const response = await this.setTokenClient({
      value: input
    });

    if (!response.success) {
      return response;
    }

    if (!response.data.data) {
      return {
        success: false,
        error: new Error('Invalid response from Tokenizer when tokenizing data')
      }
    }

    const data = response.data.data;

    console.log({data, input});

    try {
      await uploadToS3WithSignedUrl(data.uploadUrl, data.headers, input);

      return {
        success: true,
        tokenId: data.tokenId
      };
    } catch (e) {
      console.error('S3 upload error', e);
      return {
        success: false,
        error: e
      };
    }
  }

  async detokenize(tokenId: string): Promise<TokenizerFailApiResponse | TokenizerDetokenizeResponse> {
    const response = await this.getTokenClient({
      tokenId: tokenId
    });

    if (!response.success) {
      if (response.error instanceof BadHttpResponseError) {
        const httpError = response.error as BadHttpResponseError;

        return {
          ...response,
          errorCode: httpError.responseCode
        };
      }

      return response;
    }

    if (!response.data.data) {
      return {
        success: false,
        error: new Error('Invalid response from Tokenizer when detokenizing data')
      };
    }

    const {downloadUrl, headers} = response.data.data;

    return {
      success: true,
      tokenId: tokenId,
      value: await downloadFromS3WithSignedUrl(downloadUrl, headers)
    };
  }
}
