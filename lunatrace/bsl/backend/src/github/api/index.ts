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

import { MaybeError } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { getInstallationAccessToken } from '../auth';

import { getSdk, Sdk } from './generated';

const githubEndpoint = 'https://api.github.com/graphql';

export async function generateGithubGraphqlClient(installationId: number): Promise<MaybeError<Sdk>> {
  const installationToken = await getInstallationAccessToken(installationId);

  if (installationToken.error) {
    const msg = 'unable to get installation token';
    log.error(msg, {
      error: installationToken.msg,
    });
    return newError(msg);
  }
  const accessToken = installationToken.res;

  const client = new GraphQLClient(githubEndpoint, {
    headers: {
      authorization: `token ${accessToken}`,
    },
  });
  return newResult(getSdk(client));
}
