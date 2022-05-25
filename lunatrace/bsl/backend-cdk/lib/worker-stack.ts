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
import * as cdk from '@aws-cdk/core';
import { Construct } from '@aws-cdk/core';

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
  storageStack: WorkerStorageStackState;
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
    } = props;

    if (
      !storageStack.processRepositorySqsQueue ||
      !storageStack.processWebhookSqsQueue ||
      !storageStack.processManifestSqsQueue ||
      !storageStack.processSbomSqsQueue
    ) {
      throw new Error(`expected non-null storage stack queues: ${inspect(storageStack)}`);
    }

    const workerContainerImage = ContainerImage.fromTarball(
      getContainerTarballPath('lunatrace-backend-queue-processor.tar')
    );

    // common environment variables used by queue processors
    const processQueueCommonEnvVars: Record<string, string> = {
      NODE_ENV: 'production',
      WORKER_TYPE: 'queue-handler',
      PROCESS_WEBHOOK_QUEUE: storageStack.processWebhookSqsQueue.queueName,
      PROCESS_REPOSITORY_QUEUE: storageStack.processRepositorySqsQueue.queueName,
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

    const processRepositoryQueueService = new ecsPatterns.QueueProcessingFargateService(
      context,
      'ProcessRepositoryQueueService',
      {
        cluster: fargateCluster,
        image: workerContainerImage,
        memoryLimitMiB: 2048,
        queue: storageStack.processRepositorySqsQueue, // will pass queue_name env var automatically
        assignPublicIp: true,
        enableLogging: true,
        environment: {
          ...processQueueCommonEnvVars,
        },
        secrets: processQueueCommonSecrets,
        containerName: 'ProcessRepositoryQueueContainer',
        circuitBreaker: {
          rollback: true,
        },
        minScalingCapacity: 2,
        deploymentController: {
          type: DeploymentControllerType.ECS,
        },
      }
    );
    storageStack.sbomBucket.grantReadWrite(processRepositoryQueueService.taskDefinition.taskRole);
    storageStack.processWebhookSqsQueue.grantSendMessages(processRepositoryQueueService.taskDefinition.taskRole);
    storageStack.processRepositorySqsQueue.grantSendMessages(props.fargateService.service.taskDefinition.taskRole);

    const processManifestQueueService = new ecsPatterns.QueueProcessingFargateService(
      context,
      'ProcessManifestQueueService',
      {
        cluster: fargateCluster,
        image: workerContainerImage,
        memoryLimitMiB: 2048,
        queue: storageStack.processManifestSqsQueue, // will pass queue_name env var automatically
        assignPublicIp: true,
        enableLogging: true,
        environment: {
          ...processQueueCommonEnvVars,
        },
        secrets: processQueueCommonSecrets,
        containerName: 'ProcessManifestQueueContainer',
        circuitBreaker: {
          rollback: true,
        },
        minScalingCapacity: 2,
        deploymentController: {
          type: DeploymentControllerType.ECS,
        },
      }
    );
    storageStack.manifestBucket.grantReadWrite(processManifestQueueService.taskDefinition.taskRole);
    storageStack.sbomBucket.grantReadWrite(processManifestQueueService.taskDefinition.taskRole);
    storageStack.processWebhookSqsQueue.grantSendMessages(processManifestQueueService.taskDefinition.taskRole);

    // Process SBOM Service - Generates findings from a provided SBOM
    const processSbomQueueService = new ecsPatterns.QueueProcessingFargateService(context, 'ProcessSbomQueueService', {
      cluster: fargateCluster,
      image: workerContainerImage,
      queue: storageStack.processSbomSqsQueue, // will pass queue_name env var automatically
      enableLogging: true,
      assignPublicIp: true,
      memoryLimitMiB: 2048,
      environment: {
        ...processQueueCommonEnvVars,
      },
      secrets: processQueueCommonSecrets,
      containerName: 'ProcessSbomQueueService',
      circuitBreaker: {
        rollback: true,
      },
      minScalingCapacity: 2,
      deploymentController: {
        type: DeploymentControllerType.ECS,
      },
    });
    storageStack.sbomBucket.grantReadWrite(processSbomQueueService.taskDefinition.taskRole);
    storageStack.processWebhookSqsQueue.grantSendMessages(processSbomQueueService.taskDefinition.taskRole);

    // Process GitHub Webhook Service - Listens for GitHub webhooks and processes them durably
    const processWebhookQueueService = new ecsPatterns.QueueProcessingFargateService(
      context,
      'ProcessWebhookQueueService',
      {
        cluster: fargateCluster,
        image: workerContainerImage,
        queue: storageStack.processWebhookSqsQueue, // will pass queue_name env var automatically
        enableLogging: true,
        assignPublicIp: true,
        memoryLimitMiB: 2048,
        environment: {
          ...processQueueCommonEnvVars,
        },
        secrets: processQueueCommonSecrets,
        containerName: 'ProcessWebhookQueueService',
        circuitBreaker: {
          rollback: true,
        },
        minScalingCapacity: 2,
        deploymentController: {
          type: DeploymentControllerType.ECS,
        },
      }
    );
    storageStack.processWebhookSqsQueue.grantConsumeMessages(processWebhookQueueService.taskDefinition.taskRole);
    storageStack.processWebhookSqsQueue.grantSendMessages(props.fargateService.service.taskDefinition.taskRole);
    storageStack.processRepositorySqsQueue.grantSendMessages(processWebhookQueueService.taskDefinition.taskRole);

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
