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
import { GithubRepositoryInfo } from '../../types/github';
import { SnapshotForRepositorySqsRecord } from '../../types/sqs';
import { MaybeError } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { queueRepositoriesForSnapshot } from '../../workers/queue-repositories-for-snapshot';

import { hydrateRepositoryInformation } from './hydrate-repository-information';

export async function queueGithubReposForSnapshots(
  installationId: number,
  githubRepos: GithubRepositoryInfo[]
): Promise<MaybeError<undefined>> {
  const results = await Promise.all(
    githubRepos.map(async (repo): Promise<MaybeError<SnapshotForRepositorySqsRecord | null>> => {
      const resp = await hydrateRepositoryInformation(installationId, repo);

      if (resp.filterRepo) {
        log.info(
          'Filtering repository from being queued. Most likely this is due to no default branch being defined for the repository.',
          {
            repo,
          }
        );
        return newResult(null);
      }

      if (!repo.cloneUrl || !repo.defaultBranch) {
        const msg = 'unable to generate snapshot for repository, required fields are missing';
        log.error(msg, {
          repo,
        });
        return newError(msg);
      }

      const record: SnapshotForRepositorySqsRecord = {
        cloneUrl: repo.cloneUrl,
        gitBranch: repo.defaultBranch,
        installationId: installationId,
        repoGithubId: repo.repoId,
        sourceType: 'pr',
      };

      return newResult(record);
    })
  );

  const errors = results.filter((res) => res.error);
  if (errors.length > 0) {
    return newError(JSON.stringify(errors));
  }

  const filteredRepos = results.flatMap((res) => (!res.error && res.res !== null ? res.res : []));

  log.info('queueing repositories for snapshot', {
    installationId,
    repoCount: filteredRepos.length,
  });
  await queueRepositoriesForSnapshot(installationId, filteredRepos);

  return newResult(undefined);
}
