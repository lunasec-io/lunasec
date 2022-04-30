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
  createLunatraceOrgsFromGithubOrgs,
  hasuraOrgsFromGithubRepositories,
} from '../../hasura-api/actions/create-lunatrace-orgs-from-github-orgs';
import { GithubRepositoryInfo } from '../../types/github';
import { MaybeError } from '../../types/util';
import { logError, newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';

import { getHasuraOrgMembers } from './get-org-members';

export async function createHasuraOrgsAndProjectsForInstall(
  installationAuthToken: string,
  installationId: number,
  repositories: GithubRepositoryInfo[]
): Promise<MaybeError<null>> {
  const organizations = hasuraOrgsFromGithubRepositories(installationId, repositories);
  const orgObjectList = Object.values(organizations);

  const orgIds = await createLunatraceOrgsFromGithubOrgs(installationId, orgObjectList);

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

    return {
      ...lookup,
      [org.github_node_id]: org.id,
    };
  }, {} as Record<string, string>);

  const orgLoginList = Object.keys(organizations);

  const createOrgUsersResp = await Promise.all(
    orgLoginList.map(async (login) => {
      const org = organizations[login];
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
  return newResult(null);
}
