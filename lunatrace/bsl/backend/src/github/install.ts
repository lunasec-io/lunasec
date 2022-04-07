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
import { Request, Response } from 'express';

import { getServerConfig } from '../config';
import { createLunatraceOrgsFromGithubOrgs } from '../hasura/actions/create-lunatrace-orgs-from-github-orgs';
import { RepositoriesForInstallationResponse } from '../types/github';
import { errorResponse, logError } from '../utils/errors';
import { log } from '../utils/log';
import { tryParseInt } from '../utils/parse-int';
import { isError, Try, tryF } from '../utils/try';

import { getReposForInstallation } from './actions/get-repos-for-installation';

const serverConfig = getServerConfig();

export async function githubInstall(req: Request, res: Response): Promise<void> {
  const installationIdQueryParam = req.query.installation_id;
  const setupActionQueryParam = req.query.setup_action;

  if (!installationIdQueryParam || typeof installationIdQueryParam !== 'string') {
    res.status(401).send(errorResponse('installation_id not provided in query params'));
    return;
  }

  const installationIdRet = tryParseInt(installationIdQueryParam, 10);

  if (!installationIdRet.success) {
    res.status(401).send(errorResponse('installation_id is not a valid integer'));
    return;
  }

  const installationId = installationIdRet.value;

  log.info(`[installId: ${installationId}] Installing Github App to organization`);

  const error = req.query.error;
  const errorDescription = req.query.error_description;
  const errorUri = req.query.error_uri;

  if (error) {
    log.info(`[installId: ${installationId}] Error installing Github App: ${errorDescription}`);
    res.status(401).send(
      errorResponse(
        JSON.stringify({
          error: error,
          description: errorDescription,
          uri: errorUri,
        })
      )
    );
    return;
  }

  const repositories: Try<RepositoriesForInstallationResponse> = await tryF(
    async () => await getReposForInstallation(installationId)
  );

  if (isError(repositories)) {
    logError(repositories);
    res.status(500).send(errorResponse('unable to collect Github information for install.'));
    return;
  }

  log.info(`[installId: ${installationId}] Collected installation data: ${repositories.map((repo) => repo.name)}`);

  const orgIds = await createLunatraceOrgsFromGithubOrgs(installationId, repositories);

  if (orgIds.error) {
    res.status(500).send(errorResponse(orgIds.msg));
    return;
  }

  log.info(`[installId: ${installationId}] Created/updated LunaTrace organizations: ${orgIds.res}`);

  res.status(302).redirect(serverConfig.sitePublicUrl);
}
