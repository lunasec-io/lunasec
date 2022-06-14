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
import { inspect } from 'util';

import { Cluster, ContainerImage, DeploymentControllerType, Secret as EcsSecret } from '@aws-cdk/aws-ecs';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import { ApplicationLoadBalancedFargateService } from '@aws-cdk/aws-ecs-patterns';
import { ISecret } from '@aws-cdk/aws-secretsmanager';
import { Queue } from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import { Construct } from '@aws-cdk/core';

import { addDatadogToTaskDefinition, datadogLogDriverForService } from './datadog-fargate-integration';
import { getContainerTarballPath } from './util';
import { WorkerStorageStackState } from './worker-storage-stack';

interface WorkerStackProps extends cdk.StackProps {
  fargateCluster: Cluster;
  fargateService: ApplicationLoadBalancedFargateService;
  publicHasuraServiceUrl: string;
  gitHubAppId: string;
  gitHubAppPrivateKey: ISecret;
  hasuraDatabaseUrlSecret: ISecret;
  hasuraAdminSecret: ISecret;
  backendStaticSecret: ISecret;
  datadogApiKeyArn: string;
  storageStack: WorkerStorageStackState;
}

interface QueueService {
  name: string;
  queue: Queue;
  // number of seconds that a queue message is "visible" or accessible to a queue
  visibility?: number;
}

export class WorkerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: WorkerStackProps) {
    super(scope, id, props);

    WorkerStack.createWorkerStack(this, props);
  }

  /**
   * This static because multi-stack CloudFormation is very complicated and full of pitfalls.
   * See these articles for some info:
   * https://stackoverflow.com/questions/62989129/resolution-error-cannot-use-resource-x-in-a-cross-environment-fashion-the-re
   * https://awsmaniac.com/sharing-resources-in-aws-cdk/
   * @param context The `this` context of an AWS CDK Stack.
   * @param props Variables required for the stack to deploy properly.
   */
  public static createWorkerStack(context: Construct, props: WorkerStackProps): void {
    const {
      fargateCluster,
      publicHasuraServiceUrl,
      gitHubAppId,
      gitHubAppPrivateKey,
      hasuraDatabaseUrlSecret,
      hasuraAdminSecret,
      backendStaticSecret,
      storageStack,
      datadogApiKeyArn,
    } = props;

    const webhookQueue = storageStack.processWebhookSqsQueue;
    const repositoryQueue = storageStack.processRepositorySqsQueue;
    const manifestQueue = storageStack.processManifestSqsQueue;
    const sbomQueue = storageStack.processSbomSqsQueue;

    if (!repositoryQueue || !webhookQueue || !manifestQueue || !sbomQueue) {
      throw new Error(`expected non-null storage stack queues: ${inspect(storageStack)}`);
    }

    const workerContainerImage = ContainerImage.fromTarball(
      getContainerTarballPath('lunatrace-backend-queue-processor.tar')
    );

    // common environment variables used by queue processors
    const processQueueCommonEnvVars: Record<string, string> = {
      NODE_ENV: 'production',
      WORKER_TYPE: 'queue-handler',
      PROCESS_WEBHOOK_QUEUE: webhookQueue.queueName,
      PROCESS_REPOSITORY_QUEUE: repositoryQueue.queueName,
      S3_SBOM_BUCKET: storageStack.sbomBucket.bucketName,
      S3_MANIFEST_BUCKET: storageStack.manifestBucket.bucketName,
      GITHUB_APP_ID: gitHubAppId,
      HASURA_URL: publicHasuraServiceUrl,
    };

    const processQueueCommonSecrets: Record<string, EcsSecret> = {
      DATABASE_CONNECTION_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
      HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
      HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
      STATIC_SECRET_ACCESS_TOKEN: EcsSecret.fromSecretsManager(backendStaticSecret),
      GITHUB_APP_PRIVATE_KEY: EcsSecret.fromSecretsManager(gitHubAppPrivateKey),
    };

    const queueServices: QueueService[] = [
      {
        name: 'ProcessRepositoryQueue',
        queue: repositoryQueue,
        visibility: 600,
      },
      {
        name: 'ProcessWebhookQueue',
        queue: webhookQueue,
      },
      {
        name: 'ProcessManifestQueue',
        queue: manifestQueue,
        visibility: 300,
      },
      {
        name: 'ProcessSbomQueue',
        queue: sbomQueue,
        visibility: 300,
      },
    ];

    queueServices.forEach((queueService) => {
      const queueFargateService = new ecsPatterns.QueueProcessingFargateService(
        context,
        queueService.name + 'Service',
        {
          cluster: fargateCluster,
          image: workerContainerImage,
          memoryLimitMiB: 2048,
          queue: queueService.queue, // will pass queue_name env var automatically
          assignPublicIp: true,
          enableLogging: true,
          logDriver: datadogLogDriverForService('lunatrace', queueService.name),
          environment: {
            ...processQueueCommonEnvVars,
            // 10 seconds
            ...(queueService.visibility ? { QUEUE_VISIBILITY: queueService.visibility.toString() } : {}),
          },
          secrets: processQueueCommonSecrets,
          containerName: queueService.name + 'Container',
          circuitBreaker: {
            rollback: true,
          },
          // healthCheck: {
          //   // stub command to just see if the container is actually running
          //   command: ['CMD-SHELL', 'ls || exit 1'],
          //   startPeriod: Duration.seconds(5),
          // },
          minScalingCapacity: 2,
          deploymentController: {
            type: DeploymentControllerType.ECS,
          },
        }
      );

      addDatadogToTaskDefinition(context, queueFargateService.taskDefinition, datadogApiKeyArn);

      storageStack.sbomBucket.grantReadWrite(queueFargateService.taskDefinition.taskRole);
      storageStack.manifestBucket.grantReadWrite(queueFargateService.taskDefinition.taskRole);
      webhookQueue.grantSendMessages(queueFargateService.taskDefinition.taskRole);
      webhookQueue.grantConsumeMessages(queueFargateService.taskDefinition.taskRole);
      repositoryQueue.grantConsumeMessages(queueFargateService.taskDefinition.taskRole);
      repositoryQueue.grantSendMessages(queueFargateService.taskDefinition.taskRole);
    });

    // Update vulnerabilities job
    // const updateVulnerabilitiesJob = new ScheduledFargateTask(context, 'UpdateVulnerabilitesJob', {
    //   cluster: props.fargateCluster,
    //   platformVersion: FargatePlatformVersion.LATEST,
    //   desiredTaskCount: 1,
    //   schedule: Schedule.cron({
    //     minute: '0',
    //     hour: '0',
    //     day: '*',
    //     month: '*',
    //     year: '*',
    //   }),
    //   subnetSelection: { subnetType: SubnetType.PUBLIC },
    //   scheduledFargateTaskImageOptions: {
    //     memoryLimitMiB: 8 * 1024,
    //     cpu: 4 * 1024,
    //     image: workerContainerImage,
    //     logDriver: LogDriver.awsLogs({
    //       streamPrefix: 'lunatrace-update-vulnerabilities',
    //     }),
    //     environment: {
    //       ...processQueueCommonEnvVars,
    //       GRYPE_DATABASE_BUCKET: storageStack.grypeDatabaseBucket.bucketName,
    //     },
    //     secrets: {
    //       DATABASE_CONNECTION_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
    //     },
    //   },
    // });
    // storageStack.grypeDatabaseBucket.grantWrite(updateVulnerabilitiesJob.taskDefinition.taskRole);
  }
}
