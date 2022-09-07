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

export async function orgMemberAdded(installationId: number, githubUserData: GitHubUserData): Promise<void> {
  log.info('organization member_added, associating user with organization identified by installation id', {
    installationId,
    githubUserData,
  });

  // create or get an existing user
  const user = await catchError(
    hasura.UpsertUserFromId({
      user: {
        github_id: githubUserData.databaseId.toString(),
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

  // get the organization that is referred to by the installation id
  const org = await catchError(
    async () =>
      await hasura.GetOrganizationFromInstallationId({
        installation_id: installationId,
      })
  );

  if (threwError(org)) {
    logError(org);
    return;
  }

  if (org.organizations.length !== 1) {
    log.error('organizations for installation id is not exactly one result', {
      installationId,
      githubUserData,
    });
    return;
  }

  const orgId = org.organizations[0].id;

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

  log.info('created user and associated it with organization identified by installation id', {
    installationId,
    githubUserData,
    orgId,
    userId,
  });
}
