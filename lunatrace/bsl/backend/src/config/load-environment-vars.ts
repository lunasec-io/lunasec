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

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.dev' });

const checkEnvVar = (envVarKey: string, backupEnvVarKey?: string, defaultValue?: string) => {
  const envVar = process.env[envVarKey];
  const backupVar = backupEnvVarKey ? process.env[backupEnvVarKey] : null;
  // If the environment variable is not set, and the value must come from the environment,
  // AND we are in production and the default value is not defined.
  // then throw an error
  if (!envVar && !backupVar && defaultValue === undefined && process.env.NODE_ENV !== 'test') {
    throw new Error(`Missing ${envVarKey} env var ${backupEnvVarKey ? `and backup var ${backupEnvVarKey}` : ''}`);
  }
  return envVar || backupVar || (defaultValue as string);
};

const commonEnvVarKeys = {
  NodeEnv: {
    varKey: 'NODE_ENV',
    defaultValue: 'development',
  },
  EnableLogIOLogging: {
    varKey: 'ENABLE_LOGIO_LOGGING',
    defaultValue: 'false',
  },
  LogFilePath: {
    varKey: 'LOG_FILE_PATH',
  },
  WorkerType: {
    varKey: 'WORKER_TYPE',
    defaultValue: 'lunatrace-backend',
  },
  Port: {
    varKey: 'PORT',
    defaultValue: '3002',
  },
  SitePublicUrl: {
    varKey: 'SITE_PUBLIC_URL',
    defaultValue: 'http://localhost:4455/',
  },
  AwsDefaultRegion: {
    varKey: 'AWS_DEFAULT_REGION',
    defaultValue: 'us-west-2',
  },
  DisableWebhookQueue: {
    varKey: 'DISABLE_WEBHOOK_QUEUE',
    defaultValue: 'false',
  },
  QueueName: {
    varKey: 'QUEUE_NAME',
  },
  ProcessWebhookQueue: {
    varKey: 'PROCESS_WEBHOOK_QUEUE',
    backupVarKey: 'QUEUE_NAME',
  },
  ProcessRepositoryQueue: {
    varKey: 'PROCESS_REPOSITORY_QUEUE',
    backupVarKey: 'QUEUE_NAME',
  },

  JwksUri: {
    varKey: 'JWKS_URI',
    defaultValue: 'http://localhost:4456/.well-known/jwks.json',
  },
  HasuraEndpoint: {
    varKey: 'HASURA_URL',
    defaultValue: 'http://localhost:4455/api/service/v1/graphql',
  },
  StaticAccessToken: {
    varKey: 'STATIC_SECRET_ACCESS_TOKEN',
    defaultValue: 'fc7efb9e-04e0-4883-b7b4-8f2e86d1e2e1',
  },
  StaticAnalysisQueueName: {
    varKey: 'STATIC_ANALYSIS_QUEUE',
    backupVarKey: 'GOLANG_QUEUE_NAME',
  },
  QueueMaxMessages: {
    varKey: 'QUEUE_MAX_MESSAGES',
    defaultValue: '10',
  },
  queueVisibility: {
    varKey: 'QUEUE_VISIBILITY',
    defaultValue: '60',
  },
  GithubEndpoint: {
    varKey: 'GITHUB_ENDPOINT',
    defaultValue: 'https://api.github.com/graphql',
  },
  JwksIssuer: {
    varKey: 'JWKS_ISSUER',
    defaultValue: 'http://oathkeeper:4455/',
  },
  S3SbomBucket: {
    varKey: 'S3_SBOM_BUCKET',
  },
  S3ManifestBucket: {
    varKey: 'S3_MANIFEST_BUCKET',
  },
  GithubAppId: {
    varKey: 'GITHUB_APP_ID',
  },
  GithubAppPrivateKey: {
    varKey: 'GITHUB_APP_PRIVATE_KEY',
  },
  GithubAppWebhookSecret: {
    varKey: 'GITHUB_APP_WEBHOOK_SECRET',
    defaultValue: 'mysecret',
  },
  S3CodeBucket: {
    varKey: 'S3_CODE_BUCKET',
  },
};

// TODO: I can't figure out where these are referenced in the existing codebase, maybe chatgpt made them up
// const workerEnvVarKeys = {
//   WebhookExecutionRoleArn: {
//     varKey: 'WEBHOOK_EXECUTION_ROLE_ARN',
//   },
//   WorkerBucketName: {
//     varKey: 'WORKER_BUCKET_NAME',
//   },
//   GithubAppClientId: {
//     varKey: 'GITHUB_APP_CLIENT_ID',
//   },
//   GithubAppClientSecret: {
//     varKey: 'GITHUB_APP_CLIENT_SECRET',
//   },
// GraphqlEndpoint: {
//   varKey: 'GRAPHQL_ENDPOINT',
// },
// GraphqlAdminSecret: {
//   varKey: 'GRAPHQL_ADMIN_SECRET',
// },
// };

type VarName = keyof typeof commonEnvVarKeys;
type EnvVars = Record<VarName, string>;
interface EnvVar {
  varKey: string;
  backupVarKey?: string;
  defaultValue?: string;
}

const partialEnvironmentVars: Partial<EnvVars> = {};
Object.keys(commonEnvVarKeys).forEach((keyName) => {
  const varName = keyName as VarName;
  const varConf: EnvVar = commonEnvVarKeys[varName];
  partialEnvironmentVars[varName] = checkEnvVar(varConf.varKey, varConf.backupVarKey, varConf.defaultValue);
});

export const envVars = partialEnvironmentVars as EnvVars;
