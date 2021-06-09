import { EnvironmentSecretProvider } from './types';
import {createPrivateKey} from "crypto";

export function environmentSecretProvider(provider: EnvironmentSecretProvider) {
  const secret = process.env[provider.environmentVariableName];

  if (secret === undefined) {
    throw new Error('Unable to read secret from environment variable: ' + provider.environmentVariableName);
  }

  const secretKey = createPrivateKey(secret);

  return Promise.resolve(secretKey);
}
