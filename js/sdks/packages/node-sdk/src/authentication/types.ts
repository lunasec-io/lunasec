import { KeyLike } from 'crypto';

import { Request } from 'express';

export interface EnvironmentSecretConfig {
  source: 'environment';
}

export interface ManualSecretConfig {
  source: 'manual';
  signingKey: KeyLike;
}

export interface AwsSecretsManagerConfig {
  source: 'awsSecretsManager';
  secretsManagerSecretArn: string;
  awsAccessKey?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export type SecretConfig = EnvironmentSecretConfig | AwsSecretsManagerConfig | ManualSecretConfig;

export type SessionIdProvider = (req: Request) => Promise<string | null>;
