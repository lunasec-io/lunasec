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
import { DeleteMessageCommand, Message, ReceiveMessageCommand, ReceiveMessageCommandOutput } from '@aws-sdk/client-sqs';

import { sqsClient } from '../aws/sqs-client';
import { getQueueHandlerConfig, getWorkerConfig } from '../config';
import { createGithubWebhookInterceptor } from '../github/webhooks';
import { SqsQueueConfig } from '../types/config';
import { MessageTypeToActivityLookup, QueueMessageProcessorType } from '../types/sqs';
import { log } from '../utils/log';
import { getSqsUrlFromName } from '../utils/sqs';
import { catchError, threwError } from '../utils/try';

import { processGithubWebhookActivity } from './activities/process-github-webhook-activity';
import { snapshotRepositoryActivity } from './activities/snapshot-repository-activity';
import { processLunaTraceSqsMessage } from './queue-processors/process-luna-trace-sqs-message';
import { processS3SqsMessage } from './queue-processors/process-s3-sqs-message';

const workerConfig = getWorkerConfig();

async function deleteMessage(message: Message, queueUrl: string) {
  const deleteParams = {
    QueueUrl: queueUrl,
    ReceiptHandle: message.ReceiptHandle,
  };
  try {
    const data = await sqsClient.send(new DeleteMessageCommand(deleteParams));
    log.info('Message deleted', data);
  } catch (err) {
    log.info('Error deleting message', err);
  }
}

async function loadQueueUrlFromName(queueName: string): Promise<string> {
  const queueUrl = await catchError(getSqsUrlFromName(sqsClient, queueName));

  if (threwError(queueUrl) || queueUrl.error) {
    log.error('unable to load queue url', {
      queueName: queueName,
    });
    process.exit(-1);
  }

  const loadedQueueUrl = queueUrl.res;

  log.info('Resolved url for queue', {
    queueName: queueName,
    loadedQueueUrl,
  });
  return loadedQueueUrl;
}

const createQueueMessageProcessor = (queueName: string) => (message: Message) => {
  log.info('setting up queue processor', {
    queueName,
  });

  const queueUrl = loadQueueUrlFromName(queueName);

  const loggingFields = { queueUrl, messageId: message.MessageId };

  return async (message: Message) => {
    await log.provideFields(loggingFields, async () => {
      if (!message.Body) {
        log.info('Received sqs message with no message body');
        return;
      }

      const parsedMessage = JSON.parse(message.Body);
      log.debug('received message from queue', {
        parsedMessage,
      });

      if (processorType === 's3-queue-handler') {
        await processS3SqsMessage(parsedMessage);
      } else if (processorType === 'lunatrace-queue-handler') {
        await processLunaTraceSqsMessage(parsedMessage);
      }
      await deleteMessage(message, queueUrl);
    });
  };
};

async function readDataFromQueue(queueUrl: string, config: SqsQueueConfig) {
  const params = {
    AttributeNames: ['SentTimestamp'],
    MaxNumberOfMessages: config.handlerConfig.maxMessages || 10,
    MessageAttributeNames: ['All'],
    QueueUrl: queueUrl,
    VisibilityTimeout: config.handlerConfig.visibility || 60,
    WaitTimeSeconds: 5,
  };

  const data: ReceiveMessageCommandOutput = await sqsClient.send(new ReceiveMessageCommand(params));

  const queueHandlerConfig = getQueueHandlerConfig();

  const queueMessageProcessor = createQueueMessageProcessor(queueHandlerConfig.queueName);

  if (data.Messages) {
    const allJobs = Promise.all(data.Messages.map(queueMessageProcessor));

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
}

export async function startQueueWorker(): Promise<void> {
  await log.provideFields({ queueName, trace: 'queue-logger' }, async () => {
    // read loop
    // eslint-disable-next-line no-constant-condition
    while (true) {
      log.info('Checking queue for messages...');
      try {
        await readDataFromQueue(queueHandlerConfig);
      } catch (err) {
        log.error('SQS processor top level error: ', err);
        throw err;
      }
    }
  });
}

if (workerConfig.workerType === 'queue-handler') {
  void startQueueWorker();
} else if (workerConfig.workerType === 'job-runner') {
  // TODO: Make it much more clear that 'job-runner' means 'update-vulnerabilities'
  void runUpdateVulnerabilities();
} else {
  throw new Error(`unknown worker type: ${workerConfig.workerType}`);
}
