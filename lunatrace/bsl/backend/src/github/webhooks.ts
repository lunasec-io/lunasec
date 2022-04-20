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
import {EmitterWebhookEvent, Webhooks} from '@octokit/webhooks';

import { generateSbomFromAsset } from '../cli/call-cli';
import {hasura} from "../hasura-api";
import {GetProjectIdFromGitUrlQuery, InsertBuildMutation} from '../hasura-api/generated';
import {logError} from "../utils/errors";
import {normalizeGithubId} from "../utils/github";
import { logger } from '../utils/logger';
import { catchError, threwError, Try } from '../utils/try';
import {uploadSbomToS3} from "../workers/generate-sbom";

import { getInstallationAccessToken } from './auth';
import {WebhookInterceptor} from './webhook-cache';

const webhookQueue = process.env.PROCESS_WEBHOOK_QUEUE;

if (!webhookQueue) {
  logger.error('PROCESS_WEBHOOK_QUEUE is not set');
  throw new Error('PROCESS_WEBHOOK_QUEUE is not set');
}

export const webhooks = new WebhookInterceptor(hasura, webhookQueue, {
  secret: process.env.GITHUB_APP_WEBHOOK_SECRET || 'mysecret',
});

async function organizationHandler(event:EmitterWebhookEvent<'organization'>) {
  logger.debug('organization webhook event', {
    action: event.payload.action
  });
  if (event.payload.action === 'member_added') {
    if (!event.payload.installation) {
      logger.error('organization member_added has undefined installation', event.payload);
      return;
    }

    const installationId = event.payload.installation.id;
    const githubNodeId = event.payload.membership.user.node_id;
    const githubId = normalizeGithubId(githubNodeId);

    logger.info('organization member_added, associating user with organization identified by installation id', {
      installationId,
      githubNodeId
    });

      // create or get an existing user
    const user = await catchError(async () => await hasura.UpsertUserFromId({
      user: {
        github_id: githubId,
        github_node_id: githubNodeId,
      }
    }));

    if (threwError(user)) {
      logError(user);
      return;
    }

    if (!user.insert_users_one) {
      logger.error('unable to upsert user with github node id', {
        installationId,
        githubNodeId
      });
      return;
    }
    const userId = user.insert_users_one.id;

    // get the organization that is referred to by the installation id
    const org = await catchError(async () => await hasura.GetOrganizationFromInstallationId({
      installation_id: installationId
    }))

    if (threwError(org)) {
      logError(org);
      return;
    }

    if (org.organizations.length !== 1) {
      logger.error('organizations for installation id is not exactly one result', {
        installationId,
        githubNodeId
      });
      return;
    }

    const orgId = org.organizations[0].id;

    // create the association between the two
    const res = await catchError(async () => await hasura.UpsertOrganizationUsers({
      organizationUsers: [{
        user_id: userId,
        organization_id: orgId
      }]
    }));

    if (threwError(res)) {
      logError(res);
      return;
    }

    logger.info('created user and associated it with organization identified by installation id', {
      installationId,
      githubNodeId,
      orgId,
      userId
    })
  }
}



async function pullRequestHandler(event:EmitterWebhookEvent<'pull_request'>) {
  const actionName = event.payload.action;
  console.log('received pull request webhook for action: ', actionName)

  if (actionName === 'synchronize' || actionName === 'opened' || actionName === 'reopened') {
    const cloneUrl = event.payload.repository.clone_url;
    const gitUrl = event.payload.repository.git_url;
    const gitBranch = event.payload.pull_request.head.ref;
    const pullRequestId = event.payload.pull_request.node_id;

    logger.info(`generating SBOM for repository: ${cloneUrl} at branch name ${gitBranch}`);

    const projectIdRes: Try<GetProjectIdFromGitUrlQuery> = await catchError(
      async () =>
        await hasura.GetProjectIdFromGitUrl({
          git_url: gitUrl,
        })
    );

    if (threwError(projectIdRes)) {
      logger.error('unable to get project from git url in pull request webhook');
      return;
    }

    if (projectIdRes.github_repositories.length === 0) {
      logger.error('no projects were found with provided git url in pull request webhook');
      return;
    }

    const projectId = projectIdRes.github_repositories[0].project.id as string;

    if (!event.payload.installation) {
      logger.error(`no installation found in pull request webhook`);
      logger.info(event);
      return;
    }
    const installationId = event.payload.installation.id;

    const installationToken = await getInstallationAccessToken(installationId);

    const parsedGitUrl = new URL(cloneUrl);
    parsedGitUrl.username = 'x-access-token';
    parsedGitUrl.password = installationToken;

    const gzippedSbom = generateSbomFromAsset('repository', parsedGitUrl.toString(), gitBranch);

    const insertBuildResponse: Try<InsertBuildMutation> = await catchError(
      async () => await hasura.InsertBuild({ project_id: projectId, pull_request_id: pullRequestId, source_type: 'pr' })
    );

    if (threwError(insertBuildResponse)) {
      logger.error('Failed to insert a new build', {
        error: insertBuildResponse,
      });
      throw new Error('Failed to insert a new build');
    }

    const { insert_builds_one } = insertBuildResponse;

    logger.info('Insert Build Response:', {
      insert_builds_one,
    });

    if (!insert_builds_one || insert_builds_one.id === undefined) {
      logger.error('Missing id in insert build response', {
        insert_builds_one,
      });
      throw new Error('Missing id in insert build response');
    }

    const buildId = insert_builds_one.id as string;

    logger.info('Uploading result to S3:', {
      installationId: installationId.toString(),
      buildId,
    });

    await uploadSbomToS3(installationId.toString(), buildId, gzippedSbom);
  }
}

// Wrap the hook in logging.. just pulls the type from octokit since this has the same signature
const listenToHook:typeof webhooks.on = (hookName, callback) =>{
  webhooks.on(hookName, async (event) => {
    const actionName = 'action' in event.payload ? event.payload.action : 'none given'
    await logger.provideFields({loggerName:'webhook-logger', hookName, actionName}, async () => {
      await callback(event);
    })
  })
}

listenToHook('pull_request', pullRequestHandler)
listenToHook('organization', organizationHandler)
