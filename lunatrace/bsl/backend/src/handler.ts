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
import { Callback, Context, SQSEvent } from 'aws-lambda';
import { SQS } from 'aws-sdk';

type LambdaEnvironment = 'stubbed' | 'localstack' | 'prod';

const lambdaEnv: LambdaEnvironment = (process.env.LAMBDA_ENV as LambdaEnvironment) || 'stubbed';

const sbomEtlActions = ['uploadSbom', 'scanSbom'] as const;
type SbomEtlActionTuple = typeof sbomEtlActions;
type SbomEtlAction = SbomEtlActionTuple[number];

const queueUrlForAction: Record<SbomEtlAction, string> = {
  uploadSbom: process.env.UPLOAD_SBOM_SQS_QUEUE || '',
  scanSbom: process.env.SCAN_SBOM_SQS_QUEUE || '',
};

interface SbomEtlMessage {
  action: SbomEtlAction;
}

interface SbomEtlMessageUpload extends SbomEtlMessage {
  action: 'uploadSbom';
  projectId: string;
}

interface SbomEtlMessageScan extends SbomEtlMessage {
  action: 'scanSbom';
  sbomUrl: string;
}

function handleUploadSbom(msg: SbomEtlMessageUpload) {
  // TODO: handle sbom upload
  console.log(`hello from handleUploadSbom: ${msg.projectId}`);
  return;
}

function handleScanSbom(msg: SbomEtlMessageScan) {
  // TODO: handle sbom scan
  console.log(`hello from handleScanSbom: ${msg.sbomUrl}`);
  return;
}

// eslint-disable-next-line @typescript-eslint/require-await
async function processMessage(record: DequeuedMessage): Promise<void> {
  if (record.message.action === 'uploadSbom') {
    const msg: SbomEtlMessageUpload = record.message as SbomEtlMessageUpload;
    return handleUploadSbom(msg);
  }
  if (record.message.action === 'scanSbom') {
    const msg: SbomEtlMessageScan = record.message as SbomEtlMessageScan;
    return handleScanSbom(msg);
  }

  console.error(`unable to handle record from sqs. unknown message action: ${record.message.action}`);
}

interface DequeuedMessage {
  id: string;
  receiptHandle: string;
  message: SbomEtlMessage;
}

export class BaseError extends Error {
  constructor(error: unknown = {}) {
    super(JSON.stringify(error));
  }
}

export class NonRetriableError extends BaseError {}
export class PartialFailureError extends BaseError {}

const sqsClient = new SQS({
  region: process.env.AWS_REGION || 'us-west-2',
});

async function deleteMessagesForQueue(queueUrl: string, deleteMessageRequests: DequeuedMessage[]): Promise<void> {
  if (deleteMessageRequests.length <= 0) {
    return;
  }

  const result = await sqsClient
    .deleteMessageBatch({
      QueueUrl: queueUrl,
      Entries: deleteMessageRequests.map((m) => ({
        Id: m.id,
        ReceiptHandle: m.receiptHandle,
      })),
    })
    .promise();

  if (result.Failed.length > 0) {
    throw new Error('Unable to delete messages from queue.');
  }
}

async function deleteMessages(deleteMessageRequests: DequeuedMessage[]): Promise<void> {
  if (lambdaEnv === 'stubbed') {
    console.log(`lambda is running in stubbed mode. number of messages to be deleted: ${deleteMessageRequests.length}`);
    return;
  }

  const promises = sbomEtlActions.map(async (action) => {
    const requestsForAction = deleteMessageRequests.filter((req) => req.message.action === action);
    const queueUrl = queueUrlForAction[action];
    return deleteMessagesForQueue(queueUrl, requestsForAction);
  });
  await Promise.all(promises);
}

function makeBlockingStream(stream: any) {
  if (!stream || !stream._handle || !stream._handle.setBlocking) {
    // Not able to set blocking so just bail out
    return;
  }

  stream._handle.setBlocking(true);
}

export async function handler(event: SQSEvent) {
  makeBlockingStream(process.stdout);
  makeBlockingStream(process.stderr);

  const dequeuedMessages: DequeuedMessage[] = event.Records.map((record) => {
    const message: SbomEtlMessage = JSON.parse(record.body);
    return {
      id: record.messageId,
      receiptHandle: record.receiptHandle,
      message,
    };
  });

  const messagesToDelete: DequeuedMessage[] = [];

  const promises = dequeuedMessages.map(async (message) => {
    try {
      await processMessage(message);
      messagesToDelete.push(message);
    } catch (error) {
      if (error instanceof NonRetriableError) {
        messagesToDelete.push(message);
        console.error('Processing message', message, 'caused a non retriable error. Error:', error);
      } else {
        console.error('Processing message', message, 'caused a retriable error. Error:', error);
      }
    }
  });
  await Promise.all(promises);

  const numRetriableMessages = dequeuedMessages.length - messagesToDelete.length;
  if (numRetriableMessages > 0) {
    await deleteMessages(messagesToDelete);

    const errorMessage = `Failing due to ${numRetriableMessages} unsuccessful and retriable errors.`;

    throw new PartialFailureError(errorMessage);
  }
}
