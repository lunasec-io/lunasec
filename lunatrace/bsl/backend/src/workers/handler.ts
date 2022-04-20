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


import {sqsClient} from '../aws/sqs-client';
import {getQueueHandlerConfig} from '../config';
import {
  HandlerCallback,
  QueueErrorResult,
  QueueSuccessResult,
  S3HandlerCallback,
  S3SqsEvent,
  WebhookHandlerCallback
} from '../types/sqs';
import {logger} from '../utils/logger';

import {handleGenerateManifestSbom} from './generate-sbom';
import {handleGithubWebhook} from './github-webhook';
import {handleScanSbom} from './scan-sbom';

const queueHandlerConfig = getQueueHandlerConfig();

async function deleteMessage(message: Message, queueUrl: string) {
  const deleteParams = {
    QueueUrl: queueUrl,
    ReceiptHandle: message.ReceiptHandle
  };
  try {
    const data = await sqsClient.send(new DeleteMessageCommand(deleteParams));
    logger.info('Message deleted', data);
  } catch (err) {
    logger.info('Error deleting message', err);
  }
}

async function readDataFromQueue<THandler extends allQueueHandlersTypes>(queueUrl: string, queueName: allQueueHandlersTypes, processMessageCallback: typeof allQueueHandlers[THandler]) {
  try {
    const params = {
      AttributeNames: ['SentTimestamp'],
      MaxNumberOfMessages: QUEUE_MAX_MESSAGES_OVERRIDE[queueName] || 10,
      MessageAttributeNames: ['All'],
      QueueUrl: queueUrl,
      VisibilityTimeout: QUEUE_VISIBILITY_OVERRIDE[queueName] || 60,
      WaitTimeSeconds: 5
    };

    const data: ReceiveMessageCommandOutput = await sqsClient.send(new ReceiveMessageCommand(params));
    if (data.Messages) {
      const allJobs = Promise.all(
        data.Messages.map(async (message) => {
          return await logger.provideFields({sqsMetadata: data.$metadata, messageId: message.MessageId}, async () => {
            if (!message.Body) {
              logger.info('Received sqs message with no message body');
              return;
            }

            const parsedBody = JSON.parse(message.Body) as Parameters<typeof allQueueHandlers[THandler]>[0];
            logger.debug('parsed body as ', parsedBody);

            const result = await processMessageCallback(parsedBody as never);

            if (!result.success) {
              logger.info('Error processing message', result.error);
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
        logger.error('Exceeded timeout for jobs:');
      } else {
        logger.info('Jobs returned successfully:');
      }
      return;
    }
  } catch (err) {
    logger.error('SQS processor top level error: ', err);
    throw err;
  }
}

function wrapProcessQueueJob(processMessageCallback: S3HandlerCallback): (parsedBody: S3SqsEvent) => Promise<QueueSuccessResult | QueueErrorResult> {

  return async (parsedBody: S3SqsEvent) => {
    if (!parsedBody.Records) {
      logger.info('No records on sqs event, deleting message, exiting');
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
      logger.error('Errors found during SQS job:', {errors});
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

type s3QueueHandlers = 'process-manifest-queue' | 'process-sbom-queue';
type webhookQueueHandlers = 'process-webhook-queue';
type allQueueHandlersTypes = s3QueueHandlers | webhookQueueHandlers;

type S3QueueMap = {
  [key in s3QueueHandlers]: HandlerCallback<S3SqsEvent>;
};

type WebhookQueueMap = {
  [key in webhookQueueHandlers]: WebhookHandlerCallback;
};

const handlers: S3QueueMap = {
  'process-manifest-queue': wrapProcessQueueJob(handleGenerateManifestSbom),
  'process-sbom-queue': wrapProcessQueueJob(handleScanSbom)
};

const webhookHandlers: WebhookQueueMap = {
  'process-webhook-queue': handleGithubWebhook
};

const allQueueHandlers = {
  ...handlers,
  ...webhookHandlers
};

const DEFAULT_QUEUE_MAX_MESSAGES = 10;

const QUEUE_MAX_MESSAGES_OVERRIDE = {
  'process-webhook-queue': 1,
  'process-manifest-queue': DEFAULT_QUEUE_MAX_MESSAGES,
  'process-sbom-queue': DEFAULT_QUEUE_MAX_MESSAGES
}

const DEFAULT_QUEUE_VISIBILITY = 60;

const QUEUE_VISIBILITY_OVERRIDE = {
  'process-webhook-queue': DEFAULT_QUEUE_VISIBILITY * 5,
  'process-manifest-queue': DEFAULT_QUEUE_VISIBILITY,
  'process-sbom-queue': DEFAULT_QUEUE_VISIBILITY
}

function determineHandler<THandler extends allQueueHandlersTypes>(handlerName: THandler): typeof allQueueHandlers[THandler] {
  if (!(handlerName in allQueueHandlers)) {
    throw new Error('Unknown queue handler: ' + handlerName.toString());
  }
  return allQueueHandlers[handlerName];
}

export async function setupQueue(): Promise<void> {
  const queueName = queueHandlerConfig.queueName;
  await logger.provideFields({queueName, loggerName: 'queue-logger'}, async () => {
    const {QueueUrl} = await sqsClient.send(
      new GetQueueUrlCommand({
        QueueName: queueName
      })
    );
    if (!QueueUrl) {
      throw new Error('failed to get QueueUrl for queuename ');
    }
    logger.info('got queueUrl: ', QueueUrl);
    // read loop
    // eslint-disable-next-line no-constant-condition
    while (true) {
      logger.info('Checking queue for messages...');

      const handlerType = queueHandlerConfig.handlerName as allQueueHandlersTypes;
      const handler = determineHandler(handlerType);

      await readDataFromQueue(QueueUrl, handlerType, handler);
    }
  });

}

void setupQueue();
