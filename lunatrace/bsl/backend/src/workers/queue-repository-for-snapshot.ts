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
import { SendMessageCommand } from "@aws-sdk/client-sqs";

import {sqsClient} from "../aws/sqs-client";
import {getRepositoryQueueConfig} from "../config";
import {GenerateSnapshotForRepositoryRecord} from "../types/sqs";
import {getSqsUrlFromName} from "../utils/sqs";

const repoQueueConfig = getRepositoryQueueConfig();

export async function queueRepositoryForSnapshot(record: GenerateSnapshotForRepositoryRecord): Promise<void> {
  // TODO (cthompson) move this outside of this function, this should only need to be run once
  const repositoryQueueUrl = await getSqsUrlFromName(sqsClient, repoQueueConfig.queueName);

  // messages sent to this queue will be processed by the process-repository queue handler in workers/snapshot-repository
  await sqsClient.send(new SendMessageCommand({
    MessageBody: JSON.stringify(record),
    MessageAttributes: {
      'installation_id': {
        DataType: 'Number',
        StringValue: record.installationId.toString()
      },
      'repo_id': {
        DataType: 'Number',
        StringValue: record.repoGithubId.toString()
      },
    },
    QueueUrl: repositoryQueueUrl
  }))
}
