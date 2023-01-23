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
import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Bucket, EventType, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { SqsDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

interface WorkerStorageStackProps extends cdk.StackProps {
  publicBaseUrl: string;
  development?: boolean;
}

// Since we want to maintain different queue handler services for different message types,
// we have these all broken out for production. In development, these queues will all be null.
interface WorkerQueues {
  processManifestSqsQueue: Queue | null;
  processSbomSqsQueue: Queue | null;
  processWebhookSqsQueue: Queue | null;
  processRepositorySqsQueue: Queue | null;
  staticAnalysisSqsQueue: Queue | null;
}

export interface WorkerStorageStackState extends WorkerQueues {
  sbomBucket: Bucket;
  manifestBucket: Bucket;
  codeBucket: Bucket;
  grypeDatabaseBucket: Bucket;
}

export class WorkerStorageStack extends cdk.Stack implements WorkerStorageStackState {
  public sbomBucket: Bucket;
  public manifestBucket: Bucket;
  public codeBucket: Bucket;
  public grypeDatabaseBucket: Bucket;
  public processManifestSqsQueue: Queue | null;
  public processSbomSqsQueue: Queue | null;
  public processWebhookSqsQueue: Queue | null;
  public processRepositorySqsQueue: Queue | null;
  public staticAnalysisSqsQueue: Queue | null;

  constructor(scope: Construct, id: string, props: WorkerStorageStackProps) {
    super(scope, id, props);

    const stackState = WorkerStorageStack.createWorkerStorageStack(this, props);

    this.sbomBucket = stackState.sbomBucket;
    this.manifestBucket = stackState.manifestBucket;
    this.codeBucket = stackState.codeBucket;
    this.grypeDatabaseBucket = stackState.grypeDatabaseBucket;
    this.processManifestSqsQueue = stackState.processManifestSqsQueue;
    this.processSbomSqsQueue = stackState.processSbomSqsQueue;
    this.processWebhookSqsQueue = stackState.processWebhookSqsQueue;
    this.processRepositorySqsQueue = stackState.processWebhookSqsQueue;
    this.staticAnalysisSqsQueue = stackState.staticAnalysisSqsQueue;
  }

  private static createProductionQueues(context: Construct, manifestBucket: Bucket, sbomBucket: Bucket): WorkerQueues {
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

    const processRepositoryDeadLetterQueue = new Queue(context, 'ProcessRepositoryProcessingDeadLetterQueue', {
      retentionPeriod: Duration.days(14),
    });

    const processRepositorySqsQueue = new Queue(context, 'ProcessRepositoryProcessingQueue', {
      visibilityTimeout: Duration.minutes(1),
      deadLetterQueue: {
        queue: processRepositoryDeadLetterQueue,
        maxReceiveCount: 10,
      },
    });

    const processWebhookDeadLetterQueue = new Queue(context, 'ProcessWebhookProcessingDeadLetterQueue', {
      retentionPeriod: Duration.days(14),
    });

    const processWebhookSqsQueue = new Queue(context, 'ProcessWebhookProcessingQueue', {
      visibilityTimeout: Duration.minutes(1),
      deadLetterQueue: {
        queue: processWebhookDeadLetterQueue,
        maxReceiveCount: 10,
      },
    });

    const staticAnalysisDeadLetterQueue = new Queue(context, 'StaticAnalysisDeadLetterQueue', {
      retentionPeriod: Duration.days(14),
    });

    const staticAnalysisSqsQueue = new Queue(context, 'staticAnalysisQueue', {
      visibilityTimeout: Duration.minutes(1),
      deadLetterQueue: {
        queue: staticAnalysisDeadLetterQueue,
        maxReceiveCount: 10,
      },
    });

    manifestBucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(processManifestSqsQueue));
    sbomBucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(processSbomSqsQueue));

    new cdk.CfnOutput(context, processSbomSqsQueue.node.id + 'Name', {
      value: processSbomSqsQueue.queueName,
      description: 'Queue Name for the Process SBOM Queue',
    });

    new cdk.CfnOutput(context, processManifestSqsQueue.node.id + 'Name', {
      value: processManifestSqsQueue.queueName,
      description: 'Queue Name for the Process Manifest Queue',
    });

    new cdk.CfnOutput(context, processWebhookSqsQueue.node.id + 'Name', {
      value: processWebhookSqsQueue.queueName,
      description: 'Queue Name for the Process Webhook Queue',
    });

    new cdk.CfnOutput(context, processRepositorySqsQueue.node.id + 'Name', {
      value: processRepositorySqsQueue.queueName,
      description: 'Queue Name for the Process Repository Queue',
    });

    new cdk.CfnOutput(context, staticAnalysisSqsQueue.node.id + 'Name', {
      value: staticAnalysisSqsQueue.queueName,
      description: 'Queue Name for the Static Analysis Queue',
    });

    return {
      processManifestSqsQueue,
      processSbomSqsQueue,
      processWebhookSqsQueue,
      processRepositorySqsQueue,
      staticAnalysisSqsQueue,
    };
  }

  private static createDevelopmentQueues(context: Construct, manifestBucket: Bucket, sbomBucket: Bucket) {
    const lunatraceDevelopmentSqsDeadLetterQueue = new Queue(context, 'ProcessWebhookProcessingDeadLetterQueue', {
      retentionPeriod: Duration.days(14),
    });

    const lunatraceDevelopmentSqsQueue = new Queue(context, 'LunaTraceDevelopmentQueue', {
      visibilityTimeout: Duration.minutes(1),
      deadLetterQueue: {
        queue: lunatraceDevelopmentSqsDeadLetterQueue,
        maxReceiveCount: 10,
      },
    });

    new cdk.CfnOutput(context, lunatraceDevelopmentSqsQueue.node.id + 'Name', {
      value: lunatraceDevelopmentSqsQueue.queueName,
      description: 'Queue Name for the lunatrace development nodejs queue',
    });

    manifestBucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(lunatraceDevelopmentSqsQueue));
    sbomBucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(lunatraceDevelopmentSqsQueue));

    const lunatraceDevelopmentGolangDeadLetterQueue = new Queue(context, 'LunaTraceDevelopmentGolangDeadLetterQueue', {
      retentionPeriod: Duration.days(14),
    });

    const lunatraceDevelopmentGolangQueue = new Queue(context, 'LunaTraceDevelopmentGolangQueue', {
      visibilityTimeout: Duration.minutes(1),
      deadLetterQueue: {
        queue: lunatraceDevelopmentGolangDeadLetterQueue,
        maxReceiveCount: 10,
      },
    });

    new cdk.CfnOutput(context, lunatraceDevelopmentGolangQueue.node.id + 'Name', {
      value: lunatraceDevelopmentGolangQueue.queueName,
      description: 'Queue Name for the lunatrace development golang queue',
    });
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

    const grypeDatabaseBucket = new Bucket(context, 'GrypeDatabaseBucket');

    const sbomBucket = new Bucket(context, 'SbomBucket');

    const codeBucket = new Bucket(context, 'CodeBucket');

    const manifestBucket = new Bucket(context, 'ManifestBucket', {
      cors: [
        {
          allowedMethods: [HttpMethods.GET, HttpMethods.PUT],
          allowedOrigins: [publicBaseUrl],
          allowedHeaders: ['*'],
        },
      ],
    });

    let workerQueues: WorkerQueues = {
      processManifestSqsQueue: null,
      processRepositorySqsQueue: null,
      processSbomSqsQueue: null,
      processWebhookSqsQueue: null,
      staticAnalysisSqsQueue: null,
    };

    if (props.development) {
      this.createDevelopmentQueues(context, manifestBucket, sbomBucket);
    } else {
      workerQueues = this.createProductionQueues(context, manifestBucket, sbomBucket);
    }

    new cdk.CfnOutput(context, sbomBucket.node.id + 'Name', {
      value: sbomBucket.bucketName,
      description: 'Name of the Sbom Bucket',
    });

    new cdk.CfnOutput(context, manifestBucket.node.id + 'Name', {
      value: manifestBucket.bucketName,
      description: 'Name of the Manifest Bucket',
    });

    new cdk.CfnOutput(context, codeBucket.node.id + 'Name', {
      value: codeBucket.bucketName,
      description: 'Name of the Code Bucket',
    });

    new cdk.CfnOutput(context, grypeDatabaseBucket.node.id + 'Name', {
      value: grypeDatabaseBucket.bucketName,
      description: 'Name of the Grype Database Bucket',
    });

    return {
      sbomBucket,
      manifestBucket,
      grypeDatabaseBucket,
      codeBucket,
      ...workerQueues,
    };
  }
}
