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
import { Cluster, ContainerImage, Secret as EcsSecret } from '@aws-cdk/aws-ecs';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import { ISecret } from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';

import { commonBuildProps } from './constants';
import { EtlStorageStack } from './etl-storage-stack';

interface EtlStackProps extends cdk.StackProps {
  fargateCluster: Cluster;
  publicHasuraServiceUrl: string;
  hasuraDatabaseUrlSecret: ISecret;
  hasuraAdminSecret: ISecret;
  backendStaticSecret: ISecret;
  storageStack: EtlStorageStack;
}

export class EtlStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: EtlStackProps) {
    super(scope, id, props);

    const {
      fargateCluster,
      publicHasuraServiceUrl,
      hasuraDatabaseUrlSecret,
      hasuraAdminSecret,
      backendStaticSecret,
      storageStack,
    } = props;

    // Process Manifest Service - Generates an SBOM from a package manifest
    const QueueProcessorContainerImage = ContainerImage.fromAsset('../backend', {
      ...commonBuildProps,
      target: 'backend-queue-processor',
    });

    const processManifestQueueService = new ecsPatterns.QueueProcessingFargateService(
      this,
      'ProcessManifestQueueService',
      {
        cluster: fargateCluster,
        image: QueueProcessorContainerImage,
        queue: storageStack.processManifestSqsQueue, // will pass queue_name env var automatically
        assignPublicIp: true,
        enableLogging: true,
        environment: {
          QUEUE_HANDLER: 'process-manifest-queue',
          S3_SBOM_BUCKET: storageStack.sbomBucket.bucketName,
          S3_MANIFEST_BUCKET: storageStack.manifestBucket.bucketName,
          HASURA_URL: publicHasuraServiceUrl,
        },
        secrets: {
          HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
          HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
          STATIC_SECRET_ACCESS_TOKEN: EcsSecret.fromSecretsManager(backendStaticSecret),
        },
        containerName: 'ProcessManifestQueueContainer',
        circuitBreaker: {
          rollback: true,
        },
      }
    );
    storageStack.manifestBucket.grantReadWrite(processManifestQueueService.taskDefinition.taskRole);
    storageStack.sbomBucket.grantReadWrite(processManifestQueueService.taskDefinition.taskRole);

    // Process SBOM Service - Generates findings from a provided SBOM
    const processSbomQueueService = new ecsPatterns.QueueProcessingFargateService(this, 'ProcessSbomQueueService', {
      cluster: fargateCluster,
      image: QueueProcessorContainerImage,
      queue: storageStack.processSbomSqsQueue, // will pass queue_name env var automatically
      enableLogging: true,
      assignPublicIp: true,
      environment: {
        QUEUE_HANDLER: 'process-sbom-queue',
        S3_SBOM_BUCKET: storageStack.sbomBucket.bucketName,
        S3_MANIFEST_BUCKET: storageStack.manifestBucket.bucketName,
        HASURA_URL: publicHasuraServiceUrl,
      },
      secrets: {
        HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
        HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
        STATIC_SECRET_ACCESS_TOKEN: EcsSecret.fromSecretsManager(backendStaticSecret),
      },
      containerName: 'ProcessSbomQueueService',
      circuitBreaker: {
        rollback: true,
      },
    });
    storageStack.sbomBucket.grantReadWrite(processSbomQueueService.taskDefinition.taskRole);
  }
}
