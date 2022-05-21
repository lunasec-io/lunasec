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
import { getQueueHandlerConfig } from '../config';
import { SqsQueueConfig } from '../types/config';
import { MaybeError, MaybeErrorVoid } from '../types/util';
import { newError, newResult } from '../utils/errors';
import { log } from '../utils/log';
import { getSqsUrlFromName } from '../utils/sqs';
import { catchError, threwError } from '../utils/try';

import { processLunaTraceSqsMessage } from './queue-processors/process-luna-trace-sqs-message';
import { processS3SqsMessage } from './queue-processors/process-s3-sqs-message';

async function deleteMessage(message: Message, queueUrl: string) {
  const deleteParams = {
    QueueUrl: queueUrl,
    ReceiptHandle: message.ReceiptHandle,
  };
  try {
    const data = await sqsClient.send(new DeleteMessageCommand(deleteParams));
    log.info('Message deleted', data);
  } catch (err) {
    log.error('Error deleting message', err);
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

async function processMessageAndReturnResults(parsedMessage: any): Promise<MaybeErrorVoid[]> {
  if ('type' in parsedMessage) {
    // if the key 'type' is present in the message, then this message is one that we have sent from one of our services
    return await processLunaTraceSqsMessage(parsedMessage);
  } else if ('Records' in parsedMessage) {
    // if the key 'Records is present in the message, then this message came from S3
    return await processS3SqsMessage(parsedMessage);
  } else {
    log.error('received unknown message', {
      parsedMessage,
    });
  }
  return [];
}

async function processQueueMessage(queueUrl: string, message: Message) {
  await log.provideFields({ messageId: message.MessageId }, async () => {
    if (!message.Body) {
      log.info('Received sqs message with no message body');
      return;
    }

    const parsedMessage = JSON.parse(message.Body);
    log.debug('received message from queue', {
      parsedMessage,
    });

    // Attempt to determine what message processor to use for the provided message
    const results = await processMessageAndReturnResults(parsedMessage);

    const errors = results.filter((result) => result.error);

    if (errors.length > 0) {
      log.error('Errors found during SQS job:', { errors });
      // TODO: (freeqaz) Handle this case by changing the visibility timeout back instead of just swallowing this.
      return newError('Errors found during SQS job');
    }

    return newResult(undefined);

    await deleteMessage(message, queueUrl);
  });
}

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

  if (data.Messages) {
    const allJobs = Promise.all(data.Messages.map((m) => processQueueMessage(queueUrl, m)));

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
  const queueConfig = getQueueHandlerConfig();
  const queueUrl = await loadQueueUrlFromName(queueConfig.queueName);

  await log.provideFields({ queueName: queueConfig.queueName, trace: 'queue-logger' }, async () => {
    // read loop
    // eslint-disable-next-line no-constant-condition
    while (true) {
      log.info('Checking queue for messages...');
      try {
        await readDataFromQueue(queueUrl, queueConfig);
      } catch (err) {
        log.error('SQS processor top level error: ', err);
        throw err;
      }
    }
  });
}
