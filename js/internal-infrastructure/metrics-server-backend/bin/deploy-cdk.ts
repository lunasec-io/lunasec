#!/usr/bin/env node
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
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {MetricsLambdaBackendStack} from '../lib/deploy-apigateway-to-firehose';

const domainName = process.env.STACK_DOMAIN_NAME;

if (!domainName) {
  throw new Error('Must specify domain name for app');
}

const domainZoneName = process.env.STACK_DOMAIN_ZONE_NAME;

if (!domainZoneName) {
  throw new Error('Must specify domain zone for app');
}

const domainZoneId = process.env.STACK_DOMAIN_ZONE_ID;

if (!domainZoneId) {
  throw new Error('Must specify domain zone ID for app');
}

const certificateArn = process.env.SSL_CERTIFICATE_ARN;

if (!certificateArn) {
  throw new Error('Must specify certificate for gateway to use');
}

const app = new cdk.App();
new MetricsLambdaBackendStack(app, 'MetricsBackendToFirehoseToS3', {
  domainName: domainName,
  domainZoneId: domainZoneId,
  domainZoneName: domainZoneName,
  certificateArn: certificateArn,

  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
})
