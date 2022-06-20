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

import { sqsClient } from '../../aws/sqs-client';
import { getQueueHandlerConfig, getWorkerBucketConfig } from '../../config';
import { SqsQueueConfig, WorkerBucketConfig } from '../../types/config';
import { MessageTypeToActivityLookup } from '../../types/sqs';
import { MaybeErrorVoid } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { loadQueueUrlOrExit } from '../../utils/sqs';

import { createActivities, processLunaTraceSqsMessage } from './queue-processors/process-luna-trace-sqs-message';
import { processS3SqsMessage } from './queue-processors/process-s3-sqs-message';

export async function startQueueWorker(): Promise<void> {
  const queueWorker = new QueueWorker();
  await queueWorker.setup();

  await queueWorker.listenForMessages();
}

class QueueWorker {
  private queueUrl?: string;
  private queueConfig: SqsQueueConfig;
  private activities: MessageTypeToActivityLookup | null;
  private bucketConfig: WorkerBucketConfig;

  constructor() {
    this.queueConfig = getQueueHandlerConfig();
    this.activities = null;
    this.bucketConfig = getWorkerBucketConfig();
  }

  async setup() {
    this.queueUrl = await loadQueueUrlOrExit(this.queueConfig.queueName);

    this.activities = await createActivities();
  }

  async deleteMessage(message: Message, queueUrl: string) {
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

  // processMessageBasedOnDataSource determines how to process a message from a queue
  async processMessageBasedOnDataSource(parsedMessage: any): Promise<MaybeErrorVoid[]> {
    if ('type' in parsedMessage) {
      // if the key 'type' is present in the message, then this message is one that we have sent from one of our services
      if (this.activities === null) {
        throw new Error('activityLookup is null. Make sure that setup was called first.');
      }
      return await processLunaTraceSqsMessage(this.activities, parsedMessage);
    } else if ('Records' in parsedMessage) {
      // if the key 'Records is present in the message, then this message came from S3
      return await processS3SqsMessage(this.bucketConfig, parsedMessage);
    } else {
      log.error('received unknown message', {
        parsedMessage,
      });
    }
    return [];
  }

  async processQueueMessage(queueUrl: string, message: Message) {
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
      const results = await this.processMessageBasedOnDataSource(parsedMessage);

      const errors = results.filter((result) => result.error);

      if (errors.length > 0) {
        log.error('Errors found during SQS job:', { errors });
        // TODO: (freeqaz) Handle this case by changing the visibility timeout back instead of just swallowing this.
        return newError('errors found during SQS job');
      }

      await this.deleteMessage(message, queueUrl);
      return newResult(`successfully processed message: ${message.MessageId}`);
    });
  }

  async listenForMessages() {
    const queueUrl = this.queueUrl;
    if (!queueUrl) {
      throw new Error('Queue url is not defined. Make sure that setup is called first.');
    }

    const queueName = this.queueConfig.queueName;
    await log.provideFields({ source: queueName }, async () => {
      // read loop
      // eslint-disable-next-line no-constant-condition
      while (true) {
        log.info('Checking queue for messages...');
        try {
          await this.readDataFromQueue(queueUrl);
        } catch (err) {
          log.error('SQS processor top level error: ', err);
          throw err;
        }
      }
    });
  }

  async readDataFromQueue(queueUrl: string) {
    const params = {
      AttributeNames: ['SentTimestamp'],
      MaxNumberOfMessages: this.queueConfig.handlerConfig.maxMessages || 10,
      MessageAttributeNames: ['All'],
      QueueUrl: this.queueUrl,
      VisibilityTimeout: this.queueConfig.handlerConfig.visibility || 60,
      WaitTimeSeconds: 5,
    };

    const data: ReceiveMessageCommandOutput = await sqsClient.send(new ReceiveMessageCommand(params));

    if (data.Messages) {
      const allJobs = Promise.all(data.Messages.map((m) => this.processQueueMessage(queueUrl, m)));

      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve('job_timeout'), 2 * 60 * 1000);
      });

      const result = await Promise.race([allJobs, timeoutPromise]);

      if (result === 'job_timeout') {
        log.error('Exceeded timeout for jobs', {
          result,
        });
      } else {
        log.info('Jobs returned successfully', {
          result,
        });
      }
      return;
    }
  }
}
