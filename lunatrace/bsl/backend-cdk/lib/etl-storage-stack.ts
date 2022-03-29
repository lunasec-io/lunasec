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
import { EventType } from '@aws-cdk/aws-s3';
import { Bucket, HttpMethods } from '@aws-cdk/aws-s3';
import { SqsDestination } from '@aws-cdk/aws-s3-notifications';
import { Queue } from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';

interface EtlStorageStackProps extends cdk.StackProps {
  publicBaseUrl: string;
}

export class EtlStorageStack extends cdk.Stack {
  public sbomBucket: Bucket;
  public manifestBucket: Bucket;
  public processManifestSqsQueue: Queue;
  public processSbomSqsQueue: Queue;

  constructor(scope: cdk.Construct, id: string, props: EtlStorageStackProps) {
    super(scope, id, props);

    const { publicBaseUrl } = props;

    this.sbomBucket = new Bucket(this, 'SbomBucket');

    this.manifestBucket = new Bucket(this, 'ManifestBucket', {
      cors: [
        {
          allowedMethods: [HttpMethods.GET, HttpMethods.PUT],
          allowedOrigins: [publicBaseUrl],
          allowedHeaders: ['*'],
        },
      ],
    });

    const processManifestDeadLetterQueue = new Queue(this, 'ProcessManifestProcessingDeadLetterQueue', {
      retentionPeriod: Duration.days(14),
    });

    this.processManifestSqsQueue = new Queue(this, 'ProcessManifestProcessingQueue', {
      visibilityTimeout: Duration.minutes(1),
      deadLetterQueue: {
        queue: processManifestDeadLetterQueue,
        maxReceiveCount: 10,
      },
    });

    const processSbomDeadLetterQueue = new Queue(this, 'ProcessSbomProcessingDeadLetterQueue', {
      retentionPeriod: Duration.days(14),
    });

    this.processSbomSqsQueue = new Queue(this, 'ProcessSbomProcessingQueue', {
      visibilityTimeout: Duration.minutes(1),
      deadLetterQueue: {
        queue: processSbomDeadLetterQueue,
        maxReceiveCount: 10,
      },
    });

    this.manifestBucket.addEventNotification(
      EventType.OBJECT_CREATED,
      new SqsDestination(this.processManifestSqsQueue)
    );

    this.sbomBucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(this.processSbomSqsQueue));

    new cdk.CfnOutput(this, this.sbomBucket.node.id + 'Name', {
      value: this.sbomBucket.bucketName,
      description: 'Name of the Sbom Bucket',
    });

    new cdk.CfnOutput(this, this.manifestBucket.node.id + 'Name', {
      value: this.manifestBucket.bucketName,
      description: 'Name of the Manifest Bucket',
    });

    new cdk.CfnOutput(this, this.processSbomSqsQueue.node.id + 'Name', {
      value: this.processSbomSqsQueue.queueName,
      description: 'Queue Name for the Process SBOM Queue',
    });

    new cdk.CfnOutput(this, this.processManifestSqsQueue.node.id + 'Name', {
      value: this.processManifestSqsQueue.queueName,
      description: 'Queue Name for the Process Manifest Queue',
    });
  }
}
