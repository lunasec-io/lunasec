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
import { GithubRepositoryInfo, RawInstallation } from '../../types/github';
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';
import { QueryResolvers } from '../generated-resolver-types';
import { getGithubUserToken, getUserId, throwIfUnauthenticated } from '../helpers/auth-helpers';

type AvailableOrgsWithReposType = NonNullable<QueryResolvers['availableOrgsWithRepos']>;

interface OrgWithRepos {
  organizationName: string;
  installationId: number;
  repos: GithubRepositoryInfo[];
}
/**
 * Gets the available repos accessible to a given user, so that we can show them in an install prompt where the user can choose which to import to lunatrace
 * Because the github API is clunky and we cant directly fetch the repos without knowing the installations, we first fetch the installationIds authenticated as the user,
 * and then fetch the repo list for each installation in parallel, authenticated as the installation
 */
export const availableOrgsWithRepos: AvailableOrgsWithReposType = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);

  const userToken = await getGithubUserToken(ctx);
  const installationsResult = await catchError(getInstallationsFromUser(userToken));
  if (threwError(installationsResult)) {
    const userId = getUserId(ctx);
    log.error('failed to get available orgs for user', {
      userId,
      error: installationsResult,
    });
    throw new GraphQLYogaError(`failed to get available orgs for user: ${userId}`);
  }

  return Promise.all(installationsResult.map(loadReposByInstallation));
};

async function loadReposByInstallation(installation: RawInstallation): Promise<OrgWithRepos> {
  const installationId = installation.id;
  const installationTokenRes = await getInstallationAccessToken(installationId);
  if (installationTokenRes.error) {
    throw new GraphQLYogaError(`failed authenticating the installation with github: ${installationTokenRes.msg}`);
  }
  const repos = await getReposFromInstallation(installationTokenRes.res, installationId);
  if (repos === null) {
    throw new GraphQLYogaError(`failed to get repos for installation: ${installationId}`);
  }

  const organizationName = installation.account?.login || 'Unknown Organization';
  return { organizationName, installationId, repos };
}
