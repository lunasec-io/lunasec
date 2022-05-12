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
  GithubAppConfig,
  HasuraConfig,
  JobRunnerConfig,
  JwksConfig,
  QueueHandlerWorkerConfig,
  RepositoryQueueConfig,
  SbomHandlerConfig,
  ServerConfig,
  WebhookConfig,
  WorkerConfig,
  WorkerType,
} from './types/config';
import { QueueHandlerConfig, QueueHandlerType } from './types/sqs';

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
const isProduction = nodeEnv === 'production';

dotenv.config({ path: isProduction ? '.env' : '.env.dev' });

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
  const queueName = checkEnvVar('PROCESS_WEBHOOK_QUEUE');
  const secret = checkEnvVar('GITHUB_APP_WEBHOOK_SECRET', 'mysecret');
  return {
    queueName,
    secret,
  };
}

export function getRepositoryQueueConfig(): RepositoryQueueConfig {
  const queueName = checkEnvVar('PROCESS_REPOSITORY_QUEUE');
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

export function getEtlBucketConfig(): SbomHandlerConfig {
  const sbomBucket = checkEnvVar('S3_SBOM_BUCKET');
  const manifestBucket = checkEnvVar('S3_MANIFEST_BUCKET');

  return {
    sbomBucket,
    manifestBucket,
  };
}

export function getJobRunnerConfig(): JobRunnerConfig {
  const grypeDatabaseBucket = checkEnvVar('GRYPE_DATABASE_BUCKET');

  return {
    grypeDatabaseBucket,
  };
}

export function getWorkerConfig(): WorkerConfig {
  const workerType = checkEnvVar('WORKER_TYPE');

  return {
    workerType: workerType as WorkerType,
  };
}

export function getQueueHandlerConfig(): QueueHandlerWorkerConfig {
  const handlerName = checkEnvVar('QUEUE_HANDLER');

  const DEFAULT_QUEUE_MAX_MESSAGES = 10;
  const DEFAULT_QUEUE_VISIBILITY = 60;

  const handlerConfigLookup: Record<QueueHandlerType, QueueHandlerConfig> = {
    // 'process-webhook': {
    //   maxMessages: 1,
    //   visibility: DEFAULT_QUEUE_VISIBILITY,
    //   envVar: 'PROCESS_WEBHOOK_QUEUE',
    // },
    // 'process-manifest': {
    //   maxMessages: DEFAULT_QUEUE_MAX_MESSAGES,
    //   visibility: DEFAULT_QUEUE_VISIBILITY,
    //   envVar: 'PROCESS_MANIFEST_QUEUE',
    // },
    // 'process-sbom': {
    //   maxMessages: DEFAULT_QUEUE_MAX_MESSAGES,
    //   visibility: DEFAULT_QUEUE_VISIBILITY,
    //   envVar: 'PROCESS_SBOM_QUEUE',
    // },
    // 'process-repository': {
    //   maxMessages: DEFAULT_QUEUE_MAX_MESSAGES,
    //   visibility: DEFAULT_QUEUE_VISIBILITY * 10,
    //   envVar: 'PROCESS_REPOSITORY_QUEUE',
    // },
    // TODO (cthompson) fill these in
    's3-queue-handler': {
      maxMessages: DEFAULT_QUEUE_MAX_MESSAGES,
      visibility: DEFAULT_QUEUE_VISIBILITY * 10,
      envVar: 'PROCESS_REPOSITORY_QUEUE',
    },
    'lunatrace-queue-handler': {
      maxMessages: DEFAULT_QUEUE_MAX_MESSAGES,
      visibility: DEFAULT_QUEUE_VISIBILITY * 10,
      envVar: 'PROCESS_REPOSITORY_QUEUE',
    },
  };

  // TODO (cthompson) check if handlerName is in QueueHandlerType

  const handlerConfig = handlerConfigLookup[handlerName as QueueHandlerType];

  const handlerQueueName = (() => {
    if (isProduction) {
      return checkEnvVar('QUEUE_NAME');
    }
    return checkEnvVar(handlerConfig.envVar);
  })();

  return {
    handlerName,
    handlerConfig,
    handlerQueueName,
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
