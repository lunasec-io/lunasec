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
import { GithubRepositoryInfo, RepositoriesForInstallationResponse } from '../types/github';
import { errorResponse, logError, newError } from '../utils/errors';
import { log } from '../utils/log';
import { tryParseInt } from '../utils/parse';
import { catchError, threwError, Try } from '../utils/try';

import { createHasuraOrgsAndProjectsForInstall } from './actions/create-hasura-orgs-and-projects-for-install';
import { getGithubReposForInstallation } from './actions/get-github-repos-for-installation';
import { queueGithubReposForSnapshots } from './actions/queue-repositories-for-snapshosts';
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

  const repositories: Try<RepositoriesForInstallationResponse> = await catchError(
    async () => await getGithubReposForInstallation(installationAuthToken.res, installationId)
  );

  if (threwError(repositories)) {
    logError(repositories);
    res.status(500).send(errorResponse('unable to collect Github information for install.'));
    return;
  }

  const githubRepos: GithubRepositoryInfo[] = repositories.reduce((repos, repo) => {
    const repoInfo = {
      orgName: repo.owner.login,
      orgId: repo.owner.id,
      orgNodeId: repo.owner.node_id,
      repoName: repo.name,
      repoId: repo.id,
      repoNodeId: repo.node_id,
      gitUrl: repo.git_url,
      ownerType: repo.owner.type,
    };
    return [...repos, repoInfo];
  }, [] as GithubRepositoryInfo[]);

  log.info(`Collected installation data`, {
    installationId,
    githubRepos: githubRepos.map((repo) => ({
      orgName: repo.orgName,
      repoName: repo.repoName,
    })),
  });

  const resp = await createHasuraOrgsAndProjectsForInstall(installationAuthToken.res, installationId, githubRepos);
  if (resp.error) {
    log.error('unable to create orgs and projects for install', {
      installationId,
      error: resp.msg,
    });
    res.status(500).send(errorResponse(resp.msg));
    return;
  }

  log.info('queueing repositories for snapshots', {
    installationId,
    repoCount: githubRepos.length,
  });

  const queueResp = await catchError(queueGithubReposForSnapshots(installationId, githubRepos));

  if (threwError(queueResp) || queueResp.error) {
    log.warn('unable to queue repositories, continuing with the installation', {
      installationId,
      error: threwError(queueResp) ? queueResp.message : queueResp.msg,
    });
  }

  log.info('completed queueing repositories for snapshots', {
    installationId,
    repoCount: githubRepos.length,
  });

  res.status(302).redirect(serverConfig.sitePublicUrl);
}
