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
import {
  DeleteMessageCommand,
  GetQueueUrlCommand,
  Message,
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
} from '@aws-sdk/client-sqs';


import { sqsClient } from '../aws/sqs-client';
import { getQueueHandlerConfig } from '../config';
import {createGithubWebhookInterceptor, WebhookInterceptor} from "../github/webhook-cache";
import {QueueHandlerWorkerConfig} from "../types/config";
import {
  GenerateSnapshotForRepositoryEvent,
  GenerateSnapshotForRepositoryRecord,
  HandlerCallback,
  QueueErrorResult,
  QueueHandlerType,
  QueueSuccessResult,
  S3HandlerCallback,
  S3SqsEvent, WebhookHandlerCallback,
} from '../types/sqs';
import {log} from '../utils/log';
import {getSqsUrlFromName} from "../utils/sqs";

import {handleSnapshotManifest} from "./generate-sbom";
import {createGithubWebhookHandler} from "./github-webhook";
import {handleScanSbom} from "./scan-sbom";
import {handleSnapshotRepository} from "./snapshot-repository";

const queueHandlerConfig = getQueueHandlerConfig();

type QueueHandlerFunc = HandlerCallback<S3SqsEvent> | HandlerCallback<GenerateSnapshotForRepositoryEvent> | WebhookHandlerCallback;
type QueueHandlersType = Record<QueueHandlerType, QueueHandlerFunc>;

async function deleteMessage(message: Message, queueUrl: string) {
  const deleteParams = {
    QueueUrl: queueUrl,
    ReceiptHandle: message.ReceiptHandle
  };
  try {
    const data = await sqsClient.send(new DeleteMessageCommand(deleteParams));
    log.info('Message deleted', data);
  } catch (err) {
    log.info('Error deleting message', err);
  }
}

async function readDataFromQueue<THandler extends QueueHandlerFunc>(queueUrl: string, config: QueueHandlerWorkerConfig, processMessageCallback: THandler) {
  try {
    const params = {
      AttributeNames: ['SentTimestamp'],
      MaxNumberOfMessages: config.handlerConfig.maxMessages || 10,
      MessageAttributeNames: ['All'],
      QueueUrl: queueUrl,
      VisibilityTimeout: config.handlerConfig.visibility || 60,
      WaitTimeSeconds: 5
    };

    const data: ReceiveMessageCommandOutput = await sqsClient.send(new ReceiveMessageCommand(params));
    if (data.Messages) {
      const allJobs = Promise.all(
        data.Messages.map(async (message) => {
        return await log.provideFields({sqsMetadata:data.$metadata, messageId: message.MessageId}, async () => {
            if (!message.Body) {
            log.info('Received sqs message with no message body');
              return;
            }

            const parsedBody = JSON.parse(message.Body) as Parameters<THandler>[0];
            log.debug('parsed body as ', parsedBody);

            const result = await processMessageCallback(parsedBody as never);

            if (!result.success) {
              log.info('Error processing message', result.error);
              return;
            }

            await deleteMessage(message, queueUrl);
          });
        })
      );

      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve('job_timeout'), 2 * 60 * 1000);
      });

      const result = await Promise.race([allJobs, timeoutPromise]);

      if (result === 'job_timeout') {
        log.error('Exceeded timeout for jobs:');
      } else {
        log.info('Jobs returned successfully:');
      }
      return;
    }
  } catch (err) {
    log.error('SQS processor top level error: ', err);
    throw err;
  }
}

function wrapProcessS3EventQueueJob(processMessageCallback: S3HandlerCallback): (parsedBody: S3SqsEvent) => Promise<QueueSuccessResult | QueueErrorResult> {
  return async (parsedBody: S3SqsEvent) => {
    if (!parsedBody.Records) {
      log.info('No records on sqs event, deleting message, exiting');
      return {
        success: false,
        error: new Error('No records on sqs event, deleting message, exiting')
      };
    }
    // todo: do we actually need this promise handling or should we only take the first record from any event?
    // assuming one file per object created event makes sense
    const handlerPromises = parsedBody.Records.map((record) => {
      // Executes the proper handler for whatever queue we are processing, passed in above as an argument
      return processMessageCallback({
        bucketName: record.s3.bucket.name,
        key: record.s3.object.key,
        region: record.awsRegion
      });
    });
    const results = await Promise.all(handlerPromises);

    const errors = results.filter((result) => !result.success);

    if (errors.length > 0) {
      log.error('Errors found during SQS job:', {errors});
      // TODO: (freeqaz) Handle this case by changing the visibility timeout back instead of just swallowing this.
      return {
        success: false,
        error: new Error('Errors found during SQS job')
      };
    }

    return {
      success: true
    };
  };
}

function wrapProcessRepositoryJob(processMessageCallback: HandlerCallback<GenerateSnapshotForRepositoryRecord>): (parsedBody: GenerateSnapshotForRepositoryEvent) => Promise<QueueSuccessResult | QueueErrorResult> {
  return async (parsedBody: GenerateSnapshotForRepositoryEvent) => {
    if (!parsedBody.Records) {
      log.info('No records on sqs event, deleting message, exiting');
      return {
        success: false,
        error: new Error('No records on sqs event, deleting message, exiting')
      };
    }
    // todo: do we actually need this promise handling or should we only take the first record from any event?
    // assuming one file per object created event makes sense
    const handlerPromises = parsedBody.Records.map((record) => {
      // Executes the proper handler for whatever queue we are processing, passed in above as an argument
      return processMessageCallback(record);
    });
    const results = await Promise.all(handlerPromises);

    const errors = results.filter((result) => !result.success);

    if (errors.length > 0) {
      log.error('Errors found during SQS job:', {errors});
      // TODO: (freeqaz) Handle this case by changing the visibility timeout back instead of just swallowing this.
      return {
        success: false,
        error: new Error('Errors found during SQS job')
      };
    }

    return {
      success: true
    };
  };
}

async function loadQueueHandlers(): Promise<QueueHandlersType> {
  const webhooks = await createGithubWebhookInterceptor();

  return {
    'process-manifest': wrapProcessS3EventQueueJob(handleSnapshotManifest),
    'process-repository': wrapProcessRepositoryJob(handleSnapshotRepository),
    'process-sbom': wrapProcessS3EventQueueJob(handleScanSbom),
    'process-webhook': createGithubWebhookHandler(webhooks),
  }
}

function determineHandler<THandler extends QueueHandlerType>(queueHandlers: QueueHandlersType, handlerName: THandler): QueueHandlerFunc {
  if (!(handlerName in queueHandlers)) {
    throw new Error('Unknown queue handler: ' + handlerName.toString());
  }
  return queueHandlers[handlerName];
}

export async function setupQueue(): Promise<void> {
  const queueName = queueHandlerConfig.handlerQueueName;
  const queueHandlers = await loadQueueHandlers();

  await log.provideFields({queueName, loggerName: 'queue-logger'}, async () => {
    const handler = determineHandler(queueHandlers, queueHandlerConfig.handlerName as QueueHandlerType);

    const queueUrl = await getSqsUrlFromName(sqsClient, queueName);

    log.info('got queueUrl: ', queueUrl);
    // read loop
    // eslint-disable-next-line no-constant-condition
    while (true) {
      log.info('Checking queue for messages...');
      await readDataFromQueue(queueUrl, queueHandlerConfig, handler);
    }
  });

}

void setupQueue();
