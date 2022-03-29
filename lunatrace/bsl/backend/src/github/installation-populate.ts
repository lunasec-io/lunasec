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
import { Octokit } from 'octokit';

import { getGithubAppConfig } from '../config';
import { ListReposAccessibleToInstallationResponseType } from '../types/github';

const githubAppConfig = getGithubAppConfig();

export function getGithubAppAuth(clientInfo?: { clientId: string; clientSecret: string }) {
  return createAppAuth({
    appId: githubAppConfig.githubAppId,
    privateKey: githubAppConfig.githubPrivateKey,
    ...clientInfo,
  });
}

export async function getGithubInstallationToken(installationId: number) {
  const auth = getGithubAppAuth();

  // Retrieve installation access token
  const installationAuthentication = await auth({
    type: 'installation',
    installationId: installationId,
  });
  return installationAuthentication.token;
}

export async function pullDataForInstallation(
  installationId: number
): Promise<ListReposAccessibleToInstallationResponseType> {
  const installationToken = await getGithubInstallationToken(installationId);

  const octokit = new Octokit({ auth: installationToken });

  // authenticates as app based on request URLs
  return await octokit.rest.apps.listReposAccessibleToInstallation({});
}
