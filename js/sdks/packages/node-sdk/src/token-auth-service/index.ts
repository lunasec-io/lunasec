import { KeyLike, SignJWT } from 'jose/jwt/sign';
import { JWTPayload } from 'jose/types';

import { getSecretFromSecretProvider, ValidSecretProvider } from './types';

// TODO (cthompson) we should have a base jwt class that these two inherit from

export class LunaSecAuthenticationGrant {
  private readonly authGrant!: string;

  constructor(authGrant: string) {
    this.authGrant = authGrant;
  }

  public isValid(): boolean {
    // TODO: Check the current date against the expiration
    throw new Error('not implemented');
  }

  public toString() {
    return `lunasec-grant-authentication_${this.authGrant}`;
  }
}

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
    return `lunasec-grant-detokenization_${this.detokenizationGrant}`;
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

  async getSigningSecretKey(): Promise<KeyLike> {
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

  private async createJwt(claims: Record<string, unknown>): Promise<string> {
    const secret = await this.getSigningSecretKey();

    const jwt = await new SignJWT(claims)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setIssuer('node-sdk')
      .setAudience('secure-frame')
      .setExpirationTime('15m')
      .sign(secret);

    return jwt.toString();
  }

  public async authenticate(payload: JWTPayload): Promise<LunaSecAuthenticationGrant> {
    const encodedJwt = await this.createJwt(payload);
    return new LunaSecAuthenticationGrant(encodedJwt);
  }

  public async authorize(token: string): Promise<LunaSecDetokenizeTokenGrant> {
    const claims = { token_id: token };
    const encodedJwt = await this.createJwt(claims);
    return new LunaSecDetokenizeTokenGrant(encodedJwt);
  }

  public verifyTokenGrant(tokenGrant: string | LunaSecDetokenizeTokenGrant): boolean {
    if (typeof tokenGrant === 'object') {
      return tokenGrant.isValid();
    }

    return new LunaSecDetokenizeTokenGrant(tokenGrant).isValid();
  }
}
