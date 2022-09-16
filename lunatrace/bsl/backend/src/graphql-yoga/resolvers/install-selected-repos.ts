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
import { GraphQLYogaError } from '@graphql-yoga/node';

import { installProjectsFromGithub } from '../../github/actions/install-projects-from-github';
import { hasura } from '../../hasura-api';
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';
import { MutationResolvers, OrgsWithReposInput } from '../generated-resolver-types';
import { isAuthenticated } from '../helpers/auth-helpers';

type InstallSelectedReposType = NonNullable<MutationResolvers['installSelectedRepos']>;

/**
 * Installs the repos the user selected in the GUIG
 */
export const installSelectedReposResolver: InstallSelectedReposType = async (parent, args, ctx, _info) => {
  if (!isAuthenticated(ctx)) {
    log.warn('No parsed JWT claims with a user ID on route that required authorization, throwing a graphql error');
    throw new GraphQLYogaError('Unauthorized');
  }
  const newReposByOrg = args.orgs;
  if (!newReposByOrg) {
    throw new GraphQLYogaError('No array of orgs provided');
  }
  const userId = ctx.req.user['https://hasura.io/jwt/claims']['x-hasura-real-user-id'];
  if (newReposByOrg.length === 0) {
    return { success: true };
  }
  const authenticatedOrgs = await authenticateOrgsAndLoadInstallationIds(newReposByOrg, userId);
  ``;
  // Go through each org and add the repos from it
  await Promise.all(
    authenticatedOrgs.map(async (org) => {
      log.info('Attempting to upsert selected repos from org ', { org });
      const result = await installProjectsFromGithub(org.id, org.installationId, org.repos);
      if (result.error) {
        log.error('Failure during project installation', result.msg);
        throw new GraphQLYogaError(`Failed to install repos from organization: ${result.msg}`);
      }
    })
  );
  return { success: true };
};

// TODO: Not sure if this security check is necessary
// Without this it MIGHT be possible for someone to trigger installs for repos and orgs they don't own, although not gain access to them. Not sure.
async function authenticateOrgsAndLoadInstallationIds(
  newReposByOrg: OrgsWithReposInput[],
  userId: string
): Promise<Array<OrgsWithReposInput & { installationId: number }>> {
  const usersOrgsRes = await catchError(hasura.GetOrganizationsFromUserQuery({ user_id: userId }));

  if (threwError(usersOrgsRes)) {
    log.error('Database communication error fetching orgs for user ');
    throw new GraphQLYogaError('Error fetching orgs for user');
  }

  const installedOrgs = usersOrgsRes.organizations;

  const orgsWithInstallationIds = newReposByOrg.map((orgFromUser) => {
    const matchingFromDatabase = installedOrgs.find((o) => o.id === orgFromUser.id);
    if (!matchingFromDatabase) {
      log.error(
        'A user attempted to install from an installation they didnt have access to, most likely a hacking attempt.',
        newReposByOrg,
        installedOrgs
      );
      throw new GraphQLYogaError(
        'User not authenticated to install from this organization, this event has been logged.'
      );
    }
    if (!matchingFromDatabase.installation_id) {
      throw new GraphQLYogaError('Error, attempted to install to an org not linked to github');
    }
    return { ...orgFromUser, installationId: matchingFromDatabase.installation_id };
  });

  return orgsWithInstallationIds;
}
