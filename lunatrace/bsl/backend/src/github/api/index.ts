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
import { GraphQLClient } from 'graphql-request';

import { getSdk } from './generated';

const githubEndpoint = 'https://api.github.com/graphql';

export function generateGithubGraphqlClient(accessToken: string) {
  const client = new GraphQLClient(githubEndpoint, {
    headers: {
      authorization: `token ${accessToken}`,
    },
  });
  return getSdk(client);
}
