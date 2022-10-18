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

import { hasura } from '../../../hasura-api';
import { SnapshotBuildInfo } from '../../../types/sqs';
import { log } from '../../../utils/log';
import { queueRepositoryForSnapshot } from '../../actions/queue-repository-for-snapshot';

export async function pullRequestHandler(event: EmitterWebhookEvent<'pull_request'>): Promise<void> {
  const actionName = event.payload.action;

  if (actionName === 'synchronize' || actionName === 'opened' || actionName === 'reopened') {
    if (!event.payload.installation) {
      log.error(`no installation found in pull request webhook`);
      return;
    }

    log.info('snapshotting repository for pull request');

    // TODO (cthompson) we need to start the github PR check here, and then in pr-comment-generator.ts, that is where
    // we update the check to say that it is finished.

    // logger.info('updating check status', {
    //   owner,
    //   repo,
    //   insertedCheckId,
    // });
    //
    // // Otherwise just update the existing review on the PR.  Very similar to above but we update instead
    // const githubReviewResponse = await octokit.rest.checks.update({
    //   owner,
    //   repo,
    //   check_run_id: insertedCheckId || previousReviewId,
    //   conclusion: scanReport.findings.length ? 'neutral' : 'success',
    //   completed_at: new Date().toISOString(),
    //   ...checkData,
    // });

    // const existing_github_check_id = githubReviewResponse.data.id;
    //
    // if (!existing_github_check_id) {
    //   return logger.error('Failed to generate a check, github responded ', {
    //     githubReviewResponse,
    //   });
    // }
    // logger.info('successfully updated the check');
    // // Put the ID onto the latest build also, in case we want to make sure later that it submitted successfully.
    // await hasura.UpdateBuildExistingCheckId({ id: buildId, existing_github_check_id });

    if (!event.payload.installation) {
      log.error(`no installation found in pull request webhook`);
      return;
    }

    const repositoryId = event.payload.repository.id;

    const getRepositoryResponse = await hasura.GetGithubRepositoriesByIds({ ids: [repositoryId] });
    if (getRepositoryResponse.github_repositories.length !== 1) {
      log.info('Received a webhook for a repository which is not imported, no-op.', {
        repositoryId,
        event,
      });
      return;
    }

    const projectId = getRepositoryResponse.github_repositories[0].project.id;
    log.info('snapshotting repository for pull request', {
      repositoryId,
      projectId,
    });

    // TODO (cthompson) we need to start the github PR check here, and then in pr-comment-generator.ts, that is where
    // we update the check to say that it is finished.

    // logger.info('updating check status', {
    //   owner,
    //   repo,
    //   insertedCheckId,
    // });
    //
    // // Otherwise just update the existing review on the PR.  Very similar to above but we update instead
    // const githubReviewResponse = await octokit.rest.checks.update({
    //   owner,
    //   repo,
    //   check_run_id: insertedCheckId || previousReviewId,
    //   conclusion: scanReport.findings.length ? 'neutral' : 'success',
    //   completed_at: new Date().toISOString(),
    //   ...checkData,
    // });

    // const existing_github_check_id = githubReviewResponse.data.id;
    //
    // if (!existing_github_check_id) {
    //   return logger.error('Failed to generate a check, github responded ', {
    //     githubReviewResponse,
    //   });
    // }
    // logger.info('successfully updated the check');
    // // Put the ID onto the latest build also, in case we want to make sure later that it submitted successfully.
    // await hasura.UpdateBuildExistingCheckId({ id: buildId, existing_github_check_id });

    const buildInfo: SnapshotBuildInfo = {
      projectId,
      cloneUrl: event.payload.repository.clone_url,
      gitBranch: event.payload.pull_request.head.ref, // TODO make this the human readable branch name, not the ref
      sourceType: 'pr',
      pullRequestId: event.payload.pull_request.node_id,
      gitCommit: event.payload.pull_request.head.sha,
    };

    const res = await queueRepositoryForSnapshot(event.payload.installation.id, event.payload.repository.id, buildInfo);
    if (res.error) {
      log.error('failed to queue repository for snapshot');
      return;
    }
    log.info('processed pull request');
  }
}
