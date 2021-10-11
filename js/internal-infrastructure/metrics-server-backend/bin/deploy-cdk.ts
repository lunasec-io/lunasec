#!/usr/bin/env node
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
