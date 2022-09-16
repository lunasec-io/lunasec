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
import { getWebhookConfig } from '../../config';
import { hasura } from '../../hasura-api';
import { log } from '../../utils/log';
import { loadQueueUrlOrExit } from '../../utils/sqs';

import { registerWebhooksToInterceptor } from './dispatcher';
import { WebhookInterceptor } from './interceptor';

export async function createGithubWebhookInterceptor(): Promise<WebhookInterceptor | null> {
  const webhookConfig = getWebhookConfig();

  if (webhookConfig.disableWebhookQueue) {
    log.info('disabling the github webhook queue');
    return null;
  }

  const webhookQueueUrl = await loadQueueUrlOrExit(webhookConfig.queueName);

  const webhookInterceptor = new WebhookInterceptor(hasura, webhookQueueUrl, {
    secret: webhookConfig.secret,
  });

  registerWebhooksToInterceptor(webhookInterceptor);

  return webhookInterceptor;
}
