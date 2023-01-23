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
import * as ecs from 'aws-cdk-lib/aws-ecs';
import {
  AwsLogDriver,
  Secret as EcsSecret,
  FirelensConfigFileType,
  FirelensLogRouterType,
  LogDriver,
  LogDrivers,
  TaskDefinition,
} from 'aws-cdk-lib/aws-ecs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export function datadogLogDriverForService(source: string, service: string) {
  const datadogApiKey = process.env.DATADOG_API_KEY;
  if (!datadogApiKey) {
    throw new Error('DATADOG_API_KEY is not set in environment');
  }

  return LogDrivers.firelens({
    options: {
      dd_message_key: 'log',
      apikey: datadogApiKey,
      provider: 'ecs',
      dd_service: service,
      dd_source: source,
      Host: 'http-intake.logs.datadoghq.com',
      TLS: 'on',
      dd_tags: 'project:fluent-bit',
      Name: 'datadog',
    },
  });
}

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
  new DatadogFargateIntegration(parent, 'DatadogAgent' + taskDef.family, taskDef, {
    datadogApiKeyArn: apiKeyArn,
  });

  new DatadogIntegration(parent, 'DatadogService' + taskDef.family, taskDef);
}

export class DatadogIntegration extends Construct {
  constructor(parent: Construct, name: string, taskDefinition: ecs.TaskDefinition) {
    super(parent, name);

    taskDefinition.addFirelensLogRouter('LogRouter', {
      image: ecs.ContainerImage.fromRegistry('amazon/aws-for-fluent-bit:2.28.2'),
      essential: false,
      firelensConfig: {
        type: FirelensLogRouterType.FLUENTBIT,
        options: {
          enableECSLogMetadata: true,
          configFileValue: '/fluent-bit/configs/parse-json.conf',
          configFileType: FirelensConfigFileType.FILE,
        },
      },
      logging: new AwsLogDriver({ streamPrefix: 'firelens' }),
    });
  }
}

/** Include Datadog agent in the specified task definition. */
export class DatadogFargateIntegration extends Construct {
  constructor(parent: Construct, name: string, taskDefinition: ecs.TaskDefinition, props: DataDogIntegrationProps) {
    super(parent, name);

    if (!taskDefinition.isFargateCompatible) {
      throw new Error('Only Fargate supported');
    }

    // Datadog parameters
    const environment = {
      ECS_FARGATE: 'true',
      DD_LOGS_ENABLED: 'true',
      DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL: 'true',
      DD_ENABLE_PAYLOADS_EVENTS: 'false',
      DD_ENABLE_PAYLOADS_SERIES: 'false',
      DD_ENABLE_PAYLOADS_SERVICE_CHECKS: 'false',
      DD_ENABLE_PAYLOADS_SKETCHES: 'false',
      DD_TAGS: 'environment:production',
    };

    const datadogApiKey = Secret.fromSecretCompleteArn(this, 'DatadogApiKeySecret', props.datadogApiKeyArn);

    const datadog = taskDefinition.addContainer('dd-agent', {
      image: ecs.ContainerImage.fromRegistry('public.ecr.aws/datadog/agent:latest'),
      memoryLimitMiB: 256,
      environment,
      logging: LogDriver.awsLogs({
        streamPrefix: 'datadog',
      }),
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
