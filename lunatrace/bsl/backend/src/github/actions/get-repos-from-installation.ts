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
import { walkPagination } from '../helpers/walk-pagination';

async function fetchReposFromGithub(authToken: string, installationId: number): Promise<RawRepositories> {
  const octokit = new Octokit({ auth: authToken });

  const iLog = log.child('fetchReposFromGithubLogger');

  async function callGithub(page: number, perPage: number) {
    iLog.info(`[installId: ${installationId}] Getting GitHub repos for installation, page #${page}`);

    // authenticates as app based on request URLs
    const response = await octokit.rest.apps.listReposAccessibleToInstallation({
      page: page,
      per_page: perPage,
    });

    iLog.info(
      `[installId: ${installationId}] GitHub repos for page #${page}: ${response.data.repositories.length}, total_count: ${response.data.total_count}`
    );
    return { newItems: response.data.repositories, total: response.data.total_count };
  }

  return walkPagination(iLog, callGithub);
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
): Promise<GithubRepositoryInfo[]> {
  const rawRepositories = await fetchReposFromGithub(authToken, installationId);
  return cleanUpRawRepoData(rawRepositories);
}
