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

import { WebhookInterceptor } from '../github/webhooks/interceptor';
import { hasura } from '../hasura-api';
import { GetWebhookCacheByDeliveryIdQuery } from '../hasura-api/generated';
import { WebhookMetadata } from '../types/sqs';
import { MaybeError } from '../types/util';
import { newError, newResult } from '../utils/errors';
import { log } from '../utils/log';
import { catchError, threwError, Try } from '../utils/try';

type WebhookHandlerFunc = (message: WebhookMetadata) => Promise<MaybeError<undefined>>;

export function createGithubWebhookHandler(webhooks: WebhookInterceptor): WebhookHandlerFunc {
  return async (message: WebhookMetadata): Promise<MaybeError<undefined>> => {
    log.info(`Received webhook`, {
      delivery_id: message.delivery_id,
    });
    const { delivery_id } = message;

    const deliveryId = delivery_id;

    return await log.provideFields({ deliveryId }, async () => {
      try {
        const webhookData: Try<GetWebhookCacheByDeliveryIdQuery | null> = await catchError(
          async () =>
            await hasura.GetWebhookCacheByDeliveryId({
              delivery_id: deliveryId,
            })
        );

        if (threwError(webhookData)) {
          log.error(`Failed to get webhook data for deliveryId ${deliveryId}`);
          return newError(`Failed to get webhook data for deliveryId ${deliveryId}`);
        }
        await webhooks.receive({
          id: deliveryId,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          name: webhookData.webhook_cache[0].event_type,
          payload: webhookData.webhook_cache[0].data,
        });

        return newResult(undefined);
      } catch (e) {
        log.error({ error: e, deliveryId }, 'Unable to process GitHub webhook');

        return newError(threwError(e) ? e.message : String(e));
      }
    });
  };
}
