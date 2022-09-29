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

import { getInstallationsFromUser } from '../../github/actions/get-installations-from-user';
import { getReposFromInstallation } from '../../github/actions/get-repos-from-installation';
import { getInstallationAccessToken } from '../../github/auth';
import { hasura } from '../../hasura-api';
import { GetOrganizationsFromUserQueryQuery } from '../../hasura-api/generated';
import { GithubRepositoryInfo, RawInstallation } from '../../types/github';
import { log } from '../../utils/log';
import { notEmpty } from '../../utils/predicates';
import { catchError, threwError } from '../../utils/try';
import { QueryResolvers } from '../generated-resolver-types';
import { getGithubUserToken, getUserId, isAuthenticated, throwIfUnauthenticated } from '../helpers/auth-helpers';

type AvailableOrgsWithReposType = NonNullable<QueryResolvers['availableOrgsWithRepos']>;

interface OrgWithRepos {
  organizationName: string;
  id: string;
  repos: GithubRepositoryInfo[];
}
/**
 * Gets the available repos accessible to a given user, so that we can show them in an install prompt where the user can choose which to import to lunatrace
 * Because the github API is clunky and we cant directly fetch the repos without knowing the installations, we first fetch the installationIds authenticated as the user,
 * and then fetch the repo list for each installation in parallel, authenticated as the installation
 */
export const availableOrgsWithReposResolver: AvailableOrgsWithReposType = async (parent, args, ctx, info) => {
  if (!isAuthenticated(ctx)) {
    log.warn('No parsed JWT claims with a user ID on route that required authorization, throwing a graphql error');
    throw new GraphQLYogaError('Unauthorized');
  }

  const userId = ctx.req.user['https://hasura.io/jwt/claims']['x-hasura-real-user-id'];

  const orgsQuery = await catchError(hasura.GetOrganizationsFromUserQuery({ user_id: userId }));
  if (threwError(orgsQuery)) {
    throw new GraphQLYogaError('Database Connection Error fetching orgs');
  }

  const orgs = orgsQuery.organizations;

  const orgDataWithNulls = await Promise.all(orgs.map(loadReposByOrganization));
  const orgData = orgDataWithNulls.filter((o) => o !== null) as OrgWithRepos[];
  return orgData;
};

async function loadReposByOrganization(
  organization: NonNullable<GetOrganizationsFromUserQueryQuery>['organizations'][number]
): Promise<OrgWithRepos | null> {
  try {
    const installationId = organization.installation_id;
    if (!installationId) {
      throw new GraphQLYogaError('Missing installationId for organization, that should be physically impossible');
    }
    const installationTokenRes = await getInstallationAccessToken(installationId);
    if (installationTokenRes.error) {
      throw new GraphQLYogaError(`failed authenticating the installation with github: ${installationTokenRes.msg}`);
    }
    const repos = await getReposFromInstallation(installationTokenRes.res, installationId);
    if (repos === null) {
      throw new GraphQLYogaError(`failed to get repos for installation: ${installationId}`);
    }

    return { organizationName: organization.name, id: organization.id, repos };
  } catch (e) {
    log.warn(
      'Failed to fetch repos for the org, this is typically an auth error because the org has been uninstalled, returning null so that we dont show it',
      { error: e }
    );
    return null;
  }
}
