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
import { GetQueueUrlCommand, SQSClient } from '@aws-sdk/client-sqs';

import { MaybeError } from '../types/util';

import { newError, newResult } from './errors';

export async function getSqsUrlFromName(sqsClient: SQSClient, queueName: string): Promise<MaybeError<string>> {
  const { QueueUrl: queueUrl } = await sqsClient.send(
    new GetQueueUrlCommand({
      QueueName: queueName,
    })
  );
  if (!queueUrl) {
    return newError(`unable to get queue url for queue: ${queueName}`);
  }
  return newResult(queueUrl);
}
