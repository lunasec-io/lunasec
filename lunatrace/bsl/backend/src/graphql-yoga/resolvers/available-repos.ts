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
import { getGithubAccessTokenFromKratos } from '../../kratos';
import { GithubRepositoryInfo, RawInstallation, RawRepositories } from '../../types/github';
import { Context } from '../context';
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
 */
export const availableOrgsWithRepos: AvailableOrgsWithReposType = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);

  const userToken = await getGithubUserToken(ctx);
  const installations = await getInstallationsFromUser(userToken);
  return Promise.all(installations.map(populateInstallationRepos));

  // const build = await hasura.GetBuild({ build_id: args.buildId });
  // await checkProjectIsAuthorized(build.builds_by_pk?.project?.id, ctx);
};

async function populateInstallationRepos(installation: RawInstallation): Promise<OrgWithRepos> {
  const installationId = installation.id;
  const installationTokenRes = await getInstallationAccessToken(installationId);
  if (installationTokenRes.error) {
    throw new GraphQLYogaError('Failed authenticating the installation with github: ' + installationTokenRes.msg);
  }
  const repos = await getReposFromInstallation(installationTokenRes.res, installationId);
  const organizationName = installation.account?.login || 'Unknown Organization';
  return { organizationName, installationId, repos };
}
