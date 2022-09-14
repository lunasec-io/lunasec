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
import { installOrganizationFromGithub } from '../../actions/install-organization-from-github';

export async function installationHandler(event: EmitterWebhookEvent<'installation'>) {
  const action = event.payload.action;
  if (action !== 'created' && action !== 'unsuspend' && action !== 'new_permissions_accepted') {
    log.info('Installation webhook wasnt an action type we care about, no-op', { action });
    return;
  }
  const newOrg = event.payload.installation;
  await installOrganizationFromGithub(newOrg);
}
