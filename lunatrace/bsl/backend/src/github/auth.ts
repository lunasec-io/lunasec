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

import { createAppAuth } from '@octokit/auth-app';
import { GraphQLClient } from 'graphql-request';

import { getGithubAppConfig } from '../config';
import { MaybeError } from '../types/util';
import { newError, newResult } from '../utils/errors';
import { catchError, threwError } from '../utils/try';

import { getSdk, Sdk } from './api/generated';

const githubAppConfig = getGithubAppConfig();

// TODO: The return type for Octokit is weird and not obviously exported, at least according to me IDE.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getGithubAppAuth(clientInfo?: { clientId: string; clientSecret: string }) {
  return createAppAuth({
    appId: githubAppConfig.githubAppId,
    privateKey: githubAppConfig.githubPrivateKey,
    // TODO: Make caching use Postgres instead of an in-memory LRU cache
    // cache: {
    //   async get(key: string) {
    //     return; // Get the access_token from Postgres
    //   },
    //   async set(key, value) {
    //     return; // Set the access_token into Postgres with an expiration of (60 - 1) minutes
    //   }
    // },
    ...clientInfo,
  });
}

// TODO (cthompson) catch error thrown by auth
export async function getInstallationAccessToken(installationId: number): Promise<MaybeError<string>> {
  const auth = getGithubAppAuth();

  // Retrieves the installation access token
  const installationAuthentication = await catchError(
    async () =>
      await auth({
        type: 'installation',
        installationId: installationId,
      })
  );

  if (threwError(installationAuthentication)) {
    return newError(installationAuthentication.message);
  }
  return newResult(installationAuthentication.token);
}

export function getGithubGraphqlClient(accessToken: string): Sdk {
  const client = new GraphQLClient(githubAppConfig.githubEndpoint, {
    headers: {
      authorization: `token ${accessToken}`,
    },
  });
  return getSdk(client);
}
