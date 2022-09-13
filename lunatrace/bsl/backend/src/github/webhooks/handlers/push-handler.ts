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

export async function pushHandler(event: EmitterWebhookEvent<'push'>) {
  const ref = event.payload.ref;
  const branchOrTagName = ref.split('/').pop();
  const defaultBranch = event.payload.repository.default_branch;
  if (branchOrTagName === defaultBranch) {
    log.info('queueing snapshot repository because of default branch commit');

    if (!event.payload.installation) {
      log.error(`no installation found in pull request webhook`);
      return;
    }

    const res = await queueRepositoryForSnapshot({
      cloneUrl: event.payload.repository.clone_url,
      gitBranch: branchOrTagName,
      repoGithubId: event.payload.repository.id,
      installationId: event.payload.installation.id,
      sourceType: 'default_branch',
      gitCommit: event.payload.after,
    });

    if (res.error) {
      log.error('failed to queue repository for snapshot', { error: res.error });
      return;
    }
    log.info('processed push hook on default branch and queued snapshot');
  }
  log.info(`skipping snapshot because push to branch ${ref} does not match default branch ${defaultBranch}`);
}
