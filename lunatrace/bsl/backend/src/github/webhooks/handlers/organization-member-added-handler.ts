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
import { addOrgMember } from '../../actions/add-org-member';

export async function organizationMemberAddedHandler(event: EmitterWebhookEvent<'organization.member_added'>) {
  if (!event.payload.installation) {
    log.error('organization member_added has undefined installation', event.payload);
    return;
  }

  const installationId = event.payload.installation.id;
  const githubNodeId = event.payload.membership.user.node_id;
  const githubUserId = event.payload.membership.user.id;

  await addOrgMember(installationId, {
    nodeId: githubNodeId,
    githubUserId,
  });
}
