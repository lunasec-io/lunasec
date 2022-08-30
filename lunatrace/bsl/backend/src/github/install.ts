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
import * as querystring from 'querystring';
import * as util from 'util';

import { Request, Response } from 'express';

import { getServerConfig } from '../config';
import { hasura } from '../hasura-api';
import { MaybeErrorVoid } from '../types/util';
import { errorResponse, newError, newResult } from '../utils/errors';
import { log } from '../utils/log';
import { tryParseInt } from '../utils/parse';
import { sleep } from '../utils/sleep';

import { getReposFromInstallation } from './actions/get-repos-from-installation';
import { getInstallationAccessToken } from './auth';

const serverConfig = getServerConfig();

// Installation happens from the installed webhook, which is async, so we poll until all repos are present in hasura
async function waitForGithubInstall(installationId: number, installationAuthToken: string): Promise<MaybeErrorVoid> {
  let attempts = 0;
  const maxAttempts = 10;

  const newRepos = await getReposFromInstallation(installationAuthToken, installationId);

  // TODO: Fix this with proper UI in the future. Logging of this error happens at the route handler
  if (newRepos.length > 200) {
    throw new Error(
      `Woops, you hit maximum number of installed repos. This is currently capped at 200 and you tried to install ${newRepos.length}. Please try again and select less repos. We will be fixing this issue soon.`
    );
  }
  const newRepoIds = newRepos.map((r) => r.repoId);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const reposFromHasuraQuery = await hasura.GetGithubRepositoriesByIds({
      ids: newRepoIds,
    });

    const existingRepos = reposFromHasuraQuery.github_repositories;

    if (existingRepos === undefined) {
      return newError(
        'Unable to verify Github App was installed successfully. Contact support if this problem persists.'
      );
    }

    const insertedIds = existingRepos.map((r) => r.github_id);

    const missingFromHasura = newRepos.filter((r) => !insertedIds.includes(r.repoId));

    const allReposAreInstalled = missingFromHasura.length === 0;
    if (allReposAreInstalled) {
      return newResult(undefined);
    }
    if (attempts >= maxAttempts) {
      const missingNames = missingFromHasura.map((r) => r.repoName).join(', ');
      return newError(`Failed to install repos, missing ${missingNames}`);
    }
    await sleep(1000);
    attempts += 1;
  }

  return newResult(undefined);
}

// All of this code just checks that we are properly authed, it's just a sanity check.
// We handle all the installation tasks such as populating repos in the github webhook queue handler for `installation.created`
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

  log.info('verifying Github App was installed correctly', {
    installationId,
  });

  const installationAuthToken = await getInstallationAccessToken(installationId);

  if (installationAuthToken.error) {
    log.error('unable to get authentication token for Github App');
    res.status(500).send(errorResponse(installationAuthToken.msg));
    return;
  }

  const error = req.query.error;
  const errorDescription = req.query.error_description;
  const errorUri = req.query.error_uri;

  if (error) {
    log.error('Error installing Github App', {
      installationId,
      error: errorDescription,
    });
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

  const installError = await waitForGithubInstall(installationId, installationAuthToken.res);

  if (installError.error) {
    log.error('unable to verify that Github App was installed successfully', {
      message: installError.msg,
      installationId,
    });
    const errorMsg = querystring.stringify({
      error: installError.msg,
    });
    res.status(302).redirect(serverConfig.sitePublicUrl + '?' + errorMsg);
    return;
  }

  log.info('Github App was installed successfully', {
    installationId,
  });

  res.status(302).redirect(serverConfig.sitePublicUrl);
}
