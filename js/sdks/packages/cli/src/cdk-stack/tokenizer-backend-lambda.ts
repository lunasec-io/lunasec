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

import path from 'path';

import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as ecr from '@aws-cdk/aws-ecr';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as secret from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';

import { DeploymentConfigOptions } from '../config/types';

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

function getAuthMethod(deploymentConfig: DeploymentConfigOptions): Record<string, string> {
  if (deploymentConfig.sessionPublicKey !== undefined) {
    return {
      SESSION_PUBLIC_KEY: deploymentConfig.sessionPublicKey,
    };
  }
  if (deploymentConfig.sessionJwksEndpoint !== undefined) {
    return {
      SESSION_JWKS_URL: deploymentConfig.sessionJwksEndpoint,
    };
  }
  const applicationBackEnd = deploymentConfig.applicationBackEnd;
  if (applicationBackEnd === undefined) {
    throw new Error('applicationBackEnd is undefined in config');
  }
  return {
    SESSION_JWKS_URL: path.join(applicationBackEnd, '.lunasec/jwks.json'),
  };
}

function getLambdaEnv(stackId: string, props: TokenizerBackendProps): Record<string, string> {
  const applicationFrontEnd = props.deploymentConfig.applicationFrontEnd;
  if (applicationFrontEnd === undefined) {
    throw new Error('applicationFrontEnd is undefined in config');
  }
  const applicationBackEnd = props.deploymentConfig.applicationBackEnd;
  if (applicationBackEnd === undefined) {
    throw new Error('applicationBackEnd is undefined in config');
  }

  const metrics = props.deploymentConfig.metrics;

  return {
    ...getAuthMethod(props.deploymentConfig),

    APPLICATION_FRONT_END: applicationFrontEnd,
    APPLICATION_BACK_END: applicationBackEnd,
    METRICS_DISABLED: metrics.disabled.toString(),
    METRICS_PROVIDER: metrics.provider,
    METRICS_DISABLE_USAGE_STATISTICS: metrics.disableUsageStatisticsMetrics.toString(),

    TOKENIZER_URL: props.tokenizerBackendCloudfront.domainName,
    CIPHERTEXT_VAULT_S3_BUCKET: props.ciphertextBucket.bucketArn,
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

    props.ciphertextBucket.grantReadWrite(this);
    props.metadataTable.grantReadWriteData(this);
    props.keysTable.grantReadWriteData(this);
    props.sessionsTable.grantReadWriteData(this);
    props.grantsTable.grantReadWriteData(this);
  }
}
