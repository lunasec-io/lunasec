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

import { ClientError } from 'graphql-request';

import { log } from '../../utils/log';

import { organizationMemberAddedHandler } from './handlers/organization-member-added-handler';
import { pullRequestHandler } from './handlers/pull-request-handler';
import { pushHandler } from './handlers/push-handler';
import { repositoryUpdatedHandler } from './handlers/repository-updated-handler';
import { WebhookInterceptor } from './interceptor';
export function registerWebhooksToInterceptor(interceptor: WebhookInterceptor): void {
  // Wrap the hook in logging, pulls the type from octokit since this has the same signature
  const listenToHook: typeof interceptor.on = (hookName, callback) => {
    interceptor.on(hookName, async (event) => {
      const actionName = 'action' in event.payload ? event.payload.action : 'none given';
      await log.provideFields({ trace: 'webhook-logger', hookName, actionName, event }, async () => {
        log.info(`processing ${hookName} github webhook event from queue`);
        try {
          // Fire handler
          await callback(event);
          // added error handling here so we can stop doing the golang style catchError, threwError pattern in our handlers
          // TODO: golang style error handling has not yet been removed from existing handlers, but can be omitted for any new handlers.
        } catch (e: unknown) {
          if (e instanceof Error) {
            if (e instanceof ClientError) {
              log.error('Caught a graphql error while handling github webhook. Webhook processing has cancelled.', {
                error: e,
              });
              return;
            }
            log.error(
              'Caught an unknown error while processing github webhook. This should be investigated. Webhook processing has cancelled.',
              {
                error: e,
              }
            );
            return;
          }
          log.error('Webhook handler threw non-error, this should never happen.');
          return;
        }
        log.info(`Finished processing ${hookName} webhook`);
      });
    });
  };

  listenToHook('repository.edited', repositoryUpdatedHandler);
  listenToHook('repository.renamed', repositoryUpdatedHandler);
  listenToHook('repository.publicized', repositoryUpdatedHandler);
  listenToHook('repository.privatized', repositoryUpdatedHandler);

  listenToHook('organization.member_added', organizationMemberAddedHandler);

  listenToHook('pull_request', pullRequestHandler);
  listenToHook('push', pushHandler);
}
