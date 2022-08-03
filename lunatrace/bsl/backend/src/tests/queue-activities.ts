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

import { getRepoCloneUrlWithAuth } from '../github/actions/get-repo-clone-url-with-auth';
import { SnapshotForRepositoryRequest } from '../types/sqs';
import { log } from '../utils/log';
import { threwError } from '../utils/try';
import { snapshotRepositoryActivity } from '../workers/queue/activities/snapshot-repository-activity';

const program = new Command();

program.name('queue-activities');

interface SnapshotRepositoryOptions {
  branch: string;
  commit?: string;
  repoGithubId: string;
  installId: string;
  pullRequestId?: string;
}

program
  .command('snapshot-repository')
  .option('--branch', 'branch of repository to scan')
  .option('--commit', 'commit of repository to scan')
  .requiredOption('--repo-github-id', 'github id for the repository')
  .requiredOption('--install-id', 'installation id')
  .option('--pull-request-id', 'id of the pull request to run check on')
  .action(async (options: SnapshotRepositoryOptions) => {
    const parsedRepoGithubId = parseInt(options.repoGithubId);
    const authUrl = await getRepoCloneUrlWithAuth(parsedRepoGithubId);

    if (authUrl.error) {
      log.error('unable to get auth url for repo', {
        error: authUrl.msg,
      });
      return;
    }

    const snapshotRequest: SnapshotForRepositoryRequest = {
      cloneUrl: authUrl.res.cloneUrl,
      gitBranch: options.branch,
      gitCommit: options.commit,
      repoGithubId: parsedRepoGithubId,
      installationId: parseInt(options.installId),
      sourceType: 'cli',
      pullRequestId: options.pullRequestId,
    };
    await snapshotRepositoryActivity(snapshotRequest);
  });

program.parse();
