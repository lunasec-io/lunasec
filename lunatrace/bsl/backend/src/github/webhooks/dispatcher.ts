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

import { log } from '../../utils/log';

import { organizationMemberAddedHandler } from './handlers/organization-member-added-handler';
import { pullRequestHandler } from './handlers/pull-request-handler';
import { pushHandler } from './handlers/push-handler';
import { syncRepositoriesHandler } from './handlers/sync-repositories-handler';
import { WebhookInterceptor } from './interceptor';

export function registerWebhooksToInterceptor(interceptor: WebhookInterceptor): void {
  // Wrap the hook in logging, pulls the type from octokit since this has the same signature
  const listenToHook: typeof interceptor.on = (hookName, callback) => {
    interceptor.on(hookName, async (event) => {
      const actionName = 'action' in event.payload ? event.payload.action : 'none given';
      await log.provideFields({ trace: 'webhook-logger', hookName, actionName }, async () => {
        log.info(`processing ${hookName} github webhook event from queue`);
        await callback(event);
      });
    });
  };

  listenToHook('installation_repositories.added', syncRepositoriesHandler);
  listenToHook('installation.created', syncRepositoriesHandler);
  listenToHook('repository.edited', syncRepositoriesHandler); // Particularly inefficient over-fetching but...it does work
  listenToHook('pull_request', pullRequestHandler);
  listenToHook('organization.member_added', organizationMemberAddedHandler);
  listenToHook('push', pushHandler);
}
