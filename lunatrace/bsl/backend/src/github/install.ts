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
import { errorResponse } from '../utils/errors';
import { log } from '../utils/log';
import { tryParseInt } from '../utils/parse';

import { upsertInstalledProjects } from './actions/upsert-installed-projects';
import { getInstallationAccessToken } from './auth';

const serverConfig = getServerConfig();

export async function githubInstall(req: Request, res: Response): Promise<void> {
  const installationIdQueryParam = req.query.installation_id;

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

  const installationAuthToken = await getInstallationAccessToken(installationId);

  if (installationAuthToken.error) {
    res.status(500).send(errorResponse(installationAuthToken.msg));
    return;
  }

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

  const upsertRes = await upsertInstalledProjects(installationAuthToken.res, installationId);
  if (upsertRes.error) {
    log.error('unable to create orgs and projects for install', {
      installationId,
      error: upsertRes.msg,
    });
    res.status(500).send(errorResponse(upsertRes.msg));
    return;
  }

  log.info('queueing repositories for snapshots', {
    installationId,
  });

  res.status(302).redirect(serverConfig.sitePublicUrl);
}
