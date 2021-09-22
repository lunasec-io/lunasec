import { createPublicKey, KeyObject } from 'crypto';

import { fromKeyLike, JWK } from 'jose/jwk/from_key_like';
import { KeyLike, SignJWT } from 'jose/jwt/sign';

import { AuthenticationJWT } from './authentication-jwt';
import { awsSecretProvider } from './aws-secret-provider';
import { environmentSecretProvider } from './environment-secret-provider';
import { JwtSubject, SecretConfig } from './types';

// Todo: rename this whole service to JWT service, all it does is make JWTs, it doesnt do "auth" really
export class KeyService {
  readonly secretConfig: SecretConfig;

  constructor(secretConfig: SecretConfig) {
    this.secretConfig = secretConfig;
  }

  private getSigningPrivateKey(): Promise<KeyLike> {
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

  public async getSigningPublicKey(): Promise<KeyObject> {
    const privateKey = await this.getSigningPrivateKey();
    const privateKeyObject = privateKey as KeyObject;
    return createPublicKey({
      key: privateKeyObject.export({
        format: 'pem',
        type: 'pkcs1',
      }),
    });
  }

  public async getJwksConfig(): Promise<JWK> {
    const publicKey = await this.getSigningPublicKey();
    return await fromKeyLike(publicKey);
  }

  public async createAuthenticationJWT(subject: JwtSubject, claims: Record<string, any>): Promise<AuthenticationJWT> {
    const privateKey = await this.getSigningPrivateKey();
    const publicKey = await this.getSigningPublicKey();
    const jwt = await new SignJWT(claims)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setIssuer('node-sdk')
      .setSubject(subject)
      .setAudience('secure-frame')
      .setExpirationTime('15m')
      .sign(privateKey);

    return new AuthenticationJWT(jwt);
  }
}
