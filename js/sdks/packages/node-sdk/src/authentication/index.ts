import { KeyLike, SignJWT } from 'jose/jwt/sign';

import { AuthenticationJWT } from './authentication-jwt';
import { awsSecretProvider } from './aws-secret-provider';
import { environmentSecretProvider } from './environment-secret-provider';
import { SecretConfig } from './types';
export class LunaSecAuthentication {
  readonly secretConfig: SecretConfig;

  constructor(secretConfig: SecretConfig) {
    this.secretConfig = secretConfig;
  }

  private getSigningSecretKey(): Promise<KeyLike> {
    if (this.secretConfig.source === 'awsSecretsManager') {
      return awsSecretProvider(this.secretConfig);
    }

    if (this.secretConfig.source === 'environment') {
      return environmentSecretProvider();
    }

    if (this.secretConfig.source === 'manual') {
      return Promise.resolve(this.secretConfig.signingKey) as Promise<KeyLike>; // Very strange to need this casting, typescript is expanding this type and then not matching it
    }

    throw new Error('Unknown provider specified');
  }

  public async createAuthenticationJWT(claims: Record<string, any>): Promise<AuthenticationJWT> {
    const secret = await this.getSigningSecretKey();

    const jwt = await new SignJWT(claims)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setIssuer('node-sdk')
      .setAudience('secure-frame')
      .setExpirationTime('15m')
      .sign(secret);

    return new AuthenticationJWT(jwt);
  }
}
