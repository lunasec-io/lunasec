import { EnvironmentSecretProvider } from './types';

export function environmentSecretProvider(provider: EnvironmentSecretProvider) {
  const secret = process.env[provider.environmentVariableName];

  if (secret === undefined) {
    throw new Error('Unable to read secret from environment variable: ' + provider.environmentVariableName);
  }

  return Promise.resolve(secret);
}
