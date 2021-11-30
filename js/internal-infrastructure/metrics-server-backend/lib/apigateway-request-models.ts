/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { JsonSchemaType, JsonSchemaVersion } from '@aws-cdk/aws-apigateway';
import * as jsonSchema from '@aws-cdk/aws-apigateway/lib/json-schema';

export const StoreDeploymentMetricSchema: jsonSchema.JsonSchema = {
  schema: JsonSchemaVersion.DRAFT7,
  type: JsonSchemaType.OBJECT,
  title: 'The root metrics schema',
  required: ['version', 'stack_id', 'metrics'],
  properties: {
    version: {
      type: JsonSchemaType.STRING,
      title: 'The version schema',
    },
    stack_id: {
      type: JsonSchemaType.STRING,
      title: 'The identifier for the deployment',
    },
    metrics: {
      type: JsonSchemaType.OBJECT,
      title: 'The metrics schema',
      required: [
        'tokenizeSuccess',
        'tokenizeFailure',
        'detokenizeSuccess',
        'detokenizeFailure',
        'createGrantSuccess',
        'createGrantFailure',
      ],
      properties: {
        tokenizeSuccess: {
          type: JsonSchemaType.INTEGER,
        },
        tokenizeFailure: {
          type: JsonSchemaType.INTEGER,
        },
        detokenizeSuccess: {
          type: JsonSchemaType.INTEGER,
        },
        detokenizeFailure: {
          type: JsonSchemaType.INTEGER,
        },
        createGrantSuccess: {
          type: JsonSchemaType.INTEGER,
        },
        createGrantFailure: {
          type: JsonSchemaType.INTEGER,
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export const StoreCliMetricSchema: jsonSchema.JsonSchema = {
  schema: JsonSchemaVersion.DRAFT7,
  type: JsonSchemaType.OBJECT,
  title: 'The metrics schema for CLI analytics',
  required: ['version', 'command', 'success'],
  properties: {
    version: {
      type: JsonSchemaType.STRING,
      title: 'The version schema',
    },
    command: {
      type: JsonSchemaType.STRING,
      title: 'The CLI command run by the user.',
    },
    env: {
      type: JsonSchemaType.STRING,
      title: 'Environment that the CLI is setting up.',
    },
    user_id: {
      type: JsonSchemaType.STRING,
      title: 'An anonymous identifier for user running the cli.',
    },
    success: {
      type: JsonSchemaType.BOOLEAN,
      title: 'True or false for if the command was completed successfully.',
    },
    error_message: {
      type: JsonSchemaType.STRING,
      title: 'Error message returned by running the CLI command.',
    },
    system_info: {
      type: JsonSchemaType.OBJECT,
      title: 'System information reported from the CLI.',
      required: ['docker_version', 'docker_compose_version', 'node_version', 'host_platform', 'host_release'],
      properties: {
        docker_version: {
          type: JsonSchemaType.STRING,
          title: 'Version of docker used on host machine.',
        },
        docker_compose_version: {
          type: JsonSchemaType.STRING,
          title: 'Version of docker compose used on the host machine.',
        },
        node_version: {
          type: JsonSchemaType.STRING,
          title: 'Version of node used on the host machine.',
        },
        host_platform: {
          type: JsonSchemaType.STRING,
          title: 'Operating system the CLI is being run on.',
        },
        host_release: {
          type: JsonSchemaType.STRING,
          title: 'The release of the operating system the CLI is being run on.',
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};
