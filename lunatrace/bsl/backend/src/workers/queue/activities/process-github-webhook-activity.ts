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

import { WebhookInterceptor } from '../../../github/webhooks/interceptor';
import { hasura } from '../../../hasura-api';
import { GetWebhookCacheByDeliveryIdQuery } from '../../../hasura-api/generated';
import { ProcessGithubWebhookRequest } from '../../../types/sqs';
import { MaybeError } from '../../../types/util';
import { newError, newResult } from '../../../utils/errors';
import { log } from '../../../utils/log';
import { catchError, ErrorOrResult, threwError } from '../../../utils/try';

type WebhookHandlerFunc = (message: ProcessGithubWebhookRequest) => Promise<MaybeError<undefined>>;

export function processGithubWebhookActivity(webhooks: WebhookInterceptor): WebhookHandlerFunc {
  return async (req: ProcessGithubWebhookRequest): Promise<MaybeError<undefined>> => {
    log.info(`received webhook`, {
      delivery_id: req.delivery_id,
    });
    const { delivery_id } = req;

    const deliveryId = delivery_id;

    return await log.provideFields({ deliveryId }, async () => {
      try {
        const webhookData = await catchError(
          hasura.GetWebhookCacheByDeliveryId({
            delivery_id: deliveryId,
          })
        );

        if (threwError(webhookData)) {
          log.error(`Failed to get webhook data for deliveryId ${deliveryId}`);
          return {
            error: true,
            msg: `Failed to get webhook data for deliveryId ${deliveryId}`,
          };
        }

        const event: EmitterWebhookEvent = {
          id: deliveryId,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          name: webhookData.webhook_cache[0].event_type,
          payload: webhookData.webhook_cache[0].data,
        };

        log.info('processing github webhook event', {
          event,
        });

        // TODO: Mark webhooks as handled in the database
        await webhooks.receive(event);

        return {
          error: false,
        };
      } catch (e) {
        log.error({ error: e, deliveryId }, 'Unable to process GitHub webhook');

        return {
          error: true,
          msg: threwError(e) ? e.message : String(e),
          rawError: e instanceof Error ? e : undefined,
        };
      }
    });
  };
}
