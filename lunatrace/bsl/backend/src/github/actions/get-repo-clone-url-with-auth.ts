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
import { GetCloneRepoInfoFromRepoIdQueryVariables, Github_Repositories_Bool_Exp } from '../../hasura-api/generated';
import { MaybeError } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';
import { getInstallationAccessToken } from '../auth';

export interface GetRepoCloneUrlWithAuthReturn {
  cloneUrl: string;
  projectId: string;
}

export async function getRepoCloneUrlWithAuth(
  repoGithubId: number
): Promise<MaybeError<GetRepoCloneUrlWithAuthReturn>> {
  const cloneRepoInfo = await catchError(
    hasura.GetCloneRepoInfoFromRepoId({
      repo_github_id: repoGithubId,
    })
  );

  if (threwError(cloneRepoInfo)) {
    const msg = 'unable to get clone repo info from git url';
    log.error(msg);
    return newError(msg);
  }

  if (cloneRepoInfo.github_repositories.length === 0) {
    const msg = 'no projects were found with provided git url';
    log.error(msg);
    return newError(msg);
  }

  const gitRepo = cloneRepoInfo.github_repositories[0];

  const projectId = gitRepo.project.id as string;

  if (!gitRepo.project || !gitRepo.project.organization) {
    const msg = 'project or organization is not defined for git repo';
    log.error(msg, {
      gitRepo,
    });
    return newError(msg);
  }

  const installationId = gitRepo.project.organization.installation_id;

  if (!installationId) {
    const msg = 'installation id is not defined for git repo';
    log.error(msg, {
      gitRepo,
    });
    return newError(msg);
  }

  const installationToken = await getInstallationAccessToken(installationId);

  if (installationToken.error) {
    const msg = 'unable to get installation token';
    log.error(msg, {
      error: installationToken.msg,
    });
    return newError(msg);
  }

  const gitUrl = gitRepo.git_url;

  const parsedGitUrl = new URL(gitUrl);
  parsedGitUrl.username = 'x-access-token';
  parsedGitUrl.password = installationToken.res;

  // make sure that the url scheme we are using is one that is secure.
  const cloneUrl = parsedGitUrl.toString().replace('git://', 'https://');

  return newResult({
    cloneUrl,
    projectId,
  });
}
