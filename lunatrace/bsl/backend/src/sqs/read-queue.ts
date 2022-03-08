import {
  DeleteMessageCommand,
  GetQueueUrlCommand,
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  SQSClient,
} from '@aws-sdk/client-sqs';

import { S3ObjectMetadata } from '../types/s3';
import { S3SqsEvent } from '../types/sqs';

const queueName = process.env.QUEUE_NAME || '';

if (typeof queueName !== 'string') {
  throw new Error('queueName is not a string');
}

const REGION = 'us-west-2';
const sqsClient: SQSClient = new SQSClient({ region: REGION });

export async function readDataFromQueue(processObjectCallback: (object: S3ObjectMetadata) => Promise<void>) {
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

      const s3Objects: S3ObjectMetadata[] = data.Messages.reduce((objects, message) => {
        if (!message.Body) {
          return objects;
        }
        const parsedBody = JSON.parse(message.Body) as S3SqsEvent;
        const parsedObjects: S3ObjectMetadata[] = parsedBody.Records.map((record) => {
          return {
            bucketName: record.s3.bucket.name,
            key: record.s3.object.key,
            region: record.awsRegion,
          };
        });
        return [...objects, ...parsedObjects];
      }, [] as S3ObjectMetadata[]);

      s3Objects.forEach((object) => {
        void processObjectCallback(object);
      });

      const deleteParams = {
        QueueUrl: QueueUrl,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      try {
        const data = await sqsClient.send(new DeleteMessageCommand(deleteParams));
        console.log('Message deleted', data);
      } catch (err) {
        console.log('Error deleting message', err);
      }
    }
  } catch (err) {
    console.log('SQS processor top level error: ', err);
  }
}
