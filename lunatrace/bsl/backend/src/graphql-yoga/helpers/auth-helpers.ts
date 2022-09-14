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

import { hasura } from '../../hasura-api';
import { getGithubAccessTokenFromKratos } from '../../kratos';
import { log } from '../../utils/log';
import { Context, ContextLoggedIn } from '../context';

// todo: make this an auth guard with annotations in the schema
export function throwIfUnauthenticated(ctx: Context): void {
  if (!isAuthenticated(ctx)) {
    log.warn('No parsed JWT claims with a user ID on route that required authorization, throwing a graphql error');
    throw new GraphQLYogaError('Unauthorized');
  }
}

export function isAuthenticated(ctx: Context): ctx is ContextLoggedIn {
  if (!ctx.req.user || !ctx.req.user['https://hasura.io/jwt/claims']) {
    return false;
  }
  const claims = ctx.req.user['https://hasura.io/jwt/claims'];
  if (!claims['x-hasura-user-id'] || !claims['x-hasura-real-user-id']) {
    return false;
  }
  return true;
}

export function getUserId(ctx: Context): string {
  if (!ctx.req.user) {
    log.warn('No parsed JWT claims on route that required authorization, throwing a graphql error');
    throw new GraphQLYogaError('Unauthorized');
  }
  const claims = ctx.req.user;
  const userId = claims['https://hasura.io/jwt/claims']['x-hasura-user-id'];
  if (!userId) {
    throw new GraphQLYogaError('Failed to get User Id from JWT');
  }
  return userId;
}

export async function checkProjectIsAuthorized(projectId: string, ctx: Context): Promise<void> {
  const userId = getUserId(ctx);
  const usersAuthorizedProjects = await hasura.GetUsersProjects({ user_id: userId });
  const userIsAuthorized = usersAuthorizedProjects.projects.some((p) => {
    return p.id === projectId;
  });
  if (!userIsAuthorized) {
    throw new GraphQLYogaError('Not authorized for this project');
  }
  return;
}

export async function getGithubUserToken(ctx: Context): Promise<string> {
  const userId = getUserId(ctx);
  const githubUserTokenRes = await getGithubAccessTokenFromKratos(userId);
  if (githubUserTokenRes.error) {
    throw new GraphQLYogaError(githubUserTokenRes.message);
  }
  return githubUserTokenRes.token;
}
