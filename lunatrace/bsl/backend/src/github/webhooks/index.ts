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
import {sqsClient} from "../../aws/sqs-client";
import {getWebhookConfig} from "../../config";
import {hasura} from "../../hasura-api";
import {getSqsUrlFromName} from "../../utils/sqs";

import {registerWebhooksToInterceptor} from "./handlers";
import {WebhookInterceptor} from "./interceptor";

export async function createGithubWebhookInterceptor(): Promise<WebhookInterceptor> {
  const webhookConfig = getWebhookConfig();

  const webhookQueueUrl = await getSqsUrlFromName(sqsClient, webhookConfig.queueName);

  const webhookInterceptor = new WebhookInterceptor(hasura, webhookQueueUrl, {
    secret: webhookConfig.secret,
  });

  registerWebhooksToInterceptor(webhookInterceptor);

  return webhookInterceptor;
}
