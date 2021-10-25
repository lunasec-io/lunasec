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
import { JsonSchemaVersion } from '@aws-cdk/aws-apigateway';
import { JsonSchemaType } from '@aws-cdk/aws-apigateway/lib/json-schema';
import * as jsonSchema from '@aws-cdk/aws-apigateway/lib/json-schema';

export const StoreMetricSchema: jsonSchema.JsonSchema = {
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
