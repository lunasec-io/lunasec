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
import { AutoScalingGroup } from '@aws-cdk/aws-autoscaling';
import { InstanceType, Vpc } from '@aws-cdk/aws-ec2';
import {
  AsgCapacityProvider,
  Cluster,
  ContainerImage,
  DeploymentControllerType,
  EcsOptimizedImage,
} from '@aws-cdk/aws-ecs';
import { NetworkLoadBalancedEc2Service } from '@aws-cdk/aws-ecs-patterns';
import { SslPolicy } from '@aws-cdk/aws-elasticloadbalancingv2';
import * as cdk from '@aws-cdk/core';
import { Construct, Duration, Stack } from '@aws-cdk/core';

interface DataDogMetrixProxyStackProps extends cdk.StackProps {
  publicBaseUrl: string;
  development?: boolean;
}

interface DataDogProxyState {
  foo: boolean;
}

export class DataDogMetricsProxyStack extends cdk.Stack implements DataDogProxyState {
  foo: true;

  constructor(scope: cdk.Construct, id: string, props: DataDogMetrixProxyStackProps) {
    super(scope, id, props);

    const stackState = DataDogMetricsProxyStack.createDataDogMetricsProxyStack(this, props);
  }

  private static createDataDogMetricsProxyStack(
    context: Construct,
    props: DataDogMetrixProxyStackProps
  ): DataDogProxyState {
    const stack = new Stack(context, 'aws-ecs-integ');

    const vpc = new Vpc(stack, 'Vpc', { maxAzs: 2 });
    const cluster = new Cluster(stack, 'Cluster', { vpc });

    const primaryProvider = new AsgCapacityProvider(stack, 'FirstCapacityProvider', {
      autoScalingGroup: new AutoScalingGroup(stack, 'FirstAutoScalingGroup', {
        vpc,
        instanceType: new InstanceType('t4g.nano'),
        machineImage: EcsOptimizedImage.amazonLinux2(),
        spotPrice: '0.0042',
      }),
      capacityProviderName: 'first-capacity-provider',
    });
    cluster.addAsgCapacityProvider(primaryProvider);

    const fallbackProvider = new AsgCapacityProvider(stack, 'SecondCapacityProvider', {
      autoScalingGroup: new AutoScalingGroup(stack, 'SecondAutoScalingGroup', {
        vpc,
        instanceType: new InstanceType('a1.medium'),
        machineImage: EcsOptimizedImage.amazonLinux2(),
        spotPrice: '0.0255',
      }),
      capacityProviderName: 'second-capacity-provider',
    });
    cluster.addAsgCapacityProvider(fallbackProvider);

    new NetworkLoadBalancedEc2Service(stack, 'datadog-metrics-proxy-ec2-service', {
      cluster,
      memoryLimitMiB: 256,
      taskImageOptions: {
        image: ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
      },
      circuitBreaker: {
        rollback: true,
      },
      assignPublicIp: true,
      redirectHTTP: true,
      sslPolicy: SslPolicy.RECOMMENDED,
      healthCheckGracePeriod: Duration.seconds(5),
      desiredCount: 2,
      memoryReservationMiB: 128,
      deploymentController: {
        type: DeploymentControllerType.ECS,
      },
      capacityProviderStrategies: [
        {
          capacityProvider: primaryProvider.capacityProviderName,
          base: 2,
          weight: 1,
        },
        {
          capacityProvider: fallbackProvider.capacityProviderName,
          base: 0,
          weight: 0,
        },
      ],
    } as any);

    return {};
  }
}
