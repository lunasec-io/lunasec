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
import { SecurityGroup, SubnetType } from 'aws-cdk-lib/aws-ec2';
import {
  CapacityProviderStrategy,
  Cluster,
  ContainerImage,
  DeploymentControllerType,
  Secret as EcsSecret,
} from 'aws-cdk-lib/aws-ecs';
import {
  ApplicationLoadBalancedFargateService,
  QueueProcessingFargateServiceProps,
} from 'aws-cdk-lib/aws-ecs-patterns';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

import { QueueProcessingFargateService } from './aws/queue-processing-fargate-service';
import { commonBuildProps } from './constants';
import { addDatadogToTaskDefinition, datadogLogDriverForService } from './datadog-fargate-integration';
import { WorkerStorageStackState } from './worker-storage-stack';

interface WorkerStackProps extends cdk.StackProps {
  fargateCluster: Cluster;
  fargateService: ApplicationLoadBalancedFargateService;
  publicHasuraServiceUrl: string;
  gitHubAppId: string;
  nodeEnvVars: Record<string, string>;
  nodeSecrets: Record<string, EcsSecret>;
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
  constructor(scope: Construct, id: string, props: WorkerStackProps) {
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
      nodeEnvVars,
      nodeSecrets,
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
      throw new Error(`expected non-null storage stack queues: ${storageStack}`);
    }

    const workerContainerImage = ContainerImage.fromAsset('../backend', {
      ...commonBuildProps,
      target: 'backend-queue-processor',
    });

    const golangWorkerImage = ContainerImage.fromAsset('../ingest-worker', {
      ...commonBuildProps,
      file: 'docker/queuehandler.dockerfile',
    });

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

    const staticAnalysisScalingSteps = [
      { upper: 0, change: -1 },
      { lower: 20, change: +1 },
      { lower: 100, change: +5 },
    ];

    const queueServices: QueueService[] = [
      {
        // TODO (cthompson) mount EFS to make available storage larger
        name: 'ProcessRepositoryQueue',
        queue: repositoryQueue,
        visibility: 600,
        ram: 8 * gb,
        cpu: 4 * gb,
        capacityProviderStrategies,
        scalingSteps,
      },
      {
        name: 'StaticAnalysisQueue',
        queue: staticAnalysisQueue,
        image: golangWorkerImage,
        visibility: 600,
        ram: 8 * gb,
        cpu: 4 * gb,
        capacityProviderStrategies,
        scalingSteps: staticAnalysisScalingSteps,
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
        ram: 8 * gb,
        cpu: 4 * gb,
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
          ...nodeEnvVars,
          ...(visibility ? { QUEUE_VISIBILITY: visibility.toString() } : {}),
          REDEPLOY: '1',
        },
        securityGroups: [vpcDbSecurityGroup, servicesSecurityGroup],
        secrets: nodeSecrets,
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
      storageStack.codeBucket.grantReadWrite(queueFargateService.taskDefinition.taskRole);
      webhookQueue.grantSendMessages(queueFargateService.taskDefinition.taskRole);
      webhookQueue.grantConsumeMessages(queueFargateService.taskDefinition.taskRole);
      repositoryQueue.grantConsumeMessages(queueFargateService.taskDefinition.taskRole);
      repositoryQueue.grantSendMessages(queueFargateService.taskDefinition.taskRole);
      staticAnalysisQueue.grantConsumeMessages(queueFargateService.taskDefinition.taskRole);
      staticAnalysisQueue.grantSendMessages(queueFargateService.taskDefinition.taskRole);
    });
  }
}
