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
import { z } from 'zod';

// TODO: typescript 4.9 has added the "satisfies" keyword, use it to constrain this interface without losing inferred key names when we update TS to 4.9
// https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/#satisfies
export const commonEnvVarKeys = {
  NodeEnv: {
    castTo: z.string(),
    varKey: 'NODE_ENV',
    defaultValue: 'development',
  },
  EnableLogIOLogging: {
    castTo: z.boolean(),
    varKey: 'ENABLE_LOGIO_LOGGING',
    defaultValue: false,
  },
  LogFilePath: {
    varKey: 'LOG_FILE_PATH',
    castTo: z.string(),
    defaultValue: 'logs/backend.log',
  },
  WorkerType: {
    varKey: 'WORKER_TYPE',
    castTo: z.string(),
    defaultValue: 'lunatrace-backend',
  },
  Port: {
    varKey: 'PORT',
    castTo: z.number(),
    defaultValue: 3002,
  },
  SitePublicUrl: {
    varKey: 'SITE_PUBLIC_URL',

    castTo: z.string(),
    defaultValue: 'http://localhost:4455/',
  },
  AwsDefaultRegion: {
    varKey: 'AWS_DEFAULT_REGION',
    castTo: z.string(),
    defaultValue: 'us-west-2',
  },
  DisableWebhookQueue: {
    varKey: 'DISABLE_WEBHOOK_QUEUE',
    castTo: z.boolean(),
    defaultValue: false,
  },
  QueueName: {
    varKey: 'QUEUE_NAME',
    castTo: z.string(),
  },
  ProcessWebhookQueue: {
    varKey: 'PROCESS_WEBHOOK_QUEUE',
    backupVarKey: 'QUEUE_NAME',
    castTo: z.string(),
  },
  ProcessRepositoryQueue: {
    varKey: 'PROCESS_REPOSITORY_QUEUE',
    backupVarKey: 'QUEUE_NAME',
    castTo: z.string(),
  },

  JwksUri: {
    varKey: 'JWKS_URI',
    defaultValue: 'http://localhost:4456/.well-known/jwks.json',
    castTo: z.string(),
  },
  HasuraEndpoint: {
    varKey: 'HASURA_URL',
    defaultValue: 'http://localhost:4455/api/service/v1/graphql',
    castTo: z.string(),
  },
  StaticAccessToken: {
    varKey: 'STATIC_SECRET_ACCESS_TOKEN',
    defaultValue: 'fc7efb9e-04e0-4883-b7b4-8f2e86d1e2e1',
    castTo: z.string(),
  },
  StaticAnalysisQueueName: {
    varKey: 'STATIC_ANALYSIS_QUEUE',
    backupVarKey: 'GOLANG_QUEUE_NAME',
    castTo: z.string(),
  },
  QueueMaxMessages: {
    varKey: 'QUEUE_MAX_MESSAGES',
    defaultValue: 10,
    castTo: z.number(),
  },
  queueVisibility: {
    varKey: 'QUEUE_VISIBILITY',
    defaultValue: 60,
    castTo: z.number(),
  },
  GithubEndpoint: {
    varKey: 'GITHUB_ENDPOINT',
    defaultValue: 'https://api.github.com/graphql',
    castTo: z.string(),
  },
  JwksIssuer: {
    varKey: 'JWKS_ISSUER',
    defaultValue: 'http://oathkeeper:4455/',
    castTo: z.string(),
  },
  S3SbomBucket: {
    varKey: 'S3_SBOM_BUCKET',
    castTo: z.string(),
  },
  S3ManifestBucket: {
    varKey: 'S3_MANIFEST_BUCKET',
    castTo: z.string(),
  },
  GithubAppId: {
    varKey: 'GITHUB_APP_ID',
    castTo: z.number(),
  },
  GithubAppPrivateKey: {
    varKey: 'GITHUB_APP_PRIVATE_KEY',
    castTo: z.string(),
  },
  GithubAppWebhookSecret: {
    varKey: 'GITHUB_APP_WEBHOOK_SECRET',
    defaultValue: 'mysecret',
    castTo: z.string(),
  },
  S3CodeBucket: {
    varKey: 'S3_CODE_BUCKET',
    castTo: z.string(),
  },
};
