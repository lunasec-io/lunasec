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
import { getWorkerConfig } from '../config';

import { startQueueWorker } from './queue';
import { runUpdateVulnerabilities } from './upsert-vulnerabilities';

const workerConfig = getWorkerConfig();
if (workerConfig.workerType === 'queue-handler') {
  void startQueueWorker();
} else if (workerConfig.workerType === 'job-runner') {
  // TODO: Make it much more clear that 'job-runner' means 'update-vulnerabilities'
  void runUpdateVulnerabilities();
} else {
  throw new Error(`unknown worker type: ${workerConfig.workerType}`);
}
