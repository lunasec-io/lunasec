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
import { EmitterWebhookEvent } from '@octokit/webhooks';

import { log } from '../../../utils/log';
import { queueRepositoryForSnapshot } from '../../actions/queue-repository-for-snapshot';

export async function pullRequestHandler(event: EmitterWebhookEvent<'pull_request'>) {
  const actionName = event.payload.action;

  if (actionName === 'synchronize' || actionName === 'opened' || actionName === 'reopened') {
    if (!event.payload.installation) {
      log.error(`no installation found in pull request webhook`);
      return;
    }

    log.info('snapshotting repository for pull request');

    const res = await queueRepositoryForSnapshot(event.payload.installation.id, {
      cloneUrl: event.payload.repository.clone_url,
      gitBranch: event.payload.pull_request.head.ref, // TODO make this the human readable branch name, not the ref
      repoGithubId: event.payload.repository.id,
      installationId: event.payload.installation.id,
      sourceType: 'pr',
      pullRequestId: event.payload.pull_request.node_id,
      gitCommit: event.payload.pull_request.head.sha,
    });

    if (res.error) {
      log.error('failed to queue repository for snapshot');
      return;
    }
    log.info('processed pull request');
  }
}
