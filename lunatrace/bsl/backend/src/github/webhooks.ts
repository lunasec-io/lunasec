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
import { Webhooks } from '@octokit/webhooks';

import { generateSbomFromAsset } from '../cli/call-cli';
import { hasura } from '../hasura-api';
import { GetProjectIdFromGitUrlQuery, InsertBuildMutation } from '../hasura-api/generated';
import { uploadSbomToS3 } from '../sqs-handlers/generate-sbom';
import { isError, Try, tryF } from '../utils/try';

import { getInstallationAccessToken } from './auth';
import { GetUserOrganizationsQuery } from './generated';

export const webhooks = new Webhooks({
  secret: process.env.GITHUB_APP_WEBHOOK_SECRET || 'mysecret',
});

webhooks.on('pull_request', async (event) => {
  if (event.payload.action === 'synchronize') {
    const cloneUrl = event.payload.repository.clone_url;
    const gitUrl = event.payload.repository.git_url;
    const gitBranch = event.payload.pull_request.head.ref;
    const pullRequestId = event.payload.pull_request.node_id;

    console.log(`generating SBOM for repository: ${cloneUrl} at branch name ${gitBranch}`);

    const projectIdRes: Try<GetProjectIdFromGitUrlQuery> = await tryF(
      async () =>
        await hasura.GetProjectIdFromGitUrl({
          git_url: gitUrl,
        })
    );

    if (isError(projectIdRes)) {
      console.error('unable to get project from git url in pull request webhook');
      return;
    }

    if (projectIdRes.github_repositories.length === 0) {
      console.error('no projects were found with provided git url in pull request webhook');
      return;
    }

    const projectId = projectIdRes.github_repositories[0].project.id as string;

    if (!event.payload.installation) {
      console.error(`no installation found in pull request webhook`);
      console.log(event);
      return;
    }
    const installationId = event.payload.installation.id;

    const installationToken = await getInstallationAccessToken(installationId);

    const parsedGitUrl = new URL(cloneUrl);
    parsedGitUrl.username = 'x-access-token';
    parsedGitUrl.password = installationToken;

    const gzippedSbom = generateSbomFromAsset('repository', parsedGitUrl.toString(), gitBranch);

    const insertBuildResponse: Try<InsertBuildMutation> = await tryF(
      async () => await hasura.InsertBuild({ project_id: projectId, pull_request_id: Number(pullRequestId) })
    );

    if (isError(insertBuildResponse)) {
      console.error('Failed to insert a new build', {
        error: insertBuildResponse,
      });
      throw new Error('Failed to insert a new build');
    }

    const { insert_builds_one } = insertBuildResponse;

    console.log('Insert Build Response:', {
      insert_builds_one,
    });

    if (!insert_builds_one || insert_builds_one.id === undefined) {
      console.error('Missing id in insert build response', {
        insert_builds_one,
      });
      throw new Error('Missing id in insert build response');
    }

    const buildId = insert_builds_one.id as string;

    console.log('Uploading result to S3:', {
      installationId: installationId.toString(),
      buildId,
    });

    await uploadSbomToS3(installationId.toString(), buildId, gzippedSbom);
  }
});
