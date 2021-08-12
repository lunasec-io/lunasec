import { OutgoingHttpHeaders } from 'http';

import { AxiosError } from 'axios';

import { downloadFromS3WithSignedUrl, uploadToS3WithSignedUrl } from './aws';
import { CONFIG_DEFAULTS } from './constants';
import { Configuration, DefaultApi, GrantType, MetaData } from './generated';
import {
  GrantTypeEnum,
  GrantTypeUnion,
  SuccessOrFailOutput,
  TokenizerClientConfig,
  TokenizerDetokenizeResponse,
  TokenizerDetokenizeToUrlResponse,
  TokenizerFailApiResponse,
  TokenizerGetMetadataResponse,
  TokenizerTokenizeResponse,
} from './types';

// Uses an openAPI generated client to query the tokenizer.  The biggest gotchas here are that:
// 1) Axios returns an res object with the tokenizer's response on the 'data' property, but the tokenizer also wraps its responses with 'data'
// So the actual response body is res.data.data.  We handle that here
// 2) Axios throws for any non 200 response code, and then we lose the typing of the error response, so we catch and then stick it back on.

export class Tokenizer {
  readonly config!: TokenizerClientConfig;
  readonly openApi: DefaultApi;
  private readonly reqOptions: Record<string, any>;

  constructor(config?: Partial<TokenizerClientConfig>) {
    // Deep clone config for mutation safety.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.config = JSON.parse(JSON.stringify(Object.assign({}, CONFIG_DEFAULTS, config)));

    const headers: OutgoingHttpHeaders = {
      'Content-Type': 'application/json',
    };
    const jwtToken = this.config.authenticationToken;
    if (jwtToken) {
      headers[this.config.headers.auth] = jwtToken;
    }
    this.reqOptions = { headers }; // This is passed to the openapi client on every request

    const basePath = this.getBasePath();

    // openapi stuff
    const openAPIConfig = new Configuration({ basePath });
    this.openApi = new DefaultApi(openAPIConfig);
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
      error: e,
    };
  }

  public createReadGrant(sessionId: string, tokenId: string) {
    return this.createAnyGrant(sessionId, tokenId, GrantType.ReadToken);
  }

  public createDataBaseStoreGrant(sessionId: string, tokenId: string) {
    return this.createAnyGrant(sessionId, tokenId, GrantType.StoreToken);
  }

  private async createAnyGrant(sessionId: string, tokenId: string, grantType: GrantType) {
    try {
      const res = await this.openApi.setGrant(
        {
          sessionId,
          tokenId,
          grantType: grantType,
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

  // there has got to be a better way than this
  private convertGrantTypeToEnum(grantTypeString: GrantTypeUnion) {
    if (grantTypeString === 'read_token') {
      return GrantTypeEnum.ReadToken;
    }
    if (grantTypeString === 'store_token') {
      return GrantTypeEnum.StoreToken;
    }
    throw new Error(`Bad grant type passed to tokenizer: ${grantTypeString.toString()}`);
  }

  async verifyGrant(sessionId: string, tokenId: string, grantType: GrantTypeUnion) {
    const ennumifiedGrantType = this.convertGrantTypeToEnum(grantType);
    try {
      const res = await this.openApi.verifyGrant(
        {
          sessionId,
          tokenId,
          grantType: ennumifiedGrantType,
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
      return this.handleError(e);
    }
  }

  // TODO: Add another method that _doesn't_ take a key, so that we handle generation.

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
      console.error(e);
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

  async detokenizeToUrl(tokenId: string): SuccessOrFailOutput<TokenizerDetokenizeToUrlResponse> {
    try {
      const response = await this.openApi.detokenize(
        {
          tokenId,
        },
        this.reqOptions
      );
      const res = response.data;

      if (!res.data) {
        return {
          success: false,
          error: new Error('Invalid response from Tokenizer when detokenizing data'),
        };
      }

      const { downloadUrl, headers } = res.data;
      return {
        success: true,
        tokenId: tokenId,
        headers: headers,
        downloadUrl: downloadUrl,
      };
    } catch (e) {
      return this.handleError(e);
    }
  }
}
