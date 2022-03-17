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

import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';

import { DeploymentConfigOptions } from '../config/types';

import { AnalyticsCollectorLambda } from './analytics-collector-lambda';
import { CiphertextBucket } from './ciphertext-bucket';
import { getSecureFrameAssets } from './s3-assets';
import { TokenizerBackendBucket, TokenizerBackendCloudfront } from './tokenizer-backend-cloudfront';
import { TokenizerBackendLambda } from './tokenizer-backend-lambda';
import { CDNConfig, LunaSecStackResource, SecureFrameAssetFiles } from './types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');

const secretDescription = 'Secret used by the tokenizer-backend in generating encryption keys for ciphertexts.';

export function getOutputName(name: LunaSecStackResource) {
  return `${name.replace(/-/g, '')}Output`;
}

function secureFrameIFramePublicAssetFolder() {
  const secureFrameMainScript = require.resolve('@lunasec/secure-frame-front-end');
  const secureFrameBuildPath = path.dirname(secureFrameMainScript);
  return path.join(secureFrameBuildPath, '../../public');
}

function cfnOutput(scope: cdk.Construct, name: LunaSecStackResource, value: string) {
  new cdk.CfnOutput(scope, getOutputName(name), {
    value: value,
    exportName: getOutputName(name),
  });
}

function createDynamoDBTable(
  scope: cdk.Construct,
  name: LunaSecStackResource,
  options?: { ttl?: string; retain?: boolean }
) {
  const ttl = options && options.ttl ? { timeToLiveAttribute: options.ttl } : {};
  const removalPolicy = options && options.retain ? { removalPolicy: cdk.RemovalPolicy.RETAIN } : {};
  const table = new dynamodb.Table(scope, name, {
    ...ttl,
    ...removalPolicy,
    partitionKey: {
      name: 'Key',
      type: dynamodb.AttributeType.STRING,
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  });
  cfnOutput(scope, name, table.tableName);
  return table;
}

function createSecret(scope: cdk.Construct, name: LunaSecStackResource, description: string) {
  const secret = new secretsmanager.Secret(scope, name, {
    description: description,
    removalPolicy: cdk.RemovalPolicy.RETAIN,
  });
  cfnOutput(scope, name, secret.secretArn);
  return secret;
}

function getGateway(scope: cdk.Construct, name: LunaSecStackResource, lambdaProxy: lambda.IFunction) {
  const gateway = new apigateway.LambdaRestApi(scope, name, {
    handler: lambdaProxy,
  });
  cfnOutput(scope, name, gateway.url);
}

function getTokenizerBackendCloudfront(scope: cdk.Construct) {
  const bucketName = 'tokenizer-backend-bucket';
  const bucket = new TokenizerBackendBucket(scope, bucketName);
  cfnOutput(scope, bucketName, bucket.bucketName);

  return new TokenizerBackendCloudfront(scope, bucket);
}

function getCiphertextBucket(scope: cdk.Construct) {
  const bucketName = 'ciphertext-bucket';
  const ciphertextBucket = new CiphertextBucket(scope, bucketName);
  cfnOutput(scope, bucketName, ciphertextBucket.bucketName);
  return ciphertextBucket;
}

export class LunaSecDeploymentStack extends cdk.Stack {
  public secureFrameAssets?: SecureFrameAssetFiles;

  constructor(app: cdk.App, id: string, local: boolean, deploymentConfig: DeploymentConfigOptions) {
    super(app, id);

    const ciphertextBucket = getCiphertextBucket(this);

    const metadataTable = createDynamoDBTable(this, 'metadata-table');
    const keysTable = createDynamoDBTable(this, 'keys-table', {
      retain: true,
    });
    const sessionsTable = createDynamoDBTable(this, 'sessions-table', {
      ttl: '24h',
    });
    const grantsTable = createDynamoDBTable(this, 'grants-table', {
      ttl: '24h',
    });

    const tokenizerSecret = createSecret(this, 'tokenizer-secret', secretDescription);

    // all other resources are not included in the local deployment
    if (local) {
      return;
    }

    const secureFrameAssetFolder = secureFrameIFramePublicAssetFolder();

    this.secureFrameAssets = getSecureFrameAssets(secureFrameAssetFolder);

    const tokenizerBackendCloudfront = getTokenizerBackendCloudfront(this);

    const cdnConfig: CDNConfig = {
      protocol: 'https',
      host: tokenizerBackendCloudfront.domainName,
      main_script: this.secureFrameAssets.files.mainScript.filename,
      main_style: this.secureFrameAssets.files.mainStyle.filename,
    };

    const tokenizerBackendLambda = new TokenizerBackendLambda(this, version, {
      deploymentConfig: deploymentConfig,
      cdnConfig: JSON.stringify(cdnConfig),
      tokenizerBackendCloudfront,
      ciphertextBucket,
      tokenizerSecret,
      metadataTable,
      keysTable,
      sessionsTable,
      grantsTable,
    });

    getGateway(this, 'gateway', tokenizerBackendLambda);

    if (!deploymentConfig.metrics.disabled) {
      new AnalyticsCollectorLambda(this, version);
    }
  }
}
