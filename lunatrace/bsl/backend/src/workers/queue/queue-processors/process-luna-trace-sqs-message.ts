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
import { createGithubWebhookInterceptor } from '../../../github/webhooks';
import { LunaTraceSqsMessage, MessageTypeToActivityLookup } from '../../../types/sqs';
import { MaybeErrorVoid } from '../../../types/util';
import { log } from '../../../utils/log';
import { processGithubWebhookActivity } from '../activities/process-github-webhook-activity';
import { snapshotRepositoryActivity } from '../activities/snapshot-repository-activity';

export async function createActivities(): Promise<MessageTypeToActivityLookup> {
  const webhooks = await createGithubWebhookInterceptor();
  if (webhooks === null) {
    throw new Error('github webhook interceptor cannot be null');
  }

  const processWebhookActivity = processGithubWebhookActivity(webhooks);
  return {
    'repository-snapshot': snapshotRepositoryActivity,
    'process-webhook': processWebhookActivity,
  };
}

export async function processLunaTraceSqsMessage(
  activities: MessageTypeToActivityLookup,
  message: LunaTraceSqsMessage
): Promise<MaybeErrorVoid[]> {
  if (!(message.type in activities)) {
    log.error('unable to find message type in activity lookup', {
      type: message.type,
    });
    return [];
  }

  const activity = activities[message.type];

  return await Promise.all(
    message.records.map(async (record) => {
      return await log.provideFields({ source: `process-${message.type}-message` }, () => activity(record as never));
    })
  );
}
