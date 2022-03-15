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
import fs from 'fs';

import { createAppAuth } from '@octokit/auth-app';
import { App, Octokit } from 'octokit';

const githubPrivateKeyRaw = process.env.GITHUB_APP_PRIVATE_KEY;

if (!githubPrivateKeyRaw || typeof githubPrivateKeyRaw !== 'string') {
  throw new Error('Must specify GitHub App Private Key in GITHUB_APP_PRIVATE_KEY');
}

const githubPrivateKey = Buffer.from(githubPrivateKeyRaw, 'base64').toString('utf-8');

const githubAppIdRaw = process.env.GITHUB_APP_ID;

if (!githubAppIdRaw || typeof githubAppIdRaw !== 'string') {
  throw new Error('Must specify GitHub App Id in GITHUB_APP_ID');
}

const githubAppId = parseInt(githubAppIdRaw, 10);

export function getGithubAppAuth(clientInfo?: { clientId: string; clientSecret: string }) {
  return createAppAuth({
    appId: githubAppId,
    privateKey: githubPrivateKey,
    ...clientInfo,
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function pullDataForInstallation(installationId: number) {
  const auth = getGithubAppAuth();

  // Retrieve installation access token
  const installationAuthentication = await auth({
    type: 'installation',
    installationId: installationId,
  });

  const octokit = new Octokit({ auth: installationAuthentication.token });

  // authenticates as app based on request URLs
  return await octokit.rest.apps.listReposAccessibleToInstallation({});
}
