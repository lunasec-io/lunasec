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
import * as process from 'process';

import { BuildSourceType, SnapshotForRepositoryRequest } from '../types/sqs';
import { log } from '../utils/log';
import { snapshotRepositoryActivity } from '../workers/queue/activities/snapshot-repository-activity';

if (process.argv.length <= 2) {
  log.error(`${process.argv[1]} <activity> [options...]`);
  process.exit(1);
}

const activity = process.argv[2];
const options = process.argv.slice(3);

async function snapshotRepository() {
  const snapshotRequest: SnapshotForRepositoryRequest = {
    cloneUrl: 'test',
    gitBranch: 'master',
    repoGithubId: 123,
    installationId: 123,
    sourceType: 'pr',
    pullRequestId: 'testid',
  };
  await snapshotRepositoryActivity(snapshotRequest);
}

void (async () => {
  switch (activity) {
    case 'snapshot-repository':
      await snapshotRepository();
  }
})();
