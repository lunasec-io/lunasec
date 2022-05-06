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

import { getHasuraConfig } from '../../config';
import { log } from '../../utils/log';
import { Context } from '../context';

const hasuraConfig = getHasuraConfig();

// todo: make this an auth guard with annotations in the schema
export function throwIfUnauthenticated(ctx: Context): void {
  if (!ctx.req.user) {
    log.warn('No parsed JWT claims on route that required authorization, throwing a graphql error');
    throw new GraphQLYogaError('Unauthorized');
  }
}

export function throwIfNotService(ctx: Context): void {
  const userToken = ctx.req.headers.get('X-LunaTrace-Access-Token');

  // TODO: Make this read from Secrets Manager instead.
  if (!userToken || userToken !== hasuraConfig.staticAccessToken) {
    throw new GraphQLYogaError('Unauthorized');
  }
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
