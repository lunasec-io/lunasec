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
import { Users_Constraint, Users_Update_Column } from '../../hasura-api/generated';
import { GitHubUserData } from '../../types/github';
import { logError } from '../../utils/errors';
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';

async function getOrgId(installationId: number): Promise<string | null> {
  const orgRes = await catchError(hasura.GetOrganizationFromInstallationId({ installation_id: installationId }));

  if (threwError(orgRes)) {
    log.error(orgRes);
    return null;
  }
  if (orgRes.organizations.length !== 1) {
    return null;
  }
  return orgRes.organizations[0].id;
}

export async function addOrgMember(installationId: number, githubUserData: GitHubUserData): Promise<void> {
  log.info(
    'organization member_added webhook called, attempting to associate user with organization identified by installation id',
    {
      installationId,
      githubUserData,
    }
  );

  const orgId = await getOrgId(installationId);
  if (!orgId) {
    log.info(
      'No org with this installationId was found matching this webhook (or there was a DB error), the user probably added the org but didnt install it. Bailing out.'
    );
    return;
  }

  // TODO combine these two upserts below into one, just need to be careful with hasura logic regarding nested upserts
  // create or get an existing user
  const user = await catchError(
    hasura.UpsertUserFromId({
      user: {
        github_id: githubUserData.githubUserId.toString(),
        github_node_id: githubUserData.nodeId,
      },
      on_conflict: {
        constraint: Users_Constraint.UsersGithubIdKey,
        update_columns: [Users_Update_Column.GithubId, Users_Update_Column.GithubNodeId],
      },
    })
  );

  if (threwError(user)) {
    logError(user);
    return;
  }

  if (!user.insert_users_one) {
    log.error('unable to upsert user with github node id', {
      installationId,
      githubUserData,
    });
    return;
  }
  const userId = user.insert_users_one.id;

  // create the association between the two
  const res = await catchError(
    async () =>
      await hasura.UpsertOrganizationUsers({
        organizationUsers: [
          {
            user_id: userId,
            organization_id: orgId,
          },
        ],
      })
  );

  if (threwError(res)) {
    logError(res);
    return;
  }

  log.info('created user and organization_user', {
    installationId,
    githubUserData,
    orgId,
    userId,
  });
}
