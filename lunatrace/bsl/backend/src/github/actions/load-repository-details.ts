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
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';
import { generateGithubGraphqlClient } from '../api';

export interface HydrateRepositoryInformationResponse {
  filterRepo: boolean;
}

// THIS FUNCTION IS DEPRECATED AND NOT CURRENTLY IN USE ANYWHERE, BUT MIGHT BE USEFUL IN FUTURE
// TODO: WARNING this function edits the repo object argument in place as a side effect.  Change this anti-pattern
export async function loadRepositoryDetails(
  installationId: number,
  repo: GithubRepositoryInfo
): Promise<HydrateRepositoryInformationResponse> {
  const githubClient = await generateGithubGraphqlClient(installationId);
  if (githubClient.error) {
    log.error(`unable to create github client`, {
      installationId,
    });
    return {
      filterRepo: true,
    };
  }
  const github = githubClient.res;

  const githubRepo = await catchError(
    github.GetRepository({
      name: repo.repoName,
      owner: repo.orgName,
    })
  );

  if (threwError(githubRepo)) {
    log.error('unable to get github repo information', {
      repo,
      msg: githubRepo.message,
    });
    return {
      filterRepo: true,
    };
  }

  if (!githubRepo.repository || !githubRepo.repository.defaultBranchRef) {
    log.warn('github repository information is not defined', {
      repo,
      githubRepo,
    });
    return {
      filterRepo: true,
    };
  }

  repo.cloneUrl = `${githubRepo.repository.url}.git`;
  repo.defaultBranch = githubRepo.repository.defaultBranchRef.name;
  return {
    filterRepo: false,
  };
}
