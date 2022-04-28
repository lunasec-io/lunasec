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

import { RepositoriesForInstallationResponse } from '../../types/github';
import { log } from '../../utils/log';

const PER_PAGE = 100;

export async function getGithubReposForInstallation(
  authToken: string,
  installationId: number
): Promise<RepositoriesForInstallationResponse> {
  const octokit = new Octokit({ auth: authToken });

  const repos = [];

  // Cap at 10000 iterations just because infinite loops suck.
  for (let page = 1; page < 10000; page++) {
    log.info(`[installId: ${installationId}] Getting GitHub repos for installation, page #${page}`);

    // authenticates as app based on request URLs
    const response = await octokit.rest.apps.listReposAccessibleToInstallation({
      page: page,
      per_page: PER_PAGE,
    });

    log.info(
      `[installId: ${installationId}] GitHub repos for page #${page}: ${response.data.repositories.length}, total_count: ${response.data.total_count}`
    );

    repos.push(...response.data.repositories);

    if (repos.length >= response.data.total_count) {
      log.info(`[installId: ${installationId}] Successfully collected ${repos.length} repositories from GitHub`);
      return repos;
    }

    log.info(`[installId: ${installationId}] Detected paginated GitHub repositories`);
  }

  log.error(`[installId: ${installationId}] Hit max iterations for listing repos for installation`);

  throw new Error('Hit max iterations for listing repos for installation: ' + installationId.toString(10));
}
