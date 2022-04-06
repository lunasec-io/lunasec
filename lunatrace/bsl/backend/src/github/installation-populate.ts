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

const PER_PAGE = 100;

export async function pullDataForInstallation(
  installationId: number
): Promise<ListReposAccessibleToInstallationResponseType> {
  const installationAuthenticationToken = await getInstallationAccessToken(installationId);

  const octokit = new Octokit({ auth: installationAuthenticationToken });

  const repos = [];

  // Cap at 10000 iterations just because infinite loops suck.
  for (let page = 1; page < 10000; page++) {
    console.log(`[installId: ${installationId}] Getting GitHub repos for installation, page #${page}`);

    // authenticates as app based on request URLs
    const response = await octokit.rest.apps.listReposAccessibleToInstallation({
      page: page,
      per_page: PER_PAGE,
    });

    console.log(
      `[installId: ${installationId}] GitHub repos for page #${page}: ${response.data.repositories.length}, total_count: ${response.data.total_count}`
    );

    repos.push(...response.data.repositories);

    if (repos.length >= response.data.total_count) {
      console.log(`[installId: ${installationId}] Successfully collected ${repos.length} repositories from GitHub`);
      return repos;
    }

    console.log(`[installId: ${installationId}] Detected paginated GitHub repositories`);
  }

  console.error(`[installId: ${installationId}] Hit max iterations for listing repos for installation`);

  throw new Error('Hit max iterations for listing repos for installation: ' + installationId.toString(10));
}
