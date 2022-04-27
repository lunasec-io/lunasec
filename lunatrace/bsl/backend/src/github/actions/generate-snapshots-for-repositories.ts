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
import { GithubRepositoryInfo } from "../../types/github";
import {log} from "../../utils/log";
import {catchError, threwError} from "../../utils/try";
import {generateGithubGraphqlClient} from "../api";
import {getInstallationAccessToken} from "../auth";

import {generateSnapshotForRepository} from "./generate-snapshot-for-repository";

export async function generateSnapshotsForGithubRepos(installationId: number, githubRepos: GithubRepositoryInfo[]) {
  const installationToken = await getInstallationAccessToken(installationId);

  if (installationToken.error) {
    log.error('unable to get installation token', {
      error: installationToken.msg
    });
    return;
  }

  const github = generateGithubGraphqlClient(installationToken.res);

  await Promise.all(githubRepos.map(async (repo) => {
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

    const cloneUrl = `${githubRepo.repository.url}.git`;
    const gitBranch = githubRepo.repository.defaultBranchRef.name;

    await generateSnapshotForRepository({
      cloneUrl,
      gitBranch,
      repoGithubId: repo.repoId,
      installationId,
      sourceType: 'gui',
    })
  }));
}
