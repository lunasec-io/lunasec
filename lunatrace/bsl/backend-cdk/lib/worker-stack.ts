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

import { SecurityGroup, SubnetType } from '@aws-cdk/aws-ec2';
import {
  CapacityProviderStrategy,
  Cluster,
  ContainerImage,
  DeploymentControllerType,
  Secret as EcsSecret,
  FargatePlatformVersion,
} from '@aws-cdk/aws-ecs';
import {
  ApplicationLoadBalancedFargateService,
  QueueProcessingFargateServiceProps,
  ScheduledFargateTask,
} from '@aws-cdk/aws-ecs-patterns';
import { Schedule } from '@aws-cdk/aws-events';
import { ISecret } from '@aws-cdk/aws-secretsmanager';
import { Queue } from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import { Construct, Duration } from '@aws-cdk/core';

import { QueueProcessingFargateService } from './aws/queue-processing-fargate-service';
import { commonBuildProps } from './constants';
import { addDatadogToTaskDefinition, datadogLogDriverForService } from './datadog-fargate-integration';
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
  servicesSecurityGroup: SecurityGroup;
  vpcDbSecurityGroup: SecurityGroup;
}

interface QueueService extends Partial<QueueProcessingFargateServiceProps> {
  name: string;
  queue: Queue;
  // number of seconds that a queue message is "visible" or accessible to a queue
  visibility?: number;
  ram?: number;
  cpu?: number;
  ephemeralStorageGiB?: number;
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
      servicesSecurityGroup,
      vpcDbSecurityGroup,
    } = props;

    const webhookQueue = storageStack.processWebhookSqsQueue;
    const repositoryQueue = storageStack.processRepositorySqsQueue;
    const manifestQueue = storageStack.processManifestSqsQueue;
    const sbomQueue = storageStack.processSbomSqsQueue;
    const staticAnalysisQueue = storageStack.staticAnalysisSqsQueue;

    if (!repositoryQueue || !webhookQueue || !manifestQueue || !sbomQueue || !staticAnalysisQueue) {
      throw new Error(`expected non-null storage stack queues: ${inspect(storageStack)}`);
    }

    const workerContainerImage = ContainerImage.fromAsset('../backend', {
      ...commonBuildProps,
      target: 'backend-queue-processor',
    });

    const golangWorkerImage = ContainerImage.fromAsset('../ingest-worker', {
      ...commonBuildProps,
      file: 'docker/queuehandler.dockerfile',
    });

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
      LUNATRACE_GRAPHQL_SERVER_URL: 'http://backend.services:8080/v1/graphql',
    };

    const processQueueCommonSecrets: Record<string, EcsSecret> = {
      DATABASE_CONNECTION_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
      HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
      HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
      LUNATRACE_GRAPHQL_SERVER_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
      STATIC_SECRET_ACCESS_TOKEN: EcsSecret.fromSecretsManager(backendStaticSecret),
      GITHUB_APP_PRIVATE_KEY: EcsSecret.fromSecretsManager(gitHubAppPrivateKey),
    };

    const gb = 1024;

    const capacityProviderStrategies: CapacityProviderStrategy[] = [
      {
        capacityProvider: 'FARGATE_SPOT',
        weight: 2,
      },
      {
        capacityProvider: 'FARGATE',
        weight: 1,
      },
    ];

    const scalingSteps = [
      { upper: 0, change: -1 },
      { lower: 50, change: +1 },
      { lower: 200, change: +5 },
    ];

    const queueServices: QueueService[] = [
      {
        name: 'ProcessRepositoryQueue',
        queue: repositoryQueue,
        visibility: 600,
        ram: 8 * gb,
        cpu: 4 * gb,
        capacityProviderStrategies,
        ephemeralStorageGiB: 200,
        scalingSteps,
      },
      {
        name: 'StaticAnalysisQueue',
        queue: staticAnalysisQueue,
        visibility: 600,
        ram: 8 * gb,
        cpu: 4 * gb,
        capacityProviderStrategies,
        ephemeralStorageGiB: 200,
        scalingSteps,
      },
      {
        name: 'ProcessWebhookQueue',
        queue: webhookQueue,
      },
      {
        name: 'ProcessManifestQueue',
        queue: manifestQueue,
        visibility: 300,
        capacityProviderStrategies,
        scalingSteps,
      },
      {
        name: 'ProcessSbomQueue',
        queue: sbomQueue,
        visibility: 300,
        capacityProviderStrategies,
        scalingSteps,
      },
    ];

    queueServices.forEach((queueService) => {
      const { name, visibility, queue, ...other } = queueService;

      const queueFargateService = new QueueProcessingFargateService(context, name + 'Service', {
        cluster: fargateCluster,
        cpu: queueService.cpu,
        image: workerContainerImage,
        memoryLimitMiB: queueService.ram || 2 * gb,
        queue: queue, // will pass queue_name env var automatically
        assignPublicIp: true,
        enableLogging: true,
        logDriver: datadogLogDriverForService('lunatrace', name),
        environment: {
          ...processQueueCommonEnvVars,
          ...(visibility ? { QUEUE_VISIBILITY: visibility.toString() } : {}),
          REDEPLOY: '1',
        },
        securityGroups: [vpcDbSecurityGroup, servicesSecurityGroup],
        secrets: processQueueCommonSecrets,
        containerName: name + 'Container',
        circuitBreaker: {
          rollback: true,
        },
        // healthCheck: {
        //   // stub command to just see if the container is actually running
        //   command: ['CMD-SHELL', 'ls || exit 1'],
        //   startPeriod: Duration.seconds(5),
        // },
        minScalingCapacity: 2,
        maxScalingCapacity: 20,
        deploymentController: {
          type: DeploymentControllerType.ECS,
        },
        ...other,
      });

      addDatadogToTaskDefinition(context, queueFargateService.taskDefinition, datadogApiKeyArn);

      storageStack.sbomBucket.grantReadWrite(queueFargateService.taskDefinition.taskRole);
      storageStack.manifestBucket.grantReadWrite(queueFargateService.taskDefinition.taskRole);
      webhookQueue.grantSendMessages(queueFargateService.taskDefinition.taskRole);
      webhookQueue.grantConsumeMessages(queueFargateService.taskDefinition.taskRole);
      repositoryQueue.grantConsumeMessages(queueFargateService.taskDefinition.taskRole);
      repositoryQueue.grantSendMessages(queueFargateService.taskDefinition.taskRole);
    });

    const ingestWorkerImage = ContainerImage.fromAsset('../ingest-worker', {
      ...commonBuildProps,
      file: 'docker/ingestworker.dockerfile',
    });

    // Update vulnerabilities job
    const updateVulnerabilitiesJob = new ScheduledFargateTask(context, 'UpdateVulnerabilitesJob', {
      cluster: fargateCluster,
      platformVersion: FargatePlatformVersion.LATEST,
      desiredTaskCount: 1,
      schedule: Schedule.rate(Duration.minutes(10)),
      securityGroups: [vpcDbSecurityGroup, servicesSecurityGroup],
      subnetSelection: { subnetType: SubnetType.PUBLIC },
      scheduledFargateTaskImageOptions: {
        memoryLimitMiB: 8 * 1024,
        cpu: 4 * 1024,
        image: ingestWorkerImage,
        logDriver: datadogLogDriverForService('lunatrace', 'UpdateVulnerabilitiesJob'),
        environment: {
          ...processQueueCommonEnvVars,
        },
        command: ['vulnerability', 'ingest', '--source', 'ghsa'],
        secrets: {
          LUNATRACE_GRAPHQL_SERVER_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
        },
      },
    });
    addDatadogToTaskDefinition(context, updateVulnerabilitiesJob.taskDefinition, datadogApiKeyArn);
  }
}
