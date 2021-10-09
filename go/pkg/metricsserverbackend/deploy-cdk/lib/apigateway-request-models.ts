import {JsonSchemaVersion} from '@aws-cdk/aws-apigateway';
import {JsonSchemaType} from '@aws-cdk/aws-apigateway/lib/json-schema';
import * as jsonSchema from '@aws-cdk/aws-apigateway/lib/json-schema';

export const StoreMetricSchema: jsonSchema.JsonSchema = {
  schema: JsonSchemaVersion.DRAFT7,
  "type": JsonSchemaType.OBJECT,
  "title": "The root metrics schema",
  "required": [
    "version",
    "stack_id",
    "metrics"
  ],
  "properties": {
    "version": {
      "type": JsonSchemaType.STRING,
      "title": "The version schema"
    },
    "stack_id": {
      "type": JsonSchemaType.STRING,
      "title": "The identifier for the deployment"
    },
    "metrics": {
      "type": JsonSchemaType.OBJECT,
      "title": "The metrics schema",
      "required": [
        "tokenizeSuccess",
        "tokenizeFailure",
        "detokenizeSuccess",
        "detokenizeFailure",
        "createGrantSuccess",
        "createGrantFailure"
      ],
      "properties": {
        "tokenizeSuccess": {
          "type": JsonSchemaType.INTEGER,
        },
        "tokenizeFailure": {
          "type": JsonSchemaType.INTEGER,
        },
        "detokenizeSuccess": {
          "type": JsonSchemaType.INTEGER,
        },
        "detokenizeFailure": {
          "type": JsonSchemaType.INTEGER,
        },
        "createGrantSuccess": {
          "type": JsonSchemaType.INTEGER,
        },
        "createGrantFailure": {
          "type": JsonSchemaType.INTEGER,
        }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
};