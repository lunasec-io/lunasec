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
import { Octokit } from 'octokit';

import { GithubRepositoryInfo, RawRepositories } from '../../types/github';
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';
import { walkPagination } from '../helpers/walk-pagination';

async function fetchReposFromGithub(authToken: string, installationId: number): Promise<RawRepositories> {
  const octokit = new Octokit({ auth: authToken });

  const logger = log.child('fetch-repos-from-github-logger', {
    installationId,
  });

  async function callGithub(page: number, perPage: number) {
    logger.info('getting GitHub repos for installation', {
      page,
    });

    // authenticates as app based on request URLs
    const response = await octokit.rest.apps.listReposAccessibleToInstallation({
      page: page,
      per_page: perPage,
    });

    logger.info('GitHub repos for page', {
      page,
      responseCount: response.data.repositories.length,
      totalCount: response.data.total_count,
    });
    return { newItems: response.data.repositories, total: response.data.total_count };
  }

  return walkPagination(logger, callGithub);
}

// TODO: This is just an intermediary data format, this gets converted again before it goes to hasura. Not sure why we are bothering with this so maybe we can get rid of it and just handle the raw repo data during the hasura upsert
export function cleanUpRawRepoData(rawRepositories: RawRepositories): GithubRepositoryInfo[] {
  return rawRepositories.map((repo) => {
    return {
      orgName: repo.owner.login,
      orgId: repo.owner.id,
      orgNodeId: repo.owner.node_id,
      repoName: repo.name,
      repoId: repo.id,
      repoNodeId: repo.node_id,
      gitUrl: repo.git_url,
      ownerType: repo.owner.type,
      defaultBranch: repo.default_branch,
      cloneUrl: repo.clone_url,
      fullTraits: repo, // TODO: potentially TMI
    };
  });
}

export async function getReposFromInstallation(
  authToken: string,
  installationId: number
): Promise<GithubRepositoryInfo[] | null> {
  const rawRepositoriesResult = await catchError(fetchReposFromGithub(authToken, installationId));
  if (threwError(rawRepositoriesResult)) {
    log.error('failed to fetch repos from github', {
      installationId,
      error: rawRepositoriesResult,
    });
    return null;
  }
  return cleanUpRawRepoData(rawRepositoriesResult);
}
