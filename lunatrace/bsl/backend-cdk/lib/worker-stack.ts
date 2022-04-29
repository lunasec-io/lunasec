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
import { Cluster, ContainerImage, DeploymentControllerType, Secret as EcsSecret } from '@aws-cdk/aws-ecs';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import { ISecret } from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';
import { Construct } from '@aws-cdk/core';

import { getContainerTarballPath } from './util';
import { WorkerStorageStackState } from './worker-storage-stack';

interface WorkerStackProps extends cdk.StackProps {
  fargateCluster: Cluster;
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

    const queueProcessorContainerImage = ContainerImage.fromTarball(
      getContainerTarballPath('lunatrace-backend-queue-processor.tar')
    );

    const processRepositoryQueueService = new ecsPatterns.QueueProcessingFargateService(
      context,
      'ProcessRepositoryQueueService',
      {
        cluster: fargateCluster,
        image: queueProcessorContainerImage,
        memoryLimitMiB: 2048,
        queue: storageStack.processRepositorySqsQueue, // will pass queue_name env var automatically
        assignPublicIp: true,
        enableLogging: true,
        environment: {
          QUEUE_HANDLER: 'process-repository-queue',
          GITHUB_APP_ID: gitHubAppId,
          S3_SBOM_BUCKET: storageStack.sbomBucket.bucketName,
          HASURA_URL: publicHasuraServiceUrl,
          NODE_ENV: 'production',
        },
        secrets: {
          DATABASE_CONNECTION_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
          HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
          HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
          STATIC_SECRET_ACCESS_TOKEN: EcsSecret.fromSecretsManager(backendStaticSecret),
          GITHUB_APP_PRIVATE_KEY: EcsSecret.fromSecretsManager(gitHubAppPrivateKey),
        },
        containerName: 'ProcessRepositoryQueueContainer',
        circuitBreaker: {
          rollback: true,
        },
        deploymentController: {
          // This sets up Blue/Green deploys
          type: DeploymentControllerType.CODE_DEPLOY,
        },
        healthCheck: {
          command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:5002/health || exit 1'],
        },
      }
    );
    storageStack.sbomBucket.grantReadWrite(processRepositoryQueueService.taskDefinition.taskRole);

    const processManifestQueueService = new ecsPatterns.QueueProcessingFargateService(
      context,
      'ProcessManifestQueueService',
      {
        cluster: fargateCluster,
        image: queueProcessorContainerImage,
        memoryLimitMiB: 2048,
        queue: storageStack.processManifestSqsQueue, // will pass queue_name env var automatically
        assignPublicIp: true,
        enableLogging: true,
        environment: {
          QUEUE_HANDLER: 'process-manifest-queue',
          GITHUB_APP_ID: gitHubAppId,
          S3_SBOM_BUCKET: storageStack.sbomBucket.bucketName,
          S3_MANIFEST_BUCKET: storageStack.manifestBucket.bucketName,
          HASURA_URL: publicHasuraServiceUrl,
          NODE_ENV: 'production',
        },
        secrets: {
          DATABASE_CONNECTION_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
          HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
          HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
          STATIC_SECRET_ACCESS_TOKEN: EcsSecret.fromSecretsManager(backendStaticSecret),
          GITHUB_APP_PRIVATE_KEY: EcsSecret.fromSecretsManager(gitHubAppPrivateKey),
        },
        containerName: 'ProcessManifestQueueContainer',
        circuitBreaker: {
          rollback: true,
        },
        deploymentController: {
          // This sets up Blue/Green deploys
          type: DeploymentControllerType.CODE_DEPLOY,
        },
        healthCheck: {
          command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:5001/health || exit 1'],
        },
      }
    );
    storageStack.manifestBucket.grantReadWrite(processManifestQueueService.taskDefinition.taskRole);
    storageStack.sbomBucket.grantReadWrite(processManifestQueueService.taskDefinition.taskRole);

    // Process SBOM Service - Generates findings from a provided SBOM
    const processSbomQueueService = new ecsPatterns.QueueProcessingFargateService(context, 'ProcessSbomQueueService', {
      cluster: fargateCluster,
      image: queueProcessorContainerImage,
      queue: storageStack.processSbomSqsQueue, // will pass queue_name env var automatically
      enableLogging: true,
      assignPublicIp: true,
      memoryLimitMiB: 2048,
      environment: {
        QUEUE_HANDLER: 'process-sbom-queue',
        GITHUB_APP_ID: gitHubAppId,
        S3_SBOM_BUCKET: storageStack.sbomBucket.bucketName,
        S3_MANIFEST_BUCKET: storageStack.manifestBucket.bucketName,
        HASURA_URL: publicHasuraServiceUrl,
        NODE_ENV: 'production',
      },
      secrets: {
        DATABASE_CONNECTION_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
        HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
        HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
        STATIC_SECRET_ACCESS_TOKEN: EcsSecret.fromSecretsManager(backendStaticSecret),
        GITHUB_APP_PRIVATE_KEY: EcsSecret.fromSecretsManager(gitHubAppPrivateKey),
      },
      containerName: 'ProcessSbomQueueService',
      circuitBreaker: {
        rollback: true,
      },
      deploymentController: {
        // This sets up Blue/Green deploys
        type: DeploymentControllerType.CODE_DEPLOY,
      },
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:5003/health || exit 1'],
      },
    });
    storageStack.sbomBucket.grantReadWrite(processSbomQueueService.taskDefinition.taskRole);

    // Process GitHub Webhook Service - Listens for GitHub webhooks and processes them durably
    const processWebhookQueueService = new ecsPatterns.QueueProcessingFargateService(
      context,
      'ProcessWebhookQueueService',
      {
        cluster: fargateCluster,
        image: queueProcessorContainerImage,
        queue: storageStack.processWebhookSqsQueue, // will pass queue_name env var automatically
        enableLogging: true,
        assignPublicIp: true,
        memoryLimitMiB: 2048,
        environment: {
          QUEUE_HANDLER: 'process-webhook-queue',
          GITHUB_APP_ID: gitHubAppId,
          S3_SBOM_BUCKET: storageStack.sbomBucket.bucketName,
          S3_MANIFEST_BUCKET: storageStack.manifestBucket.bucketName,
          HASURA_URL: publicHasuraServiceUrl,
          NODE_ENV: 'production',
        },
        secrets: {
          DATABASE_CONNECTION_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
          HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
          HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
          STATIC_SECRET_ACCESS_TOKEN: EcsSecret.fromSecretsManager(backendStaticSecret),
          GITHUB_APP_PRIVATE_KEY: EcsSecret.fromSecretsManager(gitHubAppPrivateKey),
        },
        containerName: 'ProcessWebhookQueueService',
        circuitBreaker: {
          rollback: true,
        },
        deploymentController: {
          // This sets up Blue/Green deploys
          type: DeploymentControllerType.CODE_DEPLOY,
        },
        healthCheck: {
          command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:5004/health || exit 1'],
        },
      }
    );
  }
}
