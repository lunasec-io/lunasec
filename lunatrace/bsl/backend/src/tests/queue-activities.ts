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
import { Command } from 'commander';

import { SnapshotForRepositoryRequest } from '../types/sqs';
import { snapshotRepositoryActivity } from '../workers/queue/activities/snapshot-repository-activity';

const program = new Command();

program.name('queue-activities');

program
  .command('snapshot-repository')
  .argument('<repository>', 'repository to snapshot')
  .option('branch', 'branch of repository to scan')
  .option('branch', 'branch of repository to scan')
  .action(async (repository) => {
    const snapshotRequest: SnapshotForRepositoryRequest = {
      cloneUrl: repository,
      gitBranch: 'master',
      gitCommit: 'asdf',
      repoGithubId: 123,
      installationId: 123,
      sourceType: 'cli',
      pullRequestId: 'testid',
    };
    await snapshotRepositoryActivity(snapshotRequest);
  });
