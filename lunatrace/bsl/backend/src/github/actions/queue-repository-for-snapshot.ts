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
import { SendMessageCommand } from '@aws-sdk/client-sqs';

import { sqsClient } from '../../aws/sqs-client';
import { getRepositoryQueueConfig } from '../../config';
import { LunaTraceRepositorySnapshotSqsMessage, SnapshotForRepositoryRequest } from '../../types/sqs';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { getSqsUrlFromName } from '../../utils/sqs';
import { catchError, threwError } from '../../utils/try';

export async function queueRepositoryForSnapshot(repo: SnapshotForRepositoryRequest) {
  // TODO: We manually banned this org. Implement a real ban system in the future
  if (repo.installationId === 27912909) {
    return newError('Banned organization attempted a snapshot, skipping');
  }

  const repoQueueConfig = getRepositoryQueueConfig();

  // TODO (cthompson) move this outside of this function, this should only need to be called once
  // note (forrest): I made this returned cached values so at least it is performant now, this is perfectly, 100% fine
  const repositoryQueueUrl = await catchError(getSqsUrlFromName(repoQueueConfig.queueName));

  if (threwError(repositoryQueueUrl) || repositoryQueueUrl.error) {
    log.error('unable to load repository queue url', {
      queueName: repositoryQueueUrl,
    });
    return newError('unable to get queue url');
  }

  log.info('queueing repository for snapshot', {
    repo,
  });

  const sqsEvent: LunaTraceRepositorySnapshotSqsMessage = {
    type: 'repository-snapshot',
    records: [repo],
  };

  // messages sent to this queue will be processed by the process-repository queue handler in workers/snapshot-repository.
  const result = await sqsClient.send(
    new SendMessageCommand({
      MessageBody: JSON.stringify(sqsEvent),
      MessageAttributes: {
        installation_id: {
          DataType: 'Number',
          StringValue: repo.installationId.toString(),
        },
      },
      QueueUrl: repositoryQueueUrl.res,
    })
  );
  if (!result || !result.$metadata.httpStatusCode || result.$metadata.httpStatusCode >= 300) {
    log.error('unable to queue repository for snapshot', {
      repo,
    });
    return newError('sending message to queue failed, responded: ' + JSON.stringify(result));
  }
  log.info('queued repo for snapshot', {
    repo,
  });
  return newResult(undefined);
}
