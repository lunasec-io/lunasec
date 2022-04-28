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

import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { Webhooks } from '@octokit/webhooks';
import {
  EmitterWebhookEventWithSignature,
  EmitterWebhookEventWithStringPayloadAndSignature,
  Options,
  // Unsure about why ESLint complains about this by TypeScript is cool with it.
  // eslint-disable-next-line import/no-unresolved
} from '@octokit/webhooks/dist-types/types';

import { sqsClient } from '../../aws/sqs-client';
import { HasuraClient } from '../../hasura-api';
import { InsertWebhookToCacheMutation } from '../../hasura-api/generated';
import { logError } from '../../utils/errors';
import { log } from '../../utils/log';
import { catchError, threwError, Try } from '../../utils/try';

export class WebhookInterceptor<TTransformed = unknown> extends Webhooks<TTransformed> {
  webhookQueueUrl: string;
  hasura: HasuraClient;

  constructor(
    hasura: HasuraClient,
    webhookQueueUrl: string,
    options: Options<TTransformed> & {
      secret: string;
    }
  ) {
    super(options);
    this.webhookQueueUrl = webhookQueueUrl;
    this.hasura = hasura;
  }

  getInstallationId(
    options: EmitterWebhookEventWithStringPayloadAndSignature | EmitterWebhookEventWithSignature
  ): number | undefined {
    if (typeof options.payload === 'string') {
      try {
        return JSON.parse(options.payload).installation.id;
      } catch (e) {
        return undefined;
      }
    }

    // Ultra jank, but we gotta do what we gotta do.
    return options.payload && (options.payload as any).installation && (options.payload as any).installation.id;
  }

  public verifyAndReceive = async (
    options: EmitterWebhookEventWithStringPayloadAndSignature | EmitterWebhookEventWithSignature
  ): Promise<void> => {
    const verified = await this.verify(options.payload, options.signature);

    if (!verified) {
      log.error('Webhook signature verification failed');
      throw new Error('Webhook signature verification failed');
    }

    const installationId = this.getInstallationId(options);
    if (!installationId) {
      log.error('Unable to get installation ID for received webhook', {
        options: options,
      });
      throw new Error('Installation ID is undefined');
    }

    const insertedWebhookResult: Try<InsertWebhookToCacheMutation> = await catchError(
      async () =>
        await this.hasura.InsertWebhookToCache({
          data: options.payload,
          event_type: options.name,
          signature_256: options.signature,
          delivery_id: options.id,
          installation_id: installationId,
        })
    );

    if (threwError(insertedWebhookResult)) {
      logError(insertedWebhookResult);
      throw new Error('Failed to insert webhook to cache');
    }

    const result = insertedWebhookResult.insert_webhook_cache_one;

    if (!result) {
      console.error('Failed to confirm webhook added to cache');
      throw new Error('Failed to confirm webhook added to cache');
    }

    log.info(`Inserted webhook to cache: ${result.delivery_id}`);

    // Ignore the result, we don't care if it succeeded or not because we have ensured that it's been flushed to the DB already;
    void sqsClient.send(
      new SendMessageCommand({
        MessageBody: JSON.stringify({
          delivery_id: options.id,
        }),
        MessageAttributes: {
          delivery_id: {
            DataType: 'String',
            StringValue: options.id,
          },
        },
        QueueUrl: this.webhookQueueUrl,
      })
    );
  };
}
