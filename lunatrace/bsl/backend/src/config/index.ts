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
} from '../types/config';

import { envVars } from './load-environment-vars';

export const isProduction = envVars.NodeEnv === 'production';

// Note: it is debatable if we need to wrap these calls to envVars or we can call them directly from code.
// This structure might be more useful if we change to a DI pattern someday, which is undecided

export function getLogConfig(): LogConfig {
  return {
    enableLogIOLogging: envVars.EnableLogIOLogging,
    logFilePath: envVars.LogFilePath,
    loggerName: envVars.WorkerType,
  };
}

export function getServerConfig(): ServerConfig {
  return {
    serverPort: envVars.Port,
    sitePublicUrl: envVars.SitePublicUrl,
    isProduction: envVars.NodeEnv === 'production',
  };
}

export function getAwsConfig(): AwsConfig {
  return {
    awsRegion: envVars.AwsDefaultRegion,
  };
}

export function getWebhookConfig(): WebhookConfig {
  return {
    disableWebhookQueue: envVars.DisableWebhookQueue,
    queueName: envVars.ProcessWebhookQueue,
    secret: envVars.GithubAppWebhookSecret,
  };
}

export function getRepositoryQueueConfig(): RepositoryQueueConfig {
  return {
    queueName: envVars.ProcessRepositoryQueue,
  };
}

export function getHasuraConfig(): HasuraConfig {
  return {
    hasuraEndpoint: envVars.HasuraEndpoint,
    staticAccessToken: envVars.StaticAccessToken,
  };
}

export function getBackendBucketConfig(): BackendBucketConfig {
  return {
    sbomBucket: envVars.S3SbomBucket,
    manifestBucket: envVars.S3ManifestBucket,
  };
}

export function getWorkerBucketConfig(): WorkerBucketConfig {
  return {
    sbomBucket: envVars.S3SbomBucket,
    manifestBucket: envVars.S3ManifestBucket,
    codeBucket: envVars.S3CodeBucket,
  };
}

export function getStaticAnalysisConfig(): StaticAnalysisConfig {
  return {
    queueName: envVars.StaticAnalysisQueueName,
  };
}

export function getQueueHandlerConfig(): SqsQueueConfig {
  const handlerConfig: QueueHandlerConfig = {
    maxMessages: envVars.QueueMaxMessages,
    visibility: envVars.queueVisibility,
  };

  const queueName = envVars.QueueName;

  return {
    handlerConfig,
    queueName,
  };
}

export function getGithubAppConfig(): GithubAppConfig {
  const githubPrivateKeyRaw = envVars.GithubAppPrivateKey;
  const githubPrivateKey = Buffer.from(githubPrivateKeyRaw, 'base64').toString('utf-8');

  return {
    githubAppId: envVars.GithubAppId,
    githubPrivateKey,
    githubEndpoint: envVars.GithubEndpoint,
  };
}

export function getJwksConfig(): JwksConfig {
  return {
    jwksUri: envVars.JwksUri,
    jwksIssuer: envVars.JwksIssuer,
  };
}
