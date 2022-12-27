/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import dotenv from 'dotenv';

import {
  AwsConfig,
  BackendBucketConfig,
  GithubAppConfig,
  HasuraConfig,
  JwksConfig,
  LogConfig,
  QueueHandlerConfig,
  RepositoryQueueConfig,
  ServerConfig,
  SqsQueueConfig,
  StaticAnalysisConfig,
  WebhookConfig,
  WorkerBucketConfig,
} from './types/config';
import { tryParseInt, validateBooleanString } from './utils/parse';

export const checkEnvVar = (envVarKey: string, defaultValue?: string) => {
  const envVar = process.env[envVarKey];

  // If the environment variable is not set, and the value must come from the environment,
  // AND we are in production and the default value is not defined.
  // then throw an error
  if (!envVar && defaultValue === undefined) {
    throw new Error(`Missing ${envVarKey} env var`);
  }
  return envVar || (defaultValue as string);
};

const nodeEnv = checkEnvVar('NODE_ENV', 'development');
export const isProduction = nodeEnv === 'production';

dotenv.config({ path: isProduction ? '.env' : '.env.dev' });

export function getLogConfig(): LogConfig {
  const enableLogIOEnv = checkEnvVar('ENABLE_LOGIO_LOGGING', 'false');
  const enableLogIOLogging = validateBooleanString(enableLogIOEnv);
  if (enableLogIOLogging.error) {
    throw new Error(enableLogIOLogging.msg);
  }

  const logFilePath = checkEnvVar('LOG_FILE_PATH', '');

  // if WORKER_TYPE is not set, then we are running the backend
  const loggerName = checkEnvVar('WORKER_TYPE', 'lunatrace-backend');

  return {
    enableLogIOLogging: enableLogIOLogging.res,
    logFilePath,
    loggerName,
  };
}

export function getServerConfig(): ServerConfig {
  const serverPortString = checkEnvVar('PORT', '3002');
  const serverPort = parseInt(serverPortString, 10);
  const sitePublicUrl = checkEnvVar('SITE_PUBLIC_URL', 'http://localhost:4455/');

  return {
    serverPort,
    sitePublicUrl,
    isProduction,
  };
}

export function getAwsConfig(): AwsConfig {
  const awsRegion = checkEnvVar('AWS_DEFAULT_REGION', 'us-west-2');
  return {
    awsRegion,
  };
}

export function getWebhookConfig(): WebhookConfig {
  const shouldDisableWebhookQueue = checkEnvVar('DISABLE_WEBHOOK_QUEUE', 'false');

  const disableWebhookQueue = validateBooleanString(shouldDisableWebhookQueue);
  if (disableWebhookQueue.error) {
    throw new Error(disableWebhookQueue.msg);
  }

  // QUEUE_NAME means DEVELOPMENT_QUEUE_NAME
  const developmentQueueName = checkEnvVar('QUEUE_NAME', '');

  // In production, this queue will be specifically set since it references a different queue.
  // In development, since there is only one queue, this will be set with QUEUE_NAME.
  // If neither are set, throw an error
  const queueName = checkEnvVar('PROCESS_WEBHOOK_QUEUE', developmentQueueName);

  if (queueName === '') {
    throw new Error(
      'Unknown queue name.  Must set either QUEUE_NAME in development or PROCESS_WEBHOOK_QUEUE in production'
    );
  }

  const secret = checkEnvVar('GITHUB_APP_WEBHOOK_SECRET', 'mysecret');
  return {
    disableWebhookQueue: disableWebhookQueue.res,
    queueName,
    secret,
  };
}

export function getRepositoryQueueConfig(): RepositoryQueueConfig {
  const developmentQueueName = checkEnvVar('QUEUE_NAME', '');
  const productionQueueName = checkEnvVar('PROCESS_REPOSITORY_QUEUE', '');

  const queueName = productionQueueName || developmentQueueName;

  if (queueName === '') {
    throw new Error('PROCESS_REPOSITORY_QUEUE is not set and QUEUE_NAME for development is not set');
  }

  return {
    queueName,
  };
}

export function getHasuraConfig(): HasuraConfig {
  const hasuraEndpoint = checkEnvVar('HASURA_URL', 'http://localhost:4455/api/service/v1/graphql');
  const staticAccessToken = checkEnvVar('STATIC_SECRET_ACCESS_TOKEN', 'fc7efb9e-04e0-4883-b7b4-8f2e86d1e2e1');
  return {
    hasuraEndpoint,
    staticAccessToken,
  };
}

export function getBackendBucketConfig(): BackendBucketConfig {
  const sbomBucket = checkEnvVar('S3_SBOM_BUCKET');
  const manifestBucket = checkEnvVar('S3_MANIFEST_BUCKET');

  return {
    sbomBucket,
    manifestBucket,
  };
}

export function getWorkerBucketConfig(): WorkerBucketConfig {
  const sbomBucket = checkEnvVar('S3_SBOM_BUCKET');
  const manifestBucket = checkEnvVar('S3_MANIFEST_BUCKET');
  const codeBucket = checkEnvVar('S3_CODE_BUCKET');

  return {
    sbomBucket,
    manifestBucket,
    codeBucket,
  };
}

export function getStaticAnalysisConfig(): StaticAnalysisConfig {
  const developmentQueueName = checkEnvVar('GOLANG_QUEUE_NAME', '');

  // In production, this queue will be specifically set since it references a different queue.
  // In development, since there is only one queue, this will be set with QUEUE_NAME.
  // If neither are set, throw an error
  const queueName = checkEnvVar('STATIC_ANALYSIS_QUEUE', developmentQueueName);

  if (queueName === '') {
    throw new Error('STATIC_ANALYSIS_QUEUE is not set and GOLANG_QUEUE_NAME for development is not set');
  }

  return {
    queueName,
  };
}

export function getQueueHandlerConfig(): SqsQueueConfig {
  const DEFAULT_QUEUE_MAX_MESSAGES = '10';
  const DEFAULT_QUEUE_VISIBILITY = '60';

  const queueMaxMessagesEnv = checkEnvVar('QUEUE_MAX_MESSAGES', DEFAULT_QUEUE_MAX_MESSAGES);
  const queueVisibilityEnv = checkEnvVar('QUEUE_VISIBILITY', DEFAULT_QUEUE_VISIBILITY);

  const maxMessages = tryParseInt(queueMaxMessagesEnv, 10);
  const visibility = tryParseInt(queueVisibilityEnv, 10);

  if (!maxMessages.success) {
    throw new Error(`Queue max messages is not a valid integer: ${queueMaxMessagesEnv}`);
  }

  if (!visibility.success) {
    throw new Error(`Queue visibility is not a valid integer: ${queueVisibilityEnv}`);
  }

  const handlerConfig: QueueHandlerConfig = {
    maxMessages: maxMessages.value,
    visibility: visibility.value,
  };

  const queueName = checkEnvVar('QUEUE_NAME');

  return {
    handlerConfig,
    queueName,
  };
}

export function getGithubAppConfig(): GithubAppConfig {
  const githubEndpoint = checkEnvVar('GITHUB_ENDPOINT', 'https://api.github.com/graphql');

  const githubPrivateKeyRaw = checkEnvVar('GITHUB_APP_PRIVATE_KEY');
  const githubPrivateKey = Buffer.from(githubPrivateKeyRaw, 'base64').toString('utf-8');

  const githubAppIdRaw = checkEnvVar('GITHUB_APP_ID');
  const githubAppId = parseInt(githubAppIdRaw, 10);

  return {
    githubAppId,
    githubPrivateKey,
    githubEndpoint,
  };
}

export function getJwksConfig(): JwksConfig {
  const jwksUri = checkEnvVar('JWKS_URI', 'http://localhost:4456/.well-known/jwks.json');
  const jwksIssuer = checkEnvVar('JWKS_ISSUER', 'http://oathkeeper:4455/');

  return {
    jwksUri,
    jwksIssuer,
  };
}
