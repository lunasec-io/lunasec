import { KeyLike } from 'jose/jwt/sign';

import { awsSecretProvider } from './aws-secret-provider';
import { environmentSecretProvider } from './environment-secret-provider';

export interface EnvironmentSecretProvider {
  type: SecretProviders.environment;
}

export interface AwsSecretsManagerSecretProvider {
  type: SecretProviders.awsSecretsManager;
  secretsManagerSecretArn: string;
  awsAccessKey?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export enum SecretProviders {
  environment = 'environment',
  awsSecretsManager = 'awsSecretsManager',
}

export type ValidSecretProvider = EnvironmentSecretProvider | AwsSecretsManagerSecretProvider;

export interface SecretProviderTypeToSecretProviderTypeMap {
  [SecretProviders.awsSecretsManager]: AwsSecretsManagerSecretProvider;
  [SecretProviders.environment]: EnvironmentSecretProvider;
}

export type SecretProvider<T extends keyof SecretProviderTypeToSecretProviderTypeMap> = (
  provider: SecretProviderTypeToSecretProviderTypeMap[T]
) => Promise<KeyLike>;

export type SecretProviderToFetchSecretMap = {
  [key in keyof SecretProviderTypeToSecretProviderTypeMap]: SecretProvider<key>;
};

export interface SecretProviderTypeMap extends SecretProviderToFetchSecretMap {
  [SecretProviders.awsSecretsManager]: typeof awsSecretProvider;
  [SecretProviders.environment]: typeof environmentSecretProvider;
}

export const getSecretFromSecretProvider: SecretProviderTypeMap = {
  [SecretProviders.awsSecretsManager]: awsSecretProvider,
  [SecretProviders.environment]: environmentSecretProvider,
};
