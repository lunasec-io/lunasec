#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {MetricsLambdaBackendStack} from '../lib/deploy-apigateway-to-firehose';

// const domainName = process.env.STACK_DOMAIN_NAME;
//
// if (!domainName) {
//   throw new Error('Must specify domain name for app');
// }
//
// const domainZone = process.env.STACK_DOMAIN_ZONE;
//
// if (!domainZone) {
//   throw new Error('Must specify domain zone for app');
// }

const app = new cdk.App();
// new LunaSecMetricsServerBackendStack(app, 'MetricsBackendStack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */
//
//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   env: {
//     account: process.env.CDK_DEFAULT_ACCOUNT,
//     region: process.env.CDK_DEFAULT_REGION
//   },
//
//   domainName: domainName,
//   domainZone: domainZone,
//
//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },
//
//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

new MetricsLambdaBackendStack(app, 'MetricsBackendToFirehoseToS3', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
})
