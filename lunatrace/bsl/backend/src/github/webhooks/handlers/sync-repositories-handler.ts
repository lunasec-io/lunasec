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
import { upsertInstalledProjects } from '../../actions/upsert-installed-projects';
import { getInstallationAccessToken } from '../../auth';

// This simply calls github and upserts all repos.  We can call it in different situations where we thing the repos may have
// Not the most performant solution but it works and is simple
export async function syncRepositoriesHandler(
  event: EmitterWebhookEvent<'installation_repositories.added' | 'installation.created' | 'repository.edited'>
) {
  const installationId = event.payload.installation?.id;
  if (!installationId) {
    log.error('hook was missing installation id, aborting handler');
    return;
  }

  // Here we just refetch everything
  const upsertedRepos = await upsertInstalledProjects(installationId);
  if (upsertedRepos.error) {
    log.error('unable to create orgs and projects from github install', {
      error: upsertedRepos.msg,
    });
    return;
  }
  log.info('created orgs and projects for new repos', { upsertedRepos });
}
