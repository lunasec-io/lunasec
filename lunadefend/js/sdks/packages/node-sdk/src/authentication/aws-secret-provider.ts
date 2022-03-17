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
    SecretId: config.secretArn,
  });

  const response = await secretsManagerClient.send(getSecretValueCommand);

  const secretValue = response.SecretString;

  if (secretValue === undefined) {
    throw new Error('Unable to read secret value from AWS Secrets Manager for ARN: ' + config.secretArn);
  }

  return createPrivateKey(secretValue);
}
