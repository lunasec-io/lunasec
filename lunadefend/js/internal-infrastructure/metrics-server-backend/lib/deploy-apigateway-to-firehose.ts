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
import { DomainName, EndpointType, Resource, RestApi, SecurityPolicy } from '@aws-cdk/aws-apigateway';
import * as jsonSchema from '@aws-cdk/aws-apigateway/lib/json-schema';
import { Certificate } from '@aws-cdk/aws-certificatemanager';
import * as iam from '@aws-cdk/aws-iam';
import { DeliveryStream, StreamEncryption } from '@aws-cdk/aws-kinesisfirehose';
import { Compression } from '@aws-cdk/aws-kinesisfirehose-destinations';
import * as destinations from '@aws-cdk/aws-kinesisfirehose-destinations';
import { ARecord, HostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import * as route53targets from '@aws-cdk/aws-route53-targets';
import { Bucket } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';
import * as defaults from '@aws-solutions-constructs/core';

import { StoreCliMetricSchema, StoreDeploymentMetricSchema } from './apigateway-request-models';

interface MetricsLambdaStackProps extends cdk.StackProps {
  // TODO: Make the output URL be a URL managed by us, not AWS
  domainName: string;
  domainZoneId: string;
  domainZoneName: string;
  certificateArn: string;
}

function capitalizeWords(s: string) {
  return s.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

function getPutRecordTemplate(endpointName: string, streamName: string) {
  return `#set($inputRoot = $input.path('$'))
#set($data =  "{
  #foreach($key in $inputRoot.keySet())
  ""$key"": $input.json($key),
  #end
  ""tag"": ""${endpointName}"",
  ""clientIP"": ""$context.identity.sourceIp""
}")
#set($newLineRegex = '\n')
#set($formattedJson = "$data.replaceAll($newLineRegex, '')
")
{
  "DeliveryStreamName": "${streamName}",
  "Record": {
    "Data": "$util.base64Encode($formattedJson)"
  }
}`;
}

function getMetricsApiEndpoint(
  name: string,
  schema: jsonSchema.JsonSchema,
  rootResource: Resource,
  apiGateway: RestApi,
  apiGatewayRole: iam.Role,
  stream: DeliveryStream
) {
  const capitalName = capitalizeWords(name);
  const putRecordModel = apiGateway.addModel(`Put${name}RecordModel`, {
    contentType: 'application/json',
    modelName: `Put${capitalName}RecordModel`,
    description: `Put${capitalName}Record proxy single-record payload`,
    schema: schema,
  });

  // Setup API Gateway methods
  const requestValidator = apiGateway.addRequestValidator(`${name}-request-validator`, {
    requestValidatorName: `${name}-request-body-validator`,
    validateRequestBody: true,
  });

  const recordResource = rootResource.addResource(name);

  defaults.addProxyMethodToApiResource({
    service: 'firehose',
    action: 'PutRecord',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    apiGatewayRole: apiGatewayRole,
    apiMethod: 'POST',
    apiResource: recordResource,
    // TODO: Pull the stream name from a variable
    requestTemplate: getPutRecordTemplate(name, stream.deliveryStreamName),
    contentType: "'x-amz-json-1.1'",
    requestValidator,
    requestModel: { 'application/json': putRecordModel },
  });
}

export class MetricsLambdaBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: MetricsLambdaStackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'MetricsBucket', {});

    //todo: Fix this
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const s3Destination = new destinations.S3Bucket(bucket, {
      compression: Compression.GZIP,
      dataOutputPrefix:
        'metrics/tag=!{partitionKeyFromQuery:tag}/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/rand=!{firehose:random-string}',
      errorOutputPrefix:
        'metrics_failures/!{firehose:error-output-type}/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}',
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ogBind = s3Destination.bind;
    s3Destination.bind = function overrideBind(...args) {
      const output = ogBind.apply(this, args);
      if (!output || !output.extendedS3DestinationConfiguration) {
        return output;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      output.extendedS3DestinationConfiguration.dynamicPartitioningConfiguration = {
        enabled: true,
        retryOptions: {
          durationInSeconds: 122,
        },
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      output.extendedS3DestinationConfiguration.processingConfiguration = {
        enabled: true,
        processors: [
          {
            type: 'MetadataExtraction',
            parameters: [
              {
                parameterName: 'MetadataExtractionQuery',
                parameterValue: '{tag: .tag}',
              },
              {
                parameterName: 'JsonParsingEngine',
                parameterValue: 'JQ-1.6',
              },
            ],
          },
          {
            type: 'AppendDelimiterToRecord',
            parameters: [
              {
                parameterName: 'Delimiter',
                parameterValue: '\\n',
              },
            ],
          },
        ],
      };
      return output;
    };

    const stream = new DeliveryStream(this, 'Metrics Delivery Stream', {
      encryption: StreamEncryption.AWS_OWNED,
      destinations: [s3Destination],
    });

    // Setup the API Gateway role
    const apiGatewayRole = new iam.Role(this, 'api-gateway-role', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
    });
    stream.grantPutRecords(apiGatewayRole as any);

    const domainZone = HostedZone.fromHostedZoneAttributes(this, 'Zone', {
      hostedZoneId: props.domainZoneId,
      zoneName: props.domainZoneName,
    });

    const certificate = Certificate.fromCertificateArn(this, 'lunasec-ssl-certificate', props.certificateArn);

    const apiGateway = new RestApi(this, 'lunasec-metrics-api', {});

    const domainName = new DomainName(this, 'lunasec-metrics-domain-name', {
      domainName: props.domainName,
      certificate: certificate as never,
      endpointType: EndpointType.REGIONAL,
      mapping: apiGateway,
      securityPolicy: SecurityPolicy.TLS_1_2,
    });

    new ARecord(this, 'lunasec-dns-a-record', {
      zone: domainZone,
      recordName: props.domainName,
      target: RecordTarget.fromAlias(new route53targets.ApiGatewayDomain(domainName as never)),
      ttl: Duration.minutes(5),
    });

    // RootRecord
    const rootRecordResource = apiGateway.root.addResource('record');

    getMetricsApiEndpoint(
      'deployment',
      StoreDeploymentMetricSchema,
      rootRecordResource,
      apiGateway,
      apiGatewayRole,
      stream
    );
    getMetricsApiEndpoint('cli', StoreCliMetricSchema, rootRecordResource, apiGateway, apiGatewayRole, stream);
  }
}
