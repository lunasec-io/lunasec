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
/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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

import * as path from 'path';

import * as apigateway from '@aws-cdk/aws-apigateway';
import * as acm from '@aws-cdk/aws-certificatemanager';
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';
import { ARecord, HostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';

interface LunaTraceStackProps extends cdk.StackProps {
  // TODO: Make the output URL be a URL managed by us, not AWS
  domainName: string;
  domainZoneId: string;
}

export class LunatraceBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: LunaTraceStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'lunatrace-data-bucket');

    // S3_BUCKET_NAME: bucket.bucketName,
    const asset = new DockerImageAsset(this, 'LunaTraceBackend', {
      directory: path.resolve(path.join(__dirname, '../../../../')),
      file: 'lunatrace/bsl/backend/Dockerfile',
      buildArgs: {},
      invalidation: {
        buildArgs: false,
      },
    });

    // declare const cluster: ecs.Cluster;
    // const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
    //   cluster,
    //   memoryLimitMiB: 1024,
    //   cpu: 512,
    //   taskImageOptions: {
    //     image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
    //   },
    // });
    //
    // loadBalancedFargateService.targetGroup.configureHealthCheck({
    //   path: '/custom-health-path',
    // });
    //
    // bucket.grantReadWrite(asset);
    //
    // const lambdaGateway = new apigateway.LambdaRestApi(this, 'cli-api-endpoint', {
    //   handler: apiHandler,
    // });
    //
    // new cdk.CfnOutput(this, 'ApiGatewayUrl', {
    //   value: lambdaGateway.url,
    //   exportName: 'ApiGatewayUrl',
    // });
    //
    // const hostedZone = HostedZone.fromHostedZoneAttributes(this, 'lunatrace-zone', {
    //   hostedZoneId: props.domainZoneId,
    //   zoneName: props.domainName,
    // });
    //
    // const certificate = new acm.DnsValidatedCertificate(this, 'lunatrace-certificate', {
    //   domainName: props.domainName,
    //   hostedZone: hostedZone,
    //   region: 'us-west-2',
    // });
    //
    // const domainName = new apigateway.DomainName(this, 'lunatrace-domain-name', {
    //   domainName: props.domainName,
    //   certificate: certificate,
    //   endpointType: apigateway.EndpointType.REGIONAL,
    //   mapping: lambdaGateway,
    //   securityPolicy: apigateway.SecurityPolicy.TLS_1_2,
    // });
    //
    // new ARecord(this, 'lunatrace-dns-a-record', {
    //   zone: hostedZone,
    //   recordName: props.domainName,
    //   target: RecordTarget.fromAlias(new targets.ApiGatewayDomain(domainName)),
    //   ttl: Duration.minutes(5),
    // });
  }
}
