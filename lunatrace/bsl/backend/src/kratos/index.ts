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
import { Configuration, V0alpha2ApiFactory } from '@ory/kratos-client';

import { KratosIdentityConfig } from '../types/kratos';

export async function getGithubAccessTokenFromKratos(userId: string) {
  const kratosConfig = new Configuration({
    basePath: 'http://localhost:4434',
  });

  const kratosApiClient = V0alpha2ApiFactory(kratosConfig);

  const kratosResp = await kratosApiClient.adminGetIdentity(userId, ['oidc']);

  const identity = kratosResp.data;

  if (!identity.credentials) {
    throw new Error('credentials are not set for identity');
  }

  const oidcCreds = identity.credentials['oidc'];
  if (!oidcCreds.config) {
    throw new Error('config is not set for oidc credentials');
  }

  const config = oidcCreds.config as KratosIdentityConfig;

  const githubProviders = config.providers.filter((provider) => provider.provider === 'github-app');
  if (githubProviders.length !== 1) {
    throw new Error('could not find exactly one github oidc provider');
  }

  const githubProvider = githubProviders[0];
  return githubProvider.initial_access_token;
}
