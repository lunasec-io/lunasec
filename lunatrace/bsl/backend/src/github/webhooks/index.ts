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
import { sqsClient } from '../../aws/sqs-client';
import { getWebhookConfig } from '../../config';
import { hasura } from '../../hasura-api';
import { log } from '../../utils/log';
import { getSqsUrlFromName } from '../../utils/sqs';
import { catchError, threwError } from '../../utils/try';

import { registerWebhooksToInterceptor } from './handlers';
import { WebhookInterceptor } from './interceptor';

export async function createGithubWebhookInterceptor(): Promise<WebhookInterceptor | null> {
  const webhookConfig = getWebhookConfig();

  if (webhookConfig.disableWebhookQueue) {
    log.info('disabling the github webhook queue');
    return null;
  }

  const webhookQueueUrl = await catchError(getSqsUrlFromName(sqsClient, webhookConfig.queueName));

  if (threwError(webhookQueueUrl) || webhookQueueUrl.error) {
    log.error('unable to load queue url', {
      queueName: webhookConfig.queueName,
    });
    process.exit(-1);
  }

  const webhookInterceptor = new WebhookInterceptor(hasura, webhookQueueUrl.res, {
    secret: webhookConfig.secret,
  });

  registerWebhooksToInterceptor(webhookInterceptor);

  return webhookInterceptor;
}
