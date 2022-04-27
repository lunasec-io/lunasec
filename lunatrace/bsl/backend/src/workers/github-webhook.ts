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
import {WebhookInterceptor} from "../github/webhooks/interceptor";
import { hasura } from '../hasura-api';
import {GetWebhookCacheByDeliveryIdQuery} from '../hasura-api/generated';
import {QueueErrorResult, QueueSuccessResult, WebhookMetadata} from '../types/sqs';
import { log } from '../utils/log';
import {catchError, threwError, Try} from '../utils/try';

type WebhookHandlerFunc = (message: WebhookMetadata) => Promise<QueueSuccessResult | QueueErrorResult>;

export function createGithubWebhookHandler(webhooks: WebhookInterceptor): WebhookHandlerFunc {
  return async (
    message: WebhookMetadata
  ): Promise<QueueSuccessResult | QueueErrorResult> => {
    log.info(`Received webhook:`, message);
    const {delivery_id} = message;

    const deliveryId = delivery_id;

    return await log.provideFields({deliveryId}, async () => {
      try {
        const webhookData: Try<GetWebhookCacheByDeliveryIdQuery | null> = await catchError(
          async () => await hasura.GetWebhookCacheByDeliveryId({
            delivery_id: deliveryId,
          })
        );

        if (threwError(webhookData)) {
          log.error(`Failed to get webhook data for deliveryId ${deliveryId}`);
          return {
            success: false,
            error: new Error(`Failed to get webhook data for deliveryId ${deliveryId}`),
          };
        }

        await webhooks.receive({
          id: deliveryId,
          name: webhookData.webhook_cache[0].event_type,
          payload: webhookData.webhook_cache[0].data,
        });

        return {
          success: true,
        };
      } catch (e) {
        log.error('Unable to process GitHub webhook: ' + deliveryId, e);

        return {
          success: false,
          error: threwError(e) ? e : new Error(String(e)),
        };
      }
    });
  }
}
