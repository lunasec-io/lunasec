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
import { createNewBuild } from '../hasura-api/actions/create-new-build';
import { SnapshotBuildInfo, SnapshotForRepositoryRequest } from '../types/sqs';
import { newError } from '../utils/errors';
import { log } from '../utils/log';
import { threwError } from '../utils/try';
import { scanSnapshotActivity } from '../workers/queue/activities/scan-snapshot-activity';
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
  .requiredOption('--branch <string>', 'branch of repository to scan')
  .option('--commit <string>', 'commit of repository to scan')
  .requiredOption('--repo-github-id <number>', 'github id for the repository')
  .requiredOption('--install-id <number>', 'installation id')
  .option('--pull-request-id <number>', 'id of the pull request to run check on')
  .action(async (options: SnapshotRepositoryOptions) => {
    const parsedRepoGithubId = parseInt(options.repoGithubId);
    const authUrl = await getRepoCloneUrlWithAuth(parsedRepoGithubId);

    if (authUrl.error) {
      log.error('unable to get auth url for repo', {
        error: authUrl.msg,
      });
      return;
    }

    const buildInfo: SnapshotBuildInfo = {
      cloneUrl: authUrl.res.cloneUrl,
      gitBranch: options.branch,
      gitCommit: options.commit,
      sourceType: 'cli',
      pullRequestId: options.pullRequestId,
    };

    const buildIdResult = await createNewBuild(parsedRepoGithubId, buildInfo);
    if (buildIdResult.error) {
      log.error('Failed to create new build for snapshot request', {
        buildInfo,
      });
      return;
    }

    const snapshotRequest: SnapshotForRepositoryRequest = {
      ...buildInfo,
      buildId: buildIdResult.res,
      repoGithubId: parsedRepoGithubId,
      installationId: parseInt(options.installId),
    };
    await snapshotRepositoryActivity(snapshotRequest);
  });

program
  .command('process-sbom')
  .requiredOption('--s3-url <string>', 's3 url to where the sbom is')
  .action(async (options) => {
    const parsedS3Url = new URL(options.s3Url);
    const hostParts = parsedS3Url.host.split('.');
    if (hostParts.length !== 5) {
      log.error('invalid host name for s3 url', {
        s3Url: options.s3Url,
      });
      return;
    }

    const bucketName = hostParts[0];
    const region = hostParts[2];
    const key = parsedS3Url.pathname.substring(1);

    const keyParts = key.split('/');
    if (keyParts.length !== 6) {
      log.error('invalid s3 key for s3 url', {
        s3Url: options.s3Url,
        key,
      });
      return;
    }

    const buildId = keyParts[5];

    await scanSnapshotActivity(buildId, {
      bucketName,
      key,
      region,
    });
  });

program.parse();
