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
import { Projects_Constraint, Projects_Insert_Input } from '../../hasura-api/generated';
import { GithubRepositoryInfo } from '../../types/github';
import { MaybeError } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';
import { getInstallationAccessToken } from '../auth';

import { getReposFromInstallation } from './get-repos-from-installation';
import { queueNewReposForSnapshot } from './queue-new-repos-for-snapshot';

/**
 * Performs the full upsertion of any projects and orgs that the github app is linked to, and returns some metadata about the repos for any subsequent processing
 * @param orgId
 * @param installationId
 * @param selectedRepoIds A subset of the repos in the installation that we want to import
 */
export async function installProjectsFromGithub(
  orgId: string,
  installationId: number,
  selectedRepoIds: number[]
): Promise<MaybeError<GithubRepositoryInfo[]>> {
  const installationAuthToken = await getInstallationAccessToken(installationId);
  if (installationAuthToken.error) {
    return newError(`unable to get installation token: ${installationAuthToken.msg}`);
  }

  const unfilteredGithubRepos = await getReposFromInstallation(installationAuthToken.res, installationId);
  if (unfilteredGithubRepos === null) {
    return newError(`failed to get repos for installation: ${installationId}`);
  }

  const githubRepos = unfilteredGithubRepos.filter((repo) => {
    return selectedRepoIds.includes(repo.repoId);
  });

  log.info(`Collected installation data`, {
    orgId,
    githubRepos: githubRepos.map((repo) => ({
      orgName: repo.orgName,
      repoName: repo.repoName,
    })),
  });

  // TODO: we could query hasura here for the existing repo count if we want to set up hard limits on repo count, TBD by pricing
  // this isn't a very robust check at the moment because people could still manually batch in more repos by hacking around the GUI by doing 199 at a time
  if (githubRepos.length > 200) {
    return newError(`Maximum new repo count hit, aborting installed repo synchronization job ${installationId}`);
  }

  // get the data ready to go into hasura
  const hasuraProjectsObjects: Projects_Insert_Input[] = githubRepos.map((repo) => {
    return {
      name: repo.repoName,
      organization_id: orgId,
      github_repositories: {
        data: [
          {
            github_id: repo.repoId,
            github_node_id: repo.repoNodeId,
            default_branch: repo.defaultBranch,
            git_url: repo.gitUrl,
            traits: repo,
          },
        ],
      },
    };
  });

  const insertRes = await catchError(
    hasura.InsertProjects({
      projects: hasuraProjectsObjects,
      on_conflict: {
        constraint: Projects_Constraint.ProjectsNameOrganizationIdKey,
        update_columns: [],
      },
    })
  );
  if (threwError(insertRes)) {
    log.error('Error inserting new projects', { insertRes });
    return { error: true, msg: 'error inserting projects', rawError: insertRes };
  }

  log.info(`Created LunaTrace projects`, {
    orgId,
    installationId,
    insertRes,
  });
  //

  // Now snapshot any new repos.  This will not snapshot repos with old builds, so only new repos will be snapshotted.
  const snapshotResp = await queueNewReposForSnapshot(installationId, githubRepos);
  if (snapshotResp.error) {
    log.error('unable to queue github repos', {
      snapshotResp,
    });
  }
  log.info('queued github repos for snapshots', {
    githubRepos,
  });

  return newResult(githubRepos);
}
