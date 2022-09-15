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

// TODO: Deprecated because we do not have access to this token reliably. We can resume doing things this way if we figure out how to keep githubs refresh token active
export async function getInstallationsFromUser(userAccessToken: string): Promise<RawInstallation[]> {
  const octokit = new Octokit({ auth: userAccessToken });

  const logger = log.child('fetch-installations-from-github-logger');

  async function callGithub(page: number, perPage: number) {
    logger.info(`listing installations for authenticated user`, {
      page,
      perPage,
    });

    const response = await octokit.rest.apps.listInstallationsForAuthenticatedUser({
      page: page,
      per_page: perPage,
    });

    logger.info(`GitHub installations for page`, {
      page,
      resultCount: response.data.installations.length,
      totalCount: response.data.total_count,
    });
    return { newItems: response.data.installations, total: response.data.total_count };
  }

  return walkPagination(logger, callGithub);
}
