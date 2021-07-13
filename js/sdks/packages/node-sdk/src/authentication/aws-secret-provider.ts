import { createPrivateKey } from 'crypto';

import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

import { AwsSecretsManagerConfig } from './types';

function getSecretsManagerClientConfig(awsAccessKey: AwsSecretsManagerConfig['awsAccessKey']) {
  const baseConfig = {
    region: 'us-west-2',
  };

  if (awsAccessKey) {
    return {
      ...baseConfig,
      credentials: awsAccessKey,
    };
  }

  return baseConfig;
}

export async function awsSecretProvider(config: AwsSecretsManagerConfig) {
  const secretsManagerClient = new SecretsManagerClient(getSecretsManagerClientConfig(config.awsAccessKey));

  const getSecretValueCommand = new GetSecretValueCommand({
    SecretId: config.secretsManagerSecretArn,
  });

  const response = await secretsManagerClient.send(getSecretValueCommand);

  const secretValue = response.SecretString;

  if (secretValue === undefined) {
    throw new Error('Unable to read secret value from AWS Secrets Manager for ARN: ' + config.secretsManagerSecretArn);
  }

  return createPrivateKey(secretValue);
}
