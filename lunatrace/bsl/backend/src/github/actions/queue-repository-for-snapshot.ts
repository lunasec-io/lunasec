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
import { createNewBuild } from '../../hasura-api/actions/create-new-build';
import { updateBuildStatus } from '../../hasura-api/actions/update-build-status';
import { Build_State_Enum } from '../../hasura-api/generated';
import {
  LunaTraceRepositorySnapshotSqsMessage,
  SnapshotBuildInfo,
  SnapshotForRepositoryRequest,
} from '../../types/sqs';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { getSqsUrlFromName } from '../../utils/sqs';
import { catchError, threwError } from '../../utils/try';

export async function queueRepositoryForSnapshot(
  installationId: number,
  repoGithubId: number,
  buildInfo: SnapshotBuildInfo
) {
  // TODO: We manually banned this org. Implement a real ban system in the future
  if (installationId === 27912909) {
    return newError('Banned organization attempted a snapshot, skipping');
  }

  const buildIdResult = await createNewBuild(repoGithubId, buildInfo);
  if (buildIdResult.error) {
    log.error('Failed to create new build for snapshot request', {
      buildInfo,
    });
    return newError('Failed to create new build for snapshot request');
  }

  const req: SnapshotForRepositoryRequest = {
    ...buildInfo,
    installationId,
    repoGithubId,
    buildId: buildIdResult.res,
  };

  const repoQueueConfig = getRepositoryQueueConfig();

  const repositoryQueueUrl = await catchError(getSqsUrlFromName(repoQueueConfig.queueName));

  if (threwError(repositoryQueueUrl) || repositoryQueueUrl.error) {
    log.error('unable to load repository queue url', {
      queueName: repositoryQueueUrl,
    });
    return newError('unable to get queue url');
  }

  log.info('Queueing repository for snapshot', {
    queue: repositoryQueueUrl.res,
    req,
  });
  updateBuildStatus(buildIdResult.res, Build_State_Enum.SnapshotQueued);

  const sqsEvent: LunaTraceRepositorySnapshotSqsMessage = {
    type: 'repository-snapshot',
    records: [req],
  };

  // messages sent to this queue will be processed by the process-repository queue handler in workers/snapshot-repository.
  const result = await sqsClient.send(
    new SendMessageCommand({
      MessageBody: JSON.stringify(sqsEvent),
      MessageAttributes: {
        installation_id: {
          DataType: 'Number',
          StringValue: req.installationId.toString(),
        },
      },
      QueueUrl: repositoryQueueUrl.res,
    })
  );
  if (!result || !result.$metadata.httpStatusCode || result.$metadata.httpStatusCode >= 300) {
    log.error('unable to queue repository for snapshot', {
      req,
    });
    return newError('sending message to queue failed, responded: ' + JSON.stringify(result));
  }
  log.info('queued repository for snapshot', {
    queue: repositoryQueueUrl.res,
    req,
  });
  return newResult(undefined);
}
