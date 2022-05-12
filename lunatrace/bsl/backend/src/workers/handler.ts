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
import { generateSnapshotForRepository } from '../github/actions/generate-snapshot-for-repository';
import { createGithubWebhookInterceptor } from '../github/webhooks';
import { QueueHandlerWorkerConfig } from '../types/config';
import {
  GenerateSnapshotForRepositoryRecord,
  HandlerCallback,
  QueueHandlerType,
  S3HandlerCallback,
  S3SqsEvent,
  WebhookHandlerCallback,
} from '../types/sqs';
import { MaybeError } from '../types/util';
import { newError, newResult } from '../utils/errors';
import { log } from '../utils/log';
import { getSqsUrlFromName } from '../utils/sqs';
import { catchError, threwError } from '../utils/try';
import { isArray } from '../utils/types';

import { handleSnapshotManifest } from './generate-sbom';
import { createGithubWebhookHandler } from './github-webhook';
import { handleScanSbom } from './scan-sbom';
import { runUpdateVulnerabilities } from './upsert-vulnerabilities';

const workerConfig = getWorkerConfig();

type QueueHandlerFunc =
  | HandlerCallback<S3SqsEvent>
  | HandlerCallback<GenerateSnapshotForRepositoryRecord[]>
  | WebhookHandlerCallback;

interface QueueHandlerConfig {
  handlerFunc: QueueHandlerFunc;
}

type QueueHandlersType = Record<QueueHandlerType, QueueHandlerConfig>;

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

async function readDataFromQueue<THandler extends QueueHandlerFunc>(
  queueUrl: string,
  config: QueueHandlerWorkerConfig,
  processMessageCallback: THandler
) {
  try {
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
      const allJobs = Promise.all(
        data.Messages.map(async (message) => {
          return await log.provideFields({ sqsMetadata: data.$metadata, messageId: message.MessageId }, async () => {
            if (!message.Body) {
              log.info('Received sqs message with no message body');
              return;
            }

            const parsedBody = JSON.parse(message.Body) as Parameters<THandler>[0];
            log.debug('parsed body as ', parsedBody);

            const result = await processMessageCallback(parsedBody as never);

            if (result.error) {
              log.info('Error processing message', {
                result,
              });
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

function wrapProcessS3EventQueueJob(
  processMessageCallback: S3HandlerCallback
): (parsedBody: S3SqsEvent) => Promise<MaybeError<undefined>> {
  return async (parsedBody: S3SqsEvent) => {
    if (!parsedBody.Records) {
      log.info('No records on sqs event, deleting message, exiting');
      return newError('No records on sqs event, deleting message, exiting');
    }
    // todo: do we actually need this promise handling or should we only take the first record from any event?
    // assuming one file per object created event makes sense
    const handlerPromises = parsedBody.Records.map((record) => {
      // Executes the proper handler for whatever queue we are processing, passed in above as an argument
      return processMessageCallback({
        bucketName: record.s3.bucket.name,
        key: record.s3.object.key,
        region: record.awsRegion,
      });
    });
    const results = await Promise.all(handlerPromises);

    const errors = results.filter((result) => result.error);

    if (errors.length > 0) {
      log.error('Errors found during SQS job:', { errors });
      // TODO: (freeqaz) Handle this case by changing the visibility timeout back instead of just swallowing this.
      return newError('Errors found during SQS job');
    }

    return newResult(undefined);
  };
}

function wrapProcessRepositoryJob(
  processMessageCallback: HandlerCallback<GenerateSnapshotForRepositoryRecord>
): (parsedBody: GenerateSnapshotForRepositoryRecord[]) => Promise<MaybeError<undefined>> {
  return async (parsedBody: GenerateSnapshotForRepositoryRecord[]) => {
    if (!isArray(parsedBody) || parsedBody.length === 0) {
      log.info('No records on sqs event, deleting message, exiting');
      return newError('No records on sqs event, deleting message, exiting');
    }

    const handlerPromises = parsedBody.map((record) => {
      // Executes the proper handler for whatever queue we are processing, passed in above as an argument
      return processMessageCallback(record);
    });
    const results = await Promise.all(handlerPromises);

    const errors = results.filter((result) => result.error);

    if (errors.length > 0) {
      log.error('Errors found during SQS job:', { errors });
      // TODO: (freeqaz) Handle this case by changing the visibility timeout back instead of just swallowing this.
      return newError('Errors found during SQS job');
    }

    return newResult(undefined);
  };
}

async function loadQueueHandlers(): Promise<QueueHandlersType> {
  const webhooks = await createGithubWebhookInterceptor();

  return {
    'process-manifest': {
      handlerFunc: wrapProcessS3EventQueueJob(handleSnapshotManifest),
    },
    'process-repository': {
      handlerFunc: wrapProcessRepositoryJob(generateSnapshotForRepository),
    },
    'process-sbom': {
      handlerFunc: wrapProcessS3EventQueueJob(handleScanSbom),
    },
    'process-webhook': {
      handlerFunc: createGithubWebhookHandler(webhooks),
    },
  };
}

function determineHandler<THandler extends QueueHandlerType>(
  queueHandlers: QueueHandlersType,
  handlerName: THandler
): QueueHandlerConfig {
  if (!(handlerName in queueHandlers)) {
    throw new Error('Unknown queue handler: ' + handlerName.toString());
  }
  return queueHandlers[handlerName];
}

export async function setupQueue(): Promise<void> {
  const queueHandlerConfig = getQueueHandlerConfig();

  const queueName = queueHandlerConfig.handlerQueueName;
  log.info('setting up queue', {
    queueName: queueHandlerConfig.handlerQueueName,
  });

  const queueHandlers = await loadQueueHandlers();

  await log.provideFields({ queueName, trace: 'queue-logger' }, async () => {
    const handlerConfig = determineHandler(queueHandlers, queueHandlerConfig.handlerName as QueueHandlerType);

    const queueUrl = await catchError(getSqsUrlFromName(sqsClient, queueName));

    if (threwError(queueUrl) || queueUrl.error) {
      log.error('unable to load queue url', {
        queueName: queueName,
      });
      process.exit(-1);
    }

    log.info('Loaded queueUrl for queue', {
      queueName: queueName,
      queueUrl: queueUrl.res,
    });
    // read loop
    // eslint-disable-next-line no-constant-condition
    while (true) {
      log.info('Checking queue for messages...');
      await readDataFromQueue(queueUrl.res, queueHandlerConfig, handlerConfig.handlerFunc);
    }
  });
}

if (workerConfig.workerType === 'queue-handler') {
  void setupQueue();
} else if (workerConfig.workerType === 'job-runner') {
  // TODO: Make it much more clear that 'job-runner' means 'update-vulnerabilities'
  void runUpdateVulnerabilities();
} else {
  throw new Error(`unknown worker type: ${workerConfig.workerType}`);
}
