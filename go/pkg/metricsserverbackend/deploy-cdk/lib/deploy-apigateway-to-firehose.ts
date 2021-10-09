import * as cdk from '@aws-cdk/core';
import * as destinations from '@aws-cdk/aws-kinesisfirehose-destinations';
import {DeliveryStream, StreamEncryption} from '@aws-cdk/aws-kinesisfirehose';
import {Bucket} from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import {RestApi} from '@aws-cdk/aws-apigateway';
import {StoreMetricSchema} from './apigateway-request-models';
import * as defaults from '@aws-solutions-constructs/core';
import {Compression} from '@aws-cdk/aws-kinesisfirehose-destinations';

interface MetricsLambdaStackProps extends cdk.StackProps {
  // TODO: Make the output URL be a URL managed by us, not AWS
  // domainName: string;
  // domainZone: string;
}

export class MetricsLambdaBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: MetricsLambdaStackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'MetricsBucket', {

    });

    const s3Destination = new destinations.S3Bucket(bucket, {
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

    const apiGateway = new RestApi(this, 'lunasec-metrics-api', {

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
}`
  }
}
