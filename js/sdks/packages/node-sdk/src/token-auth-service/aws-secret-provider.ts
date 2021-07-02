import { createPrivateKey } from 'crypto';

import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

import { AwsSecretsManagerSecretProvider } from './types';

function getSecretsManagerClientConfig(awsSecretProvider: AwsSecretsManagerSecretProvider) {
  const baseConfig = {
    region: 'us-west-2',
  };

  if (awsSecretProvider.awsAccessKey) {
    return {
      ...baseConfig,
      credentials: awsSecretProvider.awsAccessKey,
    };
  }

  return baseConfig;
}

export async function awsSecretProvider(provider: AwsSecretsManagerSecretProvider) {
  const secretsManagerClient = new SecretsManagerClient(getSecretsManagerClientConfig(provider));

  const getSecretValueCommand = new GetSecretValueCommand({
    SecretId: provider.secretsManagerSecretArn,
  });

  const response = await secretsManagerClient.send(getSecretValueCommand);

  const secretValue = response.SecretString;

  if (secretValue === undefined) {
    throw new Error(
      'Unable to read secret value from AWS Secrets Manager for ARN: ' + provider.secretsManagerSecretArn
    );
  }

  return createPrivateKey(secretValue);
}
