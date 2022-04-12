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
  HasuraConfig, JwksConfig,
  QueueHandlerConfig,
  SbomHandlerConfig,
  ServerConfig,
} from './types/config';
import { log } from './utils/log';

const nodeEnv = process.env.NODE_ENV;

const checkEnvVar = (envVarKey: string, defaultValue?: string) => {
  const envVar = process.env[envVarKey];

  if (!envVar && (nodeEnv === 'production' || defaultValue === undefined)) {
    throw new Error(`Missing ${envVarKey} env var`);
  }
  return envVar || (defaultValue as string);
};

export function getServerConfig(): ServerConfig {
  const serverPortString = checkEnvVar('PORT', '3002');
  const serverPort = parseInt(serverPortString, 10);
  const sitePublicUrl = checkEnvVar('SITE_PUBLIC_URL', 'http://localhost:4455/');

  const nodeEnv = checkEnvVar('NODE_ENV', 'development');
  const isProduction = nodeEnv === 'production';

  return {
    serverPort,
    sitePublicUrl,
    isProduction
  };
}

dotenv.config({ path: getServerConfig().isProduction ? '.env' : '.env.dev'});

export function getAwsConfig(): AwsConfig {
  const awsRegion = checkEnvVar('AWS_DEFAULT_REGION', 'us-west-2');
  return {
    awsRegion,
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
  const sbomBucket = checkEnvVar('S3_SBOM_BUCKET', 'sbom-test-bucket');
  const manifestBucket = checkEnvVar('S3_MANIFEST_BUCKET', 'test-manifest-bucket-one');

  return {
    sbomBucket,
    manifestBucket,
  };
}

export function getQueueHandlerConfig(): QueueHandlerConfig {
  const queueName = checkEnvVar('QUEUE_NAME');
  const handlerName = checkEnvVar('QUEUE_HANDLER');
  return {
    queueName,
    handlerName,
  };
}

export function getGithubAppConfig(): GithubAppConfig {
  const githubEndpoint = checkEnvVar('GITHUB_ENDPOINT', 'https://api.github.com/graphql');
  const githubWebhook = checkEnvVar('GITHUB_WEBHOOK', 'https://smee.io/PFQhzcyUpi770GiD');

  const githubPrivateKeyRaw = checkEnvVar('GITHUB_APP_PRIVATE_KEY');
  const githubPrivateKey = Buffer.from(githubPrivateKeyRaw, 'base64').toString('utf-8');

  const githubAppIdRaw = checkEnvVar('GITHUB_APP_ID');
  const githubAppId = parseInt(githubAppIdRaw, 10);

  return {
    githubAppId,
    githubPrivateKey,
    githubEndpoint,
    githubWebhook
  };
}

export function getJwksConfig(): JwksConfig {
  const jwksUri = checkEnvVar('JWKS_URI', 'http://localhost:4456/.well-known/jwks.json');
  const jwksIssuer = checkEnvVar('JWKS_ISSUER', 'http://oathkeeper:4455/');

  return {
    jwksUri,
    jwksIssuer
  }
}
