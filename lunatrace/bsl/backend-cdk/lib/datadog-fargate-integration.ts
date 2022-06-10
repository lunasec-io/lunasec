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
import * as ecs from '@aws-cdk/aws-ecs';
import { Secret as EcsSecret, TaskDefinition } from '@aws-cdk/aws-ecs';
import { Secret } from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';
import { Construct } from '@aws-cdk/core';

/** The properties for the Datadog integration. */
export interface DataDogIntegrationProps {
  readonly datadogApiKeyArn: string;

  /**
   * The Datadog configuration parameters.
   * You might want to specify at least `DD_TAGS` and `DD_APM_ENABLED`.
   * See https://docs.datadoghq.com/agent/docker/?tab=standard
   */
  readonly environment?:
    | {
        [key: string]: string;
      }
    | undefined;

  /**
   * The logging configuration for Datadog container.
   */
  readonly logging?: ecs.LogDriver | undefined;
}

export function addDatadogToTaskDefinition(
  parent: Construct,
  taskDef: TaskDefinition,
  apiKeyArn: string,
  env?: Record<string, string>
) {
  new DatadogFargateIntegration(parent, 'DatadogAgentService', taskDef, {
    datadogApiKeyArn: apiKeyArn,
    environment: {
      DD_LOGS_ENABLED: 'true',
      DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL: 'true',
      ...env,
    },
  });
}

/** Include Datadog agent in the specified task definition. */
export class DatadogFargateIntegration extends cdk.Construct {
  constructor(parent: cdk.Construct, name: string, taskDefinition: ecs.TaskDefinition, props: DataDogIntegrationProps) {
    super(parent, name);

    if (!taskDefinition.isFargateCompatible) {
      throw new Error('Only Fargate supported');
    }

    // Datadog parameters
    const environment = {
      ECS_FARGATE: 'true',
      ...props.environment,
    };

    const datadogApiKey = Secret.fromSecretCompleteArn(this, 'DatadogApiKeySecret', props.datadogApiKeyArn);

    const datadog = taskDefinition.addContainer('dd-agent', {
      image: ecs.ContainerImage.fromRegistry('datadog/docker-dd-agent'),
      memoryLimitMiB: 256,
      logging: props.logging,
      environment,
      secrets: {
        DD_API_KEY: EcsSecret.fromSecretsManager(datadogApiKey),
      },
      essential: false,
    });

    datadog.addPortMappings({
      containerPort: 8126,
      protocol: ecs.Protocol.TCP,
    });

    datadog.addPortMappings({
      containerPort: 8125,
      protocol: ecs.Protocol.UDP,
    });
  }
}
