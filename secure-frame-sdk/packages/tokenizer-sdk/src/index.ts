import {
  makeSpecificApiClient,
  SpecificApiClient, TokenizerFailApiResponse
} from './api/client';
import {downloadFromS3WithSignedUrl, uploadToS3WithSignedUrl} from './aws';
import {
  TokenizerClientConfig,
  TokenizerDetokenizeResponse,
  TokenizerTokenizeResponse
} from './types';
import {CONFIG_DEFAULTS} from './constants';

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

    this.getMetadataClient = makeSpecificApiClient<"getMetadata">(this.config.host, this.config.endpoints.getMetadata, {
      method: 'POST',
      headers
    });
    this.setMetadataClient = makeSpecificApiClient<"setMetadata">(this.config.host, this.config.endpoints.setMetadata, {
      method: 'POST',
      headers
    });
    this.getTokenClient = makeSpecificApiClient<"getToken">(this.config.host, this.config.endpoints.getToken, {
      method: 'POST',
      headers
    });
    this.setTokenClient = makeSpecificApiClient<"setToken">(this.config.host, this.config.endpoints.setToken, {
      method: 'POST',
      headers
    });
  }

  // TODO: Evaluate adding back keygenSet and keygenGet methods

  async getMetadata(tokenId: string) {
    return await this.getMetadataClient({
      tokenId: tokenId
    });
  }

  async setMetadata(tokenId: string, metadata: string) {
    return await this.setMetadataClient({
      tokenId,
      value: metadata
    });
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

    await uploadToS3WithSignedUrl(data.uploadUrl, data.headers, input);

    return {
      success: true,
      tokenId: data.tokenId
    };
  }

  async detokenize(tokenId: string): Promise<TokenizerFailApiResponse | TokenizerDetokenizeResponse> {
    const response = await this.getTokenClient({
      tokenId: tokenId
    });

    if (!response.success) {
      return response;
    }

    if (!response.data.data) {
      throw new Error('Invalid response from Tokenizer when detokenizing data');
    }

    const {downloadUrl, headers} = response.data.data;

    return {
      success: true,
      tokenId: tokenId,
      value: await downloadFromS3WithSignedUrl(downloadUrl, headers)
    };
  }
}
