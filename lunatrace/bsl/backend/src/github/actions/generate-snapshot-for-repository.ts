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
import { generateSbomFromAsset } from '../../cli/call-cli';
import { hasura } from '../../hasura-api';
import { GetProjectIdFromGitUrlQuery, InsertBuildMutation } from '../../hasura-api/generated';
import { GenerateSnapshotForRepositoryRecord } from '../../types/sqs';
import { MaybeError } from '../../types/util';
import { log } from '../../utils/log';
import { catchError, threwError, Try } from '../../utils/try';
import { uploadSbomToS3 } from '../../workers/generate-sbom';
import { getInstallationAccessToken } from '../auth';

export async function generateSnapshotForRepository(
  record: GenerateSnapshotForRepositoryRecord
): Promise<MaybeError<undefined>> {
  log.info(`generating SBOM for repository: ${record.cloneUrl} at branch name ${record.gitBranch}`);

  const projectIdRes: Try<GetProjectIdFromGitUrlQuery> = await catchError(
    async () =>
      await hasura.GetProjectIdFromGitUrl({
        github_id: record.repoGithubId,
      })
  );

  if (threwError(projectIdRes)) {
    const msg = 'unable to get project from git url in pull request webhook';
    log.error(msg);
    return {
      error: true,
      msg,
    };
  }

  if (projectIdRes.github_repositories.length === 0) {
    const msg = 'no projects were found with provided git url in pull request webhook';
    log.error(msg);
    return {
      error: true,
      msg,
    };
  }

  const projectId = projectIdRes.github_repositories[0].project.id as string;

  const installationToken = await getInstallationAccessToken(record.installationId);

  if (installationToken.error) {
    const msg = 'unable to get installation token';
    log.error(msg, {
      error: installationToken.msg,
    });
    return {
      error: true,
      msg,
    };
  }

  const parsedGitUrl = new URL(record.cloneUrl);
  parsedGitUrl.username = 'x-access-token';
  parsedGitUrl.password = installationToken.res;

  const gzippedSbom = generateSbomFromAsset('repository', parsedGitUrl.toString(), record.gitBranch);

  log.info('Creating a new build for repository', {
    gitUrl: parsedGitUrl,
  });

  const insertBuildResponse: Try<InsertBuildMutation> = await catchError(
    async () =>
      await hasura.InsertBuild({
        project_id: projectId,
        pull_request_id: record.pullRequestId,
        source_type: record.sourceType,
      })
  );

  if (threwError(insertBuildResponse)) {
    log.error('Failed to insert a new build', {
      error: insertBuildResponse,
    });
    throw new Error('Failed to insert a new build');
  }

  const { insert_builds_one } = insertBuildResponse;

  log.info('Insert Build Response:', {
    insert_builds_one,
  });

  if (!insert_builds_one || insert_builds_one.id === undefined) {
    log.error('Missing id in insert build response', {
      insert_builds_one,
    });
    throw new Error('Missing id in insert build response');
  }

  const buildId = insert_builds_one.id as string;

  log.info('Uploading result to S3:', {
    installationId: record.installationId.toString(),
    buildId,
  });

  await uploadSbomToS3(record.installationId.toString(), buildId, gzippedSbom);

  return {
    error: false,
    res: undefined,
  };
}
