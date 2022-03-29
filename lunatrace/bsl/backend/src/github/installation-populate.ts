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

import { Octokit } from 'octokit';

import { ListReposAccessibleToInstallationResponseType } from '../types/github';

import { getInstallationAccessToken } from './auth';

export async function pullDataForInstallation(
  installationId: number
): Promise<ListReposAccessibleToInstallationResponseType> {
  const installationAuthenticationToken = await getInstallationAccessToken(installationId);

  const octokit = new Octokit({ auth: installationAuthenticationToken });

  // authenticates as app based on request URLs
  return await octokit.rest.apps.listReposAccessibleToInstallation({});
}
