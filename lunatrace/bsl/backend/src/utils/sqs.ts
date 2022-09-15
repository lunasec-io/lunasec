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
import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';

import { sqsClient } from '../aws/sqs-client';
import { MaybeError } from '../types/util';

import { newError, newResult } from './errors';
import { log } from './log';
import { catchError, threwError } from './try';

// Queue Name cache, a cache of promises that will resolve to the name. The first request gets put into the cache
// and subsequent calls return that
// If the queueName ever changes we are in trouble but it shouldn't
const cache: { [queueName: string]: Promise<string | undefined> } = {};

export async function getSqsUrlPromise(queueName: string): Promise<string | undefined> {
  if (Object.keys(cache).includes(queueName)) {
    return cache[queueName];
  }
  log.info('cache miss looking for queue url, fetching from AWS', { queueName });
  const awsResPromise = sqsClient.send(
    new GetQueueUrlCommand({
      QueueName: queueName,
    })
  );

  const queueNamePromise = awsResPromise.then((res) => {
    log.info('AWS Responded to request for queueUrl', { res });
    return res.QueueUrl;
  });
  cache[queueName] = queueNamePromise;
  return queueNamePromise;
}

// wraps the above promise in the error handler pattern for easier parsing.
export async function getSqsUrlFromName(queueName: string): Promise<MaybeError<string>> {
  const queueUrl = await getSqsUrlPromise(queueName);
  if (!queueUrl) {
    return newError('Failed to retrieve queue url from aws using queue name');
  }
  return newResult(queueUrl);
}

export async function loadQueueUrlOrExit(queueName: string): Promise<string> {
  const queueUrl = await catchError(getSqsUrlFromName(queueName));

  if (threwError(queueUrl) || queueUrl.error) {
    log.error('unable to load queue url', {
      queueName: queueName,
    });
    process.exit(1);
  }

  return queueUrl.res;
}
