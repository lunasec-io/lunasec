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
import { EmitterWebhookEvent } from '@octokit/webhooks';
import { Octokit } from 'octokit';

import { GithubRepositoryInfo, RepositoryResponse } from '../../types/github';
import { log } from '../../utils/log';
import { orgMemberAdded } from '../actions/org-member-added';
import { queueNewReposForSnapshot } from '../actions/queue-new-repos-for-snapshot';
import { queueRepositoryForSnapshot } from '../actions/queue-repository-for-snapshot';
import { upsertInstalledProjects } from '../actions/upsert-installed-projects';
import { getInstallationAccessToken } from '../auth';

import { WebhookInterceptor } from './interceptor';

export function registerWebhooksToInterceptor(interceptor: WebhookInterceptor): void {
  // Wrap the hook in logging, pulls the type from octokit since this has the same signature
  const listenToHook: typeof interceptor.on = (hookName, callback) => {
    interceptor.on(hookName, async (event) => {
      const actionName = 'action' in event.payload ? event.payload.action : 'none given';
      await log.provideFields({ trace: 'webhook-logger', hookName, actionName }, async () => {
        await callback(event);
      });
    });
  };

  listenToHook('installation_repositories.added', repositoriesAddedHandler);
  listenToHook('pull_request', pullRequestHandler);
  listenToHook('organization', organizationHandler);
}

async function repositoriesAddedHandler(event: EmitterWebhookEvent<'installation_repositories.added'>) {
  log.info({ event }, 'Processing repositories added event');
  const installationId = event.payload.installation.id;
  const installationAuthToken = await getInstallationAccessToken(installationId);
  console.log('full event is ', JSON.stringify(event));
  if (installationAuthToken.error) {
    log.error('unable to get installation token', {
      error: installationAuthToken.msg,
    });
    return;
  }

  // const reposFromEvent = event.payload.repositories_added;
  //
  // // The event doesnt have all the data we need so we have to go fetch more from github
  // const octokit = new Octokit({ auth: installationAuthToken.res });
  // const githubRepos: GithubRepositoryInfo[] = await Promise.all(
  //   reposFromEvent.map(async (repoEvent) => {
  //     const repoRes = await octokit.request('GET /repository/{id}', {
  //       id: repoEvent.id,
  //     });
  //     if (repoRes.status !== 200) {
  //       log.error({ repoRes, repoEvent }, 'Failed to fetch repo from github during repo added webhook handler');
  //       throw new Error('Failed to fetch repo from github');
  //     }
  //     const repoData = repoRes.data as RepositoryResponse;
  //     return {
  //       orgName: repoData.owner.login,
  //       orgId: repoData.owner.id,
  //       orgNodeId: repoData.owner.node_id,
  //       repoName: repoData.name,
  //       repoId: repoData.id,
  //       repoNodeId: repoData.node_id,
  //       gitUrl: repoData.git_url,
  //       ownerType: repoData.owner.type,
  //       defaultBranch: repoData.default_branch,
  //       cloneUrl: repoData.clone_url,
  //       fullTraits: repoData,
  //     };
  //   })
  // );

  const upsertedRepos = await upsertInstalledProjects(installationAuthToken.res, installationId);
  if (upsertedRepos.error) {
    log.error('unable to create orgs and projects from github install', {
      error: upsertedRepos.msg,
    });
    return;
  }
  log.info('created orgs and projects for new repos');

  const snapshotResp = await queueNewReposForSnapshot(installationId, upsertedRepos.res);
  if (snapshotResp.error) {
    log.error('unable to queue github repos', {
      upsertedRepos,
    });
    return;
  }
  log.info('queued github repos for snapshots', {
    upsertedRepos,
  });
}

async function organizationHandler(event: EmitterWebhookEvent<'organization'>) {
  log.debug('organization webhook event', {
    action: event.payload.action,
  });
  if (event.payload.action === 'member_added') {
    if (!event.payload.installation) {
      log.error('organization member_added has undefined installation', event.payload);
      return;
    }

    const installationId = event.payload.installation.id;
    const githubNodeId = event.payload.membership.user.node_id;

    await orgMemberAdded(installationId, githubNodeId);
  }
}

async function pullRequestHandler(event: EmitterWebhookEvent<'pull_request'>) {
  const actionName = event.payload.action;
  log.info('received pull request webhook for action: ', actionName);

  if (actionName === 'synchronize' || actionName === 'opened' || actionName === 'reopened') {
    if (!event.payload.installation) {
      log.error(`no installation found in pull request webhook`);
      log.info(event);
      return;
    }

    await queueRepositoryForSnapshot(event.payload.installation.id, {
      cloneUrl: event.payload.repository.clone_url,
      gitBranch: event.payload.pull_request.head.ref, // TODO make this the human readable branch name, not the ref
      repoGithubId: event.payload.repository.id,
      installationId: event.payload.installation.id,
      sourceType: 'pr',
      pullRequestId: event.payload.pull_request.node_id,
      gitCommit: event.payload.pull_request.head.sha,
    });
  }
}
