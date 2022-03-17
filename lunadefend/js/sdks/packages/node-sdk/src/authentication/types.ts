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
import { KeyLike } from 'crypto';

import { Request } from 'express';

export interface EnvironmentSecretConfig {
  provider: 'environment';
}

export interface ManualSecretConfig {
  provider: 'manual';
  signingKey: KeyLike;
}

export interface AwsSecretsManagerConfig {
  provider: 'awsSecretsManager';
  secretArn: string;
  awsAccessKey?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export type JwtSubject = 'user' | 'application';
/**
 * A configuration object that tells the LunaSec key generator where to find the signing key
 *
 * For example
 * ```typescript
 * {
 *   provider: 'environment'
 * }
 * ```
 * which will read the signing key from `process.env.LUNASEC_SIGNING_KEY` as base64 encoded
 *
 * Or for example to just pass it in
 * ```typescript
 * {type:'manual',
 * signingKey: createPrivateKey(signingKey) // This needs to be a node KeyLike object
 * }
 * ```
 */
export type SecretConfig = EnvironmentSecretConfig | AwsSecretsManagerConfig | ManualSecretConfig; // Maybe we should just replace this with letting the user pass in a string like every other parameter, this feels somewhat over-engineered currently

export type SessionIdProvider = (req: Request) => Promise<string | null>;
