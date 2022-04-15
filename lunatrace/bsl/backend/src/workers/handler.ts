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
  SQSClient,
} from '@aws-sdk/client-sqs';
import {LunaLogger} from "@lunatrace/lunatrace-common/build/main";

import { getAwsConfig, getQueueHandlerConfig } from '../config';
import { HandlerCallback, S3SqsEvent } from '../types/sqs';
import {defaultLogger} from "../utils/logger";

import { handleGenerateManifestSbom } from './generate-sbom';
import { handleScanSbom } from './scan-sbom';

const awsConfig = getAwsConfig();
const queueHandlerConfig = getQueueHandlerConfig();

const sqsClient: SQSClient = new SQSClient({ region: awsConfig.awsRegion });

async function deleteMessage(message: Message, queueUrl: string) {
  const deleteParams = {
    QueueUrl: queueUrl,
    ReceiptHandle: message.ReceiptHandle,
  };
  try {
    const data = await sqsClient.send(new DeleteMessageCommand(deleteParams));
    defaultLogger.info('Message deleted', data);
  } catch (err) {
    defaultLogger.info('Error deleting message', err);
  }
}

async function readDataFromQueue(queueUrl: string, processObjectCallback: HandlerCallback, queueLogger: LunaLogger) {
  try {
    const params = {
      AttributeNames: ['SentTimestamp'],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ['All'],
      QueueUrl: queueUrl,
      VisibilityTimeout: 60,
      WaitTimeSeconds: 5,
    };

    const data: ReceiveMessageCommandOutput = await sqsClient.send(new ReceiveMessageCommand(params));
    if (data.Messages) {
      const allJobs = Promise.all(
        data.Messages.map(async (message) => {
          const messageLogger = queueLogger.child({sqsMetadata:data.$metadata, messageId: message.MessageId})
          if (!message.Body) {
            messageLogger.info('Received sqs message with no message body');
            return;
          }
          const parsedBody = JSON.parse(message.Body) as S3SqsEvent;
          messageLogger.debug('parsed body as ', parsedBody);

          if (!parsedBody.Records) {
            messageLogger.info('No records on sqs event, deleting message, exiting');
            return deleteMessage(message, queueUrl);
          }
          // todo: do we actually need this promise handling or should we only take the first record from any event? assuming one file per object created event makes sense
          const handlerPromises = parsedBody.Records.map((record) => {
            // Executes the proper handler for whatever queue we are processing, passed in above as an argument
            return processObjectCallback({
              bucketName: record.s3.bucket.name,
              key: record.s3.object.key,
              region: record.awsRegion,
            }, messageLogger);
          });
          const results = await Promise.all(handlerPromises);

          const errors = results.filter((result) => result.success === false);

          if (errors.length > 0) {
            messageLogger.error('Errors found during SQS job:', { errors });
            // TODO: (freeqaz) Handle this case by changing the visibility timeout back instead of just swallowing this.
            return;
          }

          await deleteMessage(message, queueUrl);
        })
      );

      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve('job_timeout'), 2 * 60 * 1000);
      });

      const result = await Promise.race([allJobs, timeoutPromise]);

      if (result === 'job_timeout') {
        defaultLogger.error('Exceeded timeout for jobs:', data.Messages);
      } else {
        defaultLogger.info('Jobs returned successfully:', data.Messages);
      }
      return;
    }
  } catch (err) {
    defaultLogger.error('SQS processor top level error: ', err);
    throw err;
  }
}

const handlers: Record<string, HandlerCallback> = {
  'process-manifest-queue': handleGenerateManifestSbom,
  'process-sbom-queue': handleScanSbom,
};

function determineHandler(): HandlerCallback {
  const handlerName = queueHandlerConfig.handlerName;
  if (!(handlerName in handlers)) {
    throw new Error('Unknown queue handler: ' + handlerName);
  }
  return handlers[handlerName];
}

export async function setupQueue(): Promise<void> {
  const queueName = queueHandlerConfig.queueName;
  const queueLogger = defaultLogger.child({queueName,  loggerName: "queue-logger"})
  const { QueueUrl } = await sqsClient.send(
    new GetQueueUrlCommand({
      QueueName: queueName,
    })
  );
  if (!QueueUrl) {
    throw new Error('failed to get QueueUrl for queuename ');
  }
  queueLogger.info('got queueUrl: ', QueueUrl);
  // read loop
  // eslint-disable-next-line no-constant-condition
  while (true) {
    queueLogger.info('Checking queue for messages...');
    await readDataFromQueue(QueueUrl, determineHandler(), queueLogger);
  }
}

void setupQueue();
