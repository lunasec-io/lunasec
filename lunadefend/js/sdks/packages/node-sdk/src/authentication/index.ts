/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { createPublicKey, KeyObject } from 'crypto';

// eslint-disable-next-line import/no-unresolved
import { fromKeyLike, JWK } from 'jose/jwk/from_key_like';
// eslint-disable-next-line import/no-unresolved
import { KeyLike, SignJWT } from 'jose/jwt/sign';

import { AuthenticationJWT } from './authentication-jwt';
import { awsSecretProvider } from './aws-secret-provider';
import { environmentSecretProvider } from './environment-secret-provider';
import { JwtSubject, SecretConfig } from './types';

export class KeyService {
  readonly secretConfig: SecretConfig;

  constructor(secretConfig: SecretConfig) {
    this.secretConfig = secretConfig;
  }

  private getSigningPrivateKey(): Promise<KeyLike> {
    if (this.secretConfig.provider === 'awsSecretsManager') {
      return awsSecretProvider(this.secretConfig);
    }

    if (this.secretConfig.provider === 'environment') {
      return environmentSecretProvider();
    }

    if (this.secretConfig.provider === 'manual') {
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

  public async createAuthenticationJWT(
    subject: JwtSubject,
    claims: Record<string, unknown>
  ): Promise<AuthenticationJWT> {
    const privateKey = await this.getSigningPrivateKey();

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
