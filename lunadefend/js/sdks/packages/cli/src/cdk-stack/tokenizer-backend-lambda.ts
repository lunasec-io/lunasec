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

import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as ecr from '@aws-cdk/aws-ecr';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as secret from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';

import { DeploymentConfigOptions } from '../config/types';
import { formatAuthenticationProviders } from '../utils/auth-providers';

interface TokenizerBackendProps {
  deploymentConfig: DeploymentConfigOptions;
  cdnConfig: string;
  tokenizerBackendCloudfront: cloudfront.Distribution;
  ciphertextBucket: s3.Bucket;
  tokenizerSecret: secret.Secret;
  metadataTable: dynamo.Table;
  keysTable: dynamo.Table;
  sessionsTable: dynamo.Table;
  grantsTable: dynamo.Table;
}

function getLambdaEnv(stackId: string, props: TokenizerBackendProps): Record<string, string> {
  const applicationFrontEnd = props.deploymentConfig.applicationFrontEnd;
  if (applicationFrontEnd === undefined) {
    throw new Error('applicationFrontEnd is undefined in config');
  }

  const metrics = props.deploymentConfig.metrics;
  const grants = props.deploymentConfig.grants;

  const debug = props.deploymentConfig.debug ? { STAGE: 'DEV' } : { STAGE: 'PROD' };

  const authProviders = formatAuthenticationProviders(
    props.deploymentConfig.applicationBackEnd,
    props.deploymentConfig.authProviders
  );

  if (Object.keys(authProviders).length === 0) {
    throw new Error(
      'There are no auth providers configured. At a minimum, applicationBackEnd must be set in the config.'
    );
  }

  // TODO (cthompson) this is a hack for now. To truly get multi auth provider support we will need to
  // have the auth provider set as a request header so that our middleware in the tokenizer can
  // pick up which auth provider to use.
  const firstAuthProvider = authProviders[Object.keys(authProviders)[0]];

  let jwksURL = new URL('.lunasec/jwks.json', firstAuthProvider.url);
  if (firstAuthProvider.jwksPath !== undefined) {
    jwksURL = new URL(firstAuthProvider.jwksPath, firstAuthProvider.url);
  }

  return {
    ...debug,

    APPLICATION_FRONT_END: applicationFrontEnd,
    AUTH_PROVIDERS: JSON.stringify(authProviders),

    SESSION_JWKS_URL: jwksURL.toString(),

    METRICS_DISABLED: metrics.disabled.toString(),
    METRICS_PROVIDER: metrics.provider,

    GRANT_DEFAULT_DURATION: grants.grantDefaultDuration,
    GRANT_MAXIMUM_DURATION: grants.grantMaximumDuration,

    TOKENIZER_URL: props.tokenizerBackendCloudfront.domainName,
    CIPHERTEXT_VAULT_S3_BUCKET: props.ciphertextBucket.bucketName,
    SECURE_FRAME_CDN_CONFIG: props.cdnConfig,
    TOKENIZER_SECRET_ARN: props.tokenizerSecret.secretArn,
    METADATA_KV_TABLE: props.metadataTable.tableName,
    KEYS_KV_TABLE: props.keysTable.tableName,
    SESSIONS_KV_TABLE: props.sessionsTable.tableName,
    GRANTS_KV_TABLE: props.grantsTable.tableName,
    STACK_ID: stackId,
  };
}

export class TokenizerBackendLambda extends lambda.DockerImageFunction {
  constructor(scope: cdk.Construct, versionTag: string, props: TokenizerBackendProps) {
    const tokenizerBackendRepo = ecr.Repository.fromRepositoryName(
      scope,
      'tokenizer-backend-repo',
      'tokenizer-backend'
    );
    const baseProps: lambda.DockerImageFunctionProps = {
      code: lambda.DockerImageCode.fromEcr(tokenizerBackendRepo, {
        tag: versionTag,
      }),
      environment: getLambdaEnv(scope.node.id, props),
      timeout: cdk.Duration.seconds(20),
    };
    super(scope, 'tokenizer-backend-lambda', baseProps);

    // allow the tokenizer to put metric statistics into cloudwatch
    const metricStatisticsStatement = new iam.PolicyStatement({
      resources: ['*'],
      actions: ['cloudwatch:PutMetricData'],
    });

    this.addToRolePolicy(metricStatisticsStatement);

    props.ciphertextBucket.grantReadWrite(this);
    props.metadataTable.grantReadWriteData(this);
    props.keysTable.grantReadWriteData(this);
    props.sessionsTable.grantReadWriteData(this);
    props.grantsTable.grantReadWriteData(this);
  }
}
