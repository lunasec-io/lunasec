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
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  SQSClient,
} from '@aws-sdk/client-sqs';

import { app } from './app';
import { S3Object } from './types/s3';
import { S3SqsEvent } from './types/sqs';

const executionMode = process.env.EXECUTION_MODE || 'server';
const queueName = process.env.QUEUE_NAME || '';

if (typeof queueName !== 'string') {
  throw new Error('queueName is not a string');
}

const REGION = 'us-west-2';
const sqsClient: SQSClient = new SQSClient({ region: REGION });

console.log(`execution mode: ${executionMode}`);

async function readDataFromQueue(processObject: (object: S3Object) => void) {
  const strQueueName: string = queueName;

  const { QueueUrl } = await sqsClient.send(
    new GetQueueUrlCommand({
      QueueName: strQueueName,
    })
  );

  try {
    const params = {
      AttributeNames: ['SentTimestamp'],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ['All'],
      QueueUrl: QueueUrl,
      VisibilityTimeout: 60,
      WaitTimeSeconds: 5,
    };

    const data: ReceiveMessageCommandOutput = await sqsClient.send(new ReceiveMessageCommand(params));
    if (data.Messages) {
      console.log('got data from queue');
      console.log(data);

      const s3Objects: S3Object[] = data.Messages.reduce((objects, message) => {
        if (!message.Body) {
          return objects;
        }
        const parsedBody = JSON.parse(message.Body) as S3SqsEvent;
        const parsedObjects: S3Object[] = parsedBody.Records.map((record) => {
          return {
            bucketName: record.s3.bucket.name,
            key: record.s3.object.key,
          };
        });
        return [...objects, ...parsedObjects];
      }, [] as S3Object[]);

      s3Objects.forEach((object) => {
        processObject(object);
      });

      const deleteParams = {
        QueueUrl: QueueUrl,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      try {
        const data = await sqsClient.send(new DeleteMessageCommand(deleteParams));
        console.log('Message deleted', data);
      } catch (err) {
        console.log('Error', err);
      }
    }
  } catch (err) {
    console.log('Receive Error', err);
  }
}

if (executionMode === 'process-manifest-queue') {
  void (async () => {
    const processMessage = (object: S3Object) => {
      console.log(object);
    };
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await readDataFromQueue(processMessage);
    }
  })();
} else if (executionMode === 'process-sbom-queue') {
  void (async () => {
    const processMessage = (object: S3Object) => {
      console.log(object);
    };
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await readDataFromQueue(processMessage);
    }
  })();
} else {
  const port = process.env.PORT || 3002; // This port needs to be exposed to the hasura backend, via the docker-compose
  app.listen(port, () => {
    console.log('Server is running on port ', port);
  });
}
