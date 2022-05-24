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

import { hasura } from '../../hasura-api';
import { GithubRepositoryInfo } from '../../types/github';
import { QueueRepositorySnapshotMessage } from '../../types/sqs';
import { MaybeError } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';

import { queueRepositoryForSnapshot } from './queue-repository-for-snapshot';

export async function queueNewReposForSnapshot(
  installationId: number,
  githubRepos: Array<GithubRepositoryInfo>
): Promise<MaybeError<undefined>> {
  const results = await Promise.all(
    githubRepos.map(async (repo) => {
      if (!repo.cloneUrl || !repo.defaultBranch) {
        const msg = 'unable to generate snapshot for repository, required fields are missing';
        log.error(msg, {
          repo,
        });
        return newError(msg);
      }

      // Check if there are any builds already and if there are skip.  This is just to populate the first build on install for a good UX
      // Existing repos might come in when we upsert repos so just skip those
      const buildCountResult = await hasura.GetBuildsCountFromGithubId({ github_id: repo.repoId });
      const buildCount = buildCountResult.github_repositories[0]?.project.builds_aggregate.aggregate?.count;
      if (buildCount === undefined || buildCount > 0) {
        log.info('skipping snapshot due to previous build', { repo });
        return;
      }

      const record: QueueRepositorySnapshotMessage = {
        cloneUrl: repo.cloneUrl,
        gitBranch: repo.defaultBranch,
        installationId: installationId,
        repoGithubId: repo.repoId,
        sourceType: 'pr',
      };
      return queueRepositoryForSnapshot(installationId, record);
    })
  );

  log.info('queued repositories repositories for snapshot with results: ', {
    installationId,
    results,
  });

  const errors = results.filter((res) => res && res.error);
  if (errors.length > 0) {
    return newError(JSON.stringify(errors));
  }

  return newResult(undefined);
}
