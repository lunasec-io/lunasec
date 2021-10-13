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
import * as cdk from '@aws-cdk/core';
import * as destinations from '@aws-cdk/aws-kinesisfirehose-destinations';
import {Compression} from '@aws-cdk/aws-kinesisfirehose-destinations';
import {DeliveryStream, StreamEncryption} from '@aws-cdk/aws-kinesisfirehose';
import {Bucket} from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import {BasePathMapping, DomainName, EndpointType, RestApi, SecurityPolicy} from '@aws-cdk/aws-apigateway';
import {StoreMetricSchema} from './apigateway-request-models';
import * as defaults from '@aws-solutions-constructs/core';
import {ARecord, HostedZone, RecordTarget} from '@aws-cdk/aws-route53';
import {Certificate} from '@aws-cdk/aws-certificatemanager';
import * as route53targets from '@aws-cdk/aws-route53-targets';
import {Duration} from '@aws-cdk/core';

interface MetricsLambdaStackProps extends cdk.StackProps {
  // TODO: Make the output URL be a URL managed by us, not AWS
  domainName: string;
  domainZoneId: string;
  domainZoneName: string;
  certificateArn: string;
}

export class MetricsLambdaBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: MetricsLambdaStackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'MetricsBucket', {});

    const s3Destination = new destinations.S3Bucket(bucket as any, {
      compression: Compression.SNAPPY,
      dataOutputPrefix: 'metrics/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/rand=!{firehose:random-string}',
      errorOutputPrefix: 'metrics_failures/!{firehose:error-output-type}/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}',
    });

    const stream = new DeliveryStream(this, 'Delivery Stream', {
      encryption: StreamEncryption.AWS_OWNED,
      destinations: [s3Destination],
    });

    // Setup the API Gateway role
    const apiGatewayRole = new iam.Role(this, 'api-gateway-role', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com')
    });
    stream.grantPutRecords(apiGatewayRole);

    const domainZone = HostedZone.fromHostedZoneAttributes(this, 'Zone', {
      hostedZoneId: props.domainZoneId,
      zoneName: props.domainZoneName
    });

    const certificate = Certificate.fromCertificateArn(this, 'lunasec-ssl-certificate', props.certificateArn);

    const apiGateway = new RestApi(this, 'lunasec-metrics-api', {
    });

    const domainName = new DomainName(this, 'lunasec-metrics-domain-name', {
      domainName: props.domainName,
      certificate: certificate as any,
      endpointType: EndpointType.REGIONAL,
      mapping: apiGateway,
      securityPolicy: SecurityPolicy.TLS_1_2
    });

    new ARecord(this, 'lunasec-dns-a-record', {
      zone: domainZone,
      recordName: props.domainName,
      target: RecordTarget.fromAlias(
        new route53targets.ApiGatewayDomain(domainName as any)
      ),
      ttl: Duration.minutes(5)
    });

    const putRecordModel = apiGateway.addModel('PutRecordModel', {
      contentType: 'application/json',
      modelName: 'PutRecordModel',
      description: 'PutRecord proxy single-record payload',
      schema: StoreMetricSchema
    });

    // Setup API Gateway methods
    const requestValidator = apiGateway.addRequestValidator('request-validator', {
      requestValidatorName: 'request-body-validator',
      validateRequestBody: true
    });

    // PutRecord
    const putRecordResource = apiGateway.root.addResource('record');
    defaults.addProxyMethodToApiResource({
      service: 'firehose',
      action: 'PutRecord',
      // @ts-ignore
      apiGatewayRole: apiGatewayRole,
      apiMethod: 'POST',
      apiResource: putRecordResource,
      // TODO: Pull the stream name from a variable
      requestTemplate: this.getPutRecordTemplate(stream.deliveryStreamName),
      contentType: "'x-amz-json-1.1'",
      requestValidator,
      requestModel: { 'application/json': putRecordModel }
    });
  }

  getPutRecordTemplate(streamName: string) {
    return `#set($inputRoot = $input.path('$'))
#set($data =  "{
  #foreach($key in $inputRoot.keySet())
  ""$key"": $input.json($key),
  #end
  ""clientIP"": ""$context.identity.sourceIp"",
}")
{
  "DeliveryStreamName": "${streamName}",
  "Record": {
    "Data": "$util.base64Encode($data)"
  }
}`;
  }
}
