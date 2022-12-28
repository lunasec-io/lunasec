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
import { tryParseInt, validateBooleanString } from '../utils/parse';

import { envVars } from './load-environment-vars';

export { envVars } from './load-environment-vars';
export const isProduction = envVars.NodeEnv === 'production';

// The below loaders build configs for various parts of the app.
// TODO: There is no reason in node to load configs like this in NodeJS, its just extra code and not real DI.
// TODO: We should move to code loading the parsed envVars directly, and if we are doing a lot of type casting, build that
// TODO: into the env var loader in load-environment-vars in a generic way. These loaders are left here pending a future refactor.
export function getLogConfig(): LogConfig {
  const enableLogIOLogging = validateBooleanString(envVars.EnableLogIOLogging);
  if (enableLogIOLogging.error) {
    throw new Error(enableLogIOLogging.msg);
  }

  return {
    enableLogIOLogging: enableLogIOLogging.res,
    logFilePath: envVars.LogFilePath,
    loggerName: envVars.WorkerType,
  };
}

export function getServerConfig(): ServerConfig {
  const serverPort = parseInt(envVars.Port, 10);

  return {
    serverPort,
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
  const disableWebhookQueue = validateBooleanString(envVars.DisableWebhookQueue);
  if (disableWebhookQueue.error) {
    throw new Error(disableWebhookQueue.msg);
  }

  return {
    disableWebhookQueue: disableWebhookQueue.res,
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
  const queueMaxMessagesEnv = envVars.QueueMaxMessages;
  const queueVisibilityEnv = envVars.queueVisibility;

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

  const queueName = envVars.QueueName;

  return {
    handlerConfig,
    queueName,
  };
}

export function getGithubAppConfig(): GithubAppConfig {
  const githubPrivateKeyRaw = envVars.GithubAppPrivateKey;
  const githubPrivateKey = Buffer.from(githubPrivateKeyRaw, 'base64').toString('utf-8');

  const githubAppIdRaw = envVars.GithubAppId;
  const githubAppId = parseInt(githubAppIdRaw, 10);

  return {
    githubAppId,
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
