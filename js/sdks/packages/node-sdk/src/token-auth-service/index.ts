import { SignJWT, KeyLike } from 'jose/jwt/sign';

import { getSecretFromSecretProvider, ValidSecretProvider } from './types';

export class LunaSecDetokenizeTokenGrant {
  private readonly detokenizationGrant!: string;

  constructor(detokenizationGrant: string) {
    this.detokenizationGrant = detokenizationGrant;
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

export class LunaSecTokenAuthService {
  private readonly config!: TokenAuthServiceConfig;

  constructor(config: TokenAuthServiceConfig) {
    this.config = config;
  }

  async getSigningSecretKey() {
    // This is the simplest way to reduce the copy-paste code of the code below :shrug:
    // Would a @ts-ignore have been a better solution?
    function _getSecret<T, TFoo extends (provider: T) => Promise<KeyLike>>(providerFn: TFoo, provider: T) {
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

  public async authorize(token: string): Promise<LunaSecDetokenizeTokenGrant> {
    const secret = await this.getSigningSecretKey();

    const claims = { 'token_id': token };

    const jwt = await new SignJWT(claims)
      .setProtectedHeader({ alg: 'RSA-OAEP-256' })
      .setIssuedAt()
      .setIssuer('node-sdk')
      .setAudience('secure-frame')
      .setExpirationTime('15m')
      .sign(secret)

    return new LunaSecDetokenizeTokenGrant(jwt.toString());
  }

  public verifyTokenGrant(tokenGrant: string | LunaSecDetokenizeTokenGrant): boolean {
    if (typeof tokenGrant === 'object') {
      return tokenGrant.isValid();
    }

    return new LunaSecDetokenizeTokenGrant(tokenGrant).isValid();
  }
}
