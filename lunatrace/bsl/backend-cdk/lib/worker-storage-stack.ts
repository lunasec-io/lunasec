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
import { Construct, Duration } from '@aws-cdk/core';

interface WorkerStorageStackProps extends cdk.StackProps {
  publicBaseUrl: string;
}

export interface WorkerStorageStackState {
  sbomBucket: Bucket;
  manifestBucket: Bucket;
  processManifestSqsQueue: Queue;
  processSbomSqsQueue: Queue;
}

export class WorkerStorageStack extends cdk.Stack implements WorkerStorageStackState {
  public sbomBucket: Bucket;
  public manifestBucket: Bucket;
  public processManifestSqsQueue: Queue;
  public processSbomSqsQueue: Queue;

  constructor(scope: cdk.Construct, id: string, props: WorkerStorageStackProps) {
    super(scope, id, props);

    const stackState = WorkerStorageStack.createWorkerStorageStack(this, props);

    this.sbomBucket = stackState.sbomBucket;
    this.manifestBucket = stackState.manifestBucket;
    this.processManifestSqsQueue = stackState.processManifestSqsQueue;
    this.processSbomSqsQueue = stackState.processSbomSqsQueue;
  }

  /**
   * This static because multi-stack CloudFormation is very complicated and full of pitfalls.
   * See these articles for some info:
   * https://stackoverflow.com/questions/62989129/resolution-error-cannot-use-resource-x-in-a-cross-environment-fashion-the-re
   * https://awsmaniac.com/sharing-resources-in-aws-cdk/
   * @param context The `this` context of an AWS CDK Stack. This must provide variables for re-assignment so that the "stack" values can be exported.
   * @param props Variables required for the stack to deploy properly.
   */
  public static createWorkerStorageStack(context: Construct, props: WorkerStorageStackProps): WorkerStorageStackState {
    const { publicBaseUrl } = props;

    const sbomBucket = new Bucket(context, 'SbomBucket');

    const manifestBucket = new Bucket(context, 'ManifestBucket', {
      cors: [
        {
          allowedMethods: [HttpMethods.GET, HttpMethods.PUT],
          allowedOrigins: [publicBaseUrl],
          allowedHeaders: ['*'],
        },
      ],
    });

    const processManifestDeadLetterQueue = new Queue(context, 'ProcessManifestProcessingDeadLetterQueue', {
      retentionPeriod: Duration.days(14),
    });

    const processManifestSqsQueue = new Queue(context, 'ProcessManifestProcessingQueue', {
      visibilityTimeout: Duration.minutes(1),
      deadLetterQueue: {
        queue: processManifestDeadLetterQueue,
        maxReceiveCount: 10,
      },
    });

    const processSbomDeadLetterQueue = new Queue(context, 'ProcessSbomProcessingDeadLetterQueue', {
      retentionPeriod: Duration.days(14),
    });

    const processSbomSqsQueue = new Queue(context, 'ProcessSbomProcessingQueue', {
      visibilityTimeout: Duration.minutes(1),
      deadLetterQueue: {
        queue: processSbomDeadLetterQueue,
        maxReceiveCount: 10,
      },
    });

    manifestBucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(processManifestSqsQueue));

    sbomBucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(processSbomSqsQueue));

    new cdk.CfnOutput(context, sbomBucket.node.id + 'Name', {
      value: sbomBucket.bucketName,
      description: 'Name of the Sbom Bucket',
    });

    new cdk.CfnOutput(context, manifestBucket.node.id + 'Name', {
      value: manifestBucket.bucketName,
      description: 'Name of the Manifest Bucket',
    });

    new cdk.CfnOutput(context, processSbomSqsQueue.node.id + 'Name', {
      value: processSbomSqsQueue.queueName,
      description: 'Queue Name for the Process SBOM Queue',
    });

    new cdk.CfnOutput(context, processManifestSqsQueue.node.id + 'Name', {
      value: processManifestSqsQueue.queueName,
      description: 'Queue Name for the Process Manifest Queue',
    });

    return {
      sbomBucket,
      manifestBucket,
      processManifestSqsQueue,
      processSbomSqsQueue,
    };
  }
}
