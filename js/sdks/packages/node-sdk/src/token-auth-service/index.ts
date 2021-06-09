import { Tokenizer } from '@lunasec/tokenizer-sdk';
// import { EncryptJWT } from 'jose/jwt/encrypt';

import { getSecretFromSecretProvider, ValidSecretProvider } from './types';

export class LunaSecToken {
  private readonly tokenizerService!: Tokenizer;
  private readonly tokenAuthService!: TokenAuthService;
  public readonly token!: string;

  constructor(tokenizerService: Tokenizer, tokenAuthService: TokenAuthService, token: string) {
    this.tokenizerService = tokenizerService;
    this.tokenAuthService = tokenAuthService;
    this.token = token;
  }

  public detokenize() {
    return this.tokenizerService.detokenize(this.token);
  }

  public generateDetokenizationGrant() {
    return this.tokenAuthService.generateDetokenizationGrant(this.token);
  }

  public toString() {
    return this.token;
  }
}

export class LunaSecDetokenizeTokenGrant {
  private readonly detokenizationGrant!: string;
  public readonly token!: string;
  public readonly expiration!: number;

  constructor(detokenizationGrant: string) {
    // TODO: Grab this value from the grant itself
    this.token = 'asdf';

    // TODO: Validate that this is a correct structure
    this.detokenizationGrant = detokenizationGrant;

    // TODO: Grab this value from the grant itself
    this.expiration = 1234;
  }

  public isValid(): boolean {
    // TODO: Check the current date against the expiration
    throw new Error('not implemented');
  }

  public toString() {
    return this.detokenizationGrant;
  }
}

export interface TokenAuthServiceConfig {
  secretProvider: ValidSecretProvider;
}

export class TokenAuthService {
  private readonly config!: TokenAuthServiceConfig;

  constructor(config: TokenAuthServiceConfig) {
    this.config = config;
  }

  async getSigningSecretKeys() {
    // This is the simplest way to reduce the copy-paste code of the code below :shrug:
    // Would a @ts-ignore have been a better solution?
    function _getSecret<T, TFoo extends (provider: T) => Promise<string>>(providerFn: TFoo, provider: T) {
      return providerFn(provider);
    }

    if (this.config.secretProvider.type === 'awsSecretsManager') {
      return await _getSecret(getSecretFromSecretProvider[this.config.secretProvider.type], this.config.secretProvider);
    }

    if (this.config.secretProvider.type === 'environment') {
      return await _getSecret(getSecretFromSecretProvider[this.config.secretProvider.type], this.config.secretProvider);
    }

    throw new Error('Unknown provider specified');
  }

  public async generateDetokenizationGrant(token: string): Promise<LunaSecDetokenizeTokenGrant> {
    // const secret = await this.getSigningSecretKeys();

    // const claims = { 'urn:example:claim': true };

    // const jwt = await new EncryptJWT(claims)
    //   .setProtectedHeader({ alg: 'RSA-OAEP-256' });
    //   .setIssuedAt()
    //   .setIssuer('urn:example:issuer')
    //   .setAudience('urn:example:audience')
    //   .setExpirationTime('2h')
    //   .encrypt(secretKey)

    throw new Error('not implemented: ' + token);
  }

  public verifyTokenGrant(tokenGrant: string | LunaSecDetokenizeTokenGrant): boolean {
    if (typeof tokenGrant === 'object') {
      return tokenGrant.isValid();
    }

    return new LunaSecDetokenizeTokenGrant(tokenGrant).isValid();
  }
}
