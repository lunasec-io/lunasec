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
import {GithubRepositoryInfo} from "../../types/github";
import {log} from "../../utils/log";
import {catchError, threwError} from "../../utils/try";
import {generateGithubGraphqlClient} from "../api";

export async function hydrateRepositoryInformation(installationToken: string, repo: GithubRepositoryInfo): Promise<void> {
  const github = generateGithubGraphqlClient(installationToken);

  const githubRepo = await catchError(async () => await github.GetRepository({
    name: repo.repoName,
    owner: repo.orgName
  }));

  if (threwError(githubRepo)) {
    log.error('unable to get github repo information', {
      repo,
      msg: githubRepo.message
    });
    return;
  }

  if (!githubRepo.repository || !githubRepo.repository.defaultBranchRef) {
    log.error('github repository information is not defined', {
      repo,
      githubRepo
    });
    return;
  }

  repo.cloneUrl = `${githubRepo.repository.url}.git`;
  repo.defaultBranch = githubRepo.repository.defaultBranchRef.name;
}
