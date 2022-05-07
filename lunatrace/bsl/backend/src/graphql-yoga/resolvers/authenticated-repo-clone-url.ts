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
import { getRepoCloneUrlWithAuth } from '../../github/actions/get-repo-clone-url-with-auth';
import { log } from '../../utils/log';
import { MutationResolvers, QueryResolvers } from '../generated-resolver-types';

import { getUserId } from './auth-helpers';

type AuthenticatedRepoCloneUrlResolver = NonNullable<QueryResolvers['authenticatedRepoCloneUrl']>;

export const authenticatedRepoCloneUrlResolver: AuthenticatedRepoCloneUrlResolver = async (parent, args, ctx, info) => {
  const kratosUserId = getUserId(ctx);

  log.info('getting authenticated repo clone url', {
    userId: kratosUserId,
    repoGithubId: args.repoGithubId,
  });

  const cloneUrl = await getRepoCloneUrlWithAuth(args.repoGithubId, kratosUserId);
  if (cloneUrl.error) {
    return { error: false, url: undefined };
  }

  return { error: false, url: cloneUrl.res.cloneUrl };
};
