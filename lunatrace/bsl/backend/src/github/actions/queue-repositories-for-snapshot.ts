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
import { SendMessageCommand, SendMessageCommandOutput } from '@aws-sdk/client-sqs';

import { sqsClient } from '../../aws/sqs-client';
import { getRepositoryQueueConfig } from '../../config';
import { LunaTraceRepositorySnapshotSqsMessage, SnapshotForRepositoryRequest } from '../../types/sqs';
import { MaybeError, MaybeErrorVoid } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { getSqsUrlFromName } from '../../utils/sqs';
import { catchError, threwError } from '../../utils/try';

export async function queueRepositoriesForSnapshot(
  installationId: number,
  records: SnapshotForRepositoryRequest[]
): Promise<MaybeErrorVoid> {
  const repoQueueConfig = getRepositoryQueueConfig();
  // TODO (cthompson) move this outside of this function, this should only need to be called once
  // note (forrest): I made this returned cached values so at least it is performant now
  const repositoryQueueUrl = await catchError(getSqsUrlFromName(sqsClient, repoQueueConfig.queueName));

  if (threwError(repositoryQueueUrl) || repositoryQueueUrl.error) {
    log.error('unable to load repository queue url', {
      queueName: repositoryQueueUrl,
    });
    return newError('unable to get queue url');
  }

  log.info('queueing repositories for snapshot', {
    records,
  });

  const sqsEvent: LunaTraceRepositorySnapshotSqsMessage = {
    type: 'repository-snapshot',
    records,
  };

  // messages sent to this queue will be processed by the process-repository queue handler in workers/snapshot-repository.
  const result = await sqsClient.send(
    new SendMessageCommand({
      MessageBody: JSON.stringify(sqsEvent),
      MessageAttributes: {
        installation_id: {
          DataType: 'Number',
          StringValue: installationId.toString(),
        },
      },
      QueueUrl: repositoryQueueUrl.res,
    })
  );
  if (!result || !result.$metadata.httpStatusCode || result.$metadata.httpStatusCode >= 300) {
    return newError('sending message to queue failed, responded: ' + JSON.stringify(result));
  }
  log.info(records, 'queued repositories for snapshot');
  return newResult(undefined);
}