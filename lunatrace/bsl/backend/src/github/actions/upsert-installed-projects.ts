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
import {
  generateOrgsAndProjectsMutation,
  insertOrgsAndProjects,
} from '../../hasura-api/actions/insert-orgs-and-projects';
import { GithubRepositoryInfo } from '../../types/github';
import { MaybeError } from '../../types/util';
import { logError, newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';
import { getInstallationAccessToken } from '../auth';

import { getHasuraOrgMembers } from './get-org-members';
import { getReposFromInstallation } from './get-repos-from-installation';
import { queueNewReposForSnapshot } from './queue-new-repos-for-snapshot';

// Performs the full upsertion of any projects and orgs that the github app is linked to, and returns some metadata about the repos for any subsequent processing
export async function upsertInstalledProjects(
  installationId: number,
  selectedRepoIds?: number[]
): Promise<MaybeError<GithubRepositoryInfo[]>> {
  const installationAuthToken = await getInstallationAccessToken(installationId);
  if (installationAuthToken.error) {
    return newError(`unable to get installation token: ${installationAuthToken.msg}`);
  }

  const unfilteredGithubRepos = await getReposFromInstallation(installationAuthToken.res, installationId);

  const githubRepos = unfilteredGithubRepos.filter((repo) => {
    if (!selectedRepoIds) {
      return true;
    }
    return selectedRepoIds.includes(repo.repoId);
  });

  log.info(`Collected installation data`, {
    installationId,
    githubRepos: githubRepos.map((repo) => ({
      orgName: repo.orgName,
      repoName: repo.repoName,
    })),
  });

  // TODO: Fix this with proper UI in the future. Logging this will happen automatically at the handler level
  if (githubRepos.length > 200) {
    return newError(`Maximum repo count hit, aborting installed repo synchronization job ${installationId}`);
  }

  // Get the data ready to go into hasura
  const orgMutationInputsByOrgId = generateOrgsAndProjectsMutation(installationId, githubRepos);
  const orgMutationInputs = Object.values(orgMutationInputsByOrgId);

  const orgIds = await insertOrgsAndProjects(installationId, orgMutationInputs);

  if (orgIds.error) {
    return newError(orgIds.msg);
  }

  log.info(`[installId: ${installationId}] Created/updated LunaTrace organizations`, {
    orgs: orgIds.res,
  });

  const githubOrgToHasuraOrg = orgIds.res.reduce((lookup, org) => {
    if (!org.github_node_id || !org.id) {
      log.error('unable to add org to lookup', {
        org,
      });
      return lookup;
    }
    // builds the association between github org ids and hasura org ids
    return {
      ...lookup,
      [org.github_node_id]: org.id,
    };
  }, {} as Record<string, string>);

  const orgLoginList = Object.keys(orgMutationInputsByOrgId);

  const createOrgUsersResp = await Promise.all(
    orgLoginList.map(async (login) => {
      const org = orgMutationInputsByOrgId[login];
      const orgMembers = await getHasuraOrgMembers(installationId, installationAuthToken, org, githubOrgToHasuraOrg);

      if (orgMembers.error) {
        log.error(orgMembers.msg);
        return null;
      }

      const res = await catchError(
        async () =>
          await hasura.UpsertOrganizationUsers({
            organizationUsers: orgMembers.res,
          })
      );

      if (threwError(res)) {
        logError(res);
        return null;
      }
      return res.insert_organization_user?.affected_rows;
    })
  );

  if (createOrgUsersResp.some((c) => c === null)) {
    return newError('creating organization users failed');
  }

  // Now snapshot any new repos.  This will not snapshot repos with old builds, so only new repos will be snapshotted
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
