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
import { TaskDefinition } from '@aws-cdk/aws-ecs';
import { Construct } from '@aws-cdk/core';
import { DatadogFargateIntegration } from 'aws-cdk-datadog-ecs-integration';

export function addDatadogToTaskDefinition(
  parent: Construct,
  taskDef: TaskDefinition,
  apiKeyPath: string,
  env?: Record<string, string>
) {
  new DatadogFargateIntegration(parent, 'DatadogAgentService', taskDef, {
    datadogApiKey: apiKeyPath,
    environment: {
      DD_LOGS_ENABLED: 'true',
      DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL: 'true',
      ...env,
    },
  });
}
