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

import { updateExistingRepository } from '../../actions/update-existing-repository';

// Handles changes to a given repo to keep data such as the repo name up to date
export async function repositoryUpdatedHandler(
  event: EmitterWebhookEvent<
    'repository.edited' | 'repository.privatized' | 'repository.publicized' | 'repository.renamed'
  >
) {
  const repository = event.payload.repository;
  await updateExistingRepository(repository);
}
