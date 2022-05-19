import { createGithubWebhookInterceptor } from '../../github/webhooks';
import { LunaTraceSqsMessage, MessageTypeToActivityLookup } from '../../types/sqs';
import { log } from '../../utils/log';
import { processGithubWebhookActivity } from '../activities/process-github-webhook-activity';
import { snapshotRepositoryActivity } from '../activities/snapshot-repository-activity';

async function createMessageTypeToActivityLookup(): Promise<MessageTypeToActivityLookup> {
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

export async function processLunaTraceSqsMessage(message: LunaTraceSqsMessage): Promise<void> {
  const activityLookup = await createMessageTypeToActivityLookup();

  if (!(message.type in activityLookup)) {
    log.error('unable to find message type in activity lookup', {
      type: message.type,
    });
    return;
  }

  const activity = activityLookup[message.type];
}
