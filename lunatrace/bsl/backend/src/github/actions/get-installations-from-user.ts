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

import { RawInstallation } from '../../types/github';
import { log } from '../../utils/log';
import { walkPagination } from '../helpers/walk-pagination';

export async function getInstallationsFromUser(userAccessToken: string): Promise<RawInstallation[]> {
  const octokit = new Octokit({ auth: userAccessToken });

  const iLog = log.child('fetchInstallationsFromGithubLogger');

  async function callGithub(page: number, perPage: number) {
    const response = await octokit.rest.apps.listInstallationsForAuthenticatedUser({
      page: page,
      per_page: perPage,
    });

    iLog.info(
      ` GitHub installations for page #${page}: ${response.data.installations.length}, total_count: ${response.data.total_count}`
    );
    return { newItems: response.data.installations, total: response.data.total_count };
  }

  return walkPagination(iLog, callGithub);
}
