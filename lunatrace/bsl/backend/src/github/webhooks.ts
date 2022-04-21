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
import {EmitterWebhookEvent, Webhooks } from '@octokit/webhooks';

import {hasura} from '../hasura-api';
import {GithubRepositoryInfo} from "../types/github";
import { log } from '../utils/log';

import {createHasuraOrgsAndProjectsForInstall} from "./actions/create-hasura-orgs-and-projects-for-install";
import {orgMemberAdded} from "./actions/org-member-added";
import {reviewPullRequest} from "./actions/review-pull-request";
import { getInstallationAccessToken } from './auth';
import {WebhookInterceptor} from './webhook-cache';

const webhookQueue = process.env.PROCESS_WEBHOOK_QUEUE;

if (!webhookQueue) {
  log.error('PROCESS_WEBHOOK_QUEUE is not set');
  throw new Error('PROCESS_WEBHOOK_QUEUE is not set');
}

export const webhooks = new WebhookInterceptor(hasura, webhookQueue, {
  secret: process.env.GITHUB_APP_WEBHOOK_SECRET || 'mysecret',
  log:logger,
});

async function repositoryAddedHandler(event: EmitterWebhookEvent<'installation_repositories.added'>) {
  const reposAdded = event.payload.repositories_added;

  const installationId = event.payload.installation.id;

  const orgName = event.payload.installation.account.login;
  const orgId = event.payload.installation.account.id;
  const orgNodeId = event.payload.installation.account.node_id;
  const ownerType = event.payload.installation.account.type;
  const githubRepos: GithubRepositoryInfo[] = reposAdded.map(repo => ({
    orgName,
    orgId,
    orgNodeId,
    repoName: repo.name,
    repoId: repo.id,
    repoNodeId: repo.node_id,
    gitUrl: `git://github.com/${repo.full_name}.git`,
    ownerType
  }));

  const installationAuthToken = await getInstallationAccessToken(installationId);

  if (installationAuthToken.error) {
    log.error('unable to get installation token', {
      error: installationAuthToken.msg
    })
    return;
  }

  const resp = await createHasuraOrgsAndProjectsForInstall(installationAuthToken.res, installationId, githubRepos)
  if (resp.error) {
    log.error('unable to create orgs and projects from github install', {
      error: resp.msg,
      githubRepos
    });
    return
  }
  log.info('created orgs and projects for new repos', {
    githubRepos
  })
}

async function organizationHandler(event: EmitterWebhookEvent<'organization'>) {
  log.debug('organization webhook event', {
    action: event.payload.action
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
  log.info('received pull request webhook for action: ', actionName)

  if (actionName === 'synchronize' || actionName === 'opened' || actionName === 'reopened') {
    if (!event.payload.installation) {
      log.error(`no installation found in pull request webhook`);
      log.info(event);
      return;
    }

    const pullRequestId = event.payload.pull_request.node_id;
    const cloneUrl = event.payload.repository.clone_url;
    const gitUrl = event.payload.repository.git_url;
    const gitBranch = event.payload.pull_request.head.ref;
    const installationId = event.payload.installation.id;

    await reviewPullRequest({
      installationId,
      pullRequestId,
      cloneUrl,
      gitUrl,
      gitBranch
    })
  }
}

// Wrap the hook in logging, pulls the type from octokit since this has the same signature
const listenToHook: typeof webhooks.on = (hookName, callback) =>{
  webhooks.on(hookName, async (event) => {
    const actionName = 'action' in event.payload ? event.payload.action : 'none given'
    await log.provideFields({loggerName:'webhook-logger', hookName, actionName}, async () => {
      await callback(event);
    })
  })
}

listenToHook('installation_repositories.added', repositoryAddedHandler);
listenToHook('pull_request', pullRequestHandler);
listenToHook('organization', organizationHandler);
