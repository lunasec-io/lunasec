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
import { generateSbomFromAsset } from '../cli/call-cli';
import { getRepoCloneUrlWithAuth } from '../github/actions/get-repo-clone-url-with-auth';
import { hasura } from '../hasura-api';
import { InsertBuildMutation } from '../hasura-api/generated';
import { QueueRepositorySnapshotMessage } from '../types/sqs';
import { MaybeError } from '../types/util';
import { newError, newResult } from '../utils/errors';
import { log } from '../utils/log';
import { catchError, threwError, Try } from '../utils/try';

import { uploadSbomToS3 } from './generate-sbom';

export async function snapshotRepository(record: QueueRepositorySnapshotMessage): Promise<MaybeError<undefined>> {
  const logger = log.child('repo-snapshot', {
    record,
  });

  logger.info('creating authed git clone url');

  const cloneUrlWithAuth = await getRepoCloneUrlWithAuth(record.repoGithubId);

  if (cloneUrlWithAuth.error) {
    logger.error('could not create authed git clone url', {
      error: cloneUrlWithAuth.msg,
    });
    return newError('could not create authed git clone url');
  }
  const repoClone = cloneUrlWithAuth.res;

  logger.info('generating SBOM for repository');

  const gzippedSbom = generateSbomFromAsset('repository', repoClone.cloneUrl, record.gitBranch, record.gitCommit);

  logger.info('Creating a new build for repository', {
    gitUrl: repoClone.projectId,
  });

  const insertBuildResponse: Try<InsertBuildMutation> = await catchError(
    async () =>
      await hasura.InsertBuild({
        build: {
          project_id: repoClone.projectId,
          pull_request_id: record.pullRequestId,
          source_type: record.sourceType,
          git_hash: record.gitCommit,
          git_branch: record.gitBranch,
          git_remote: repoClone.cloneUrl,
        },
      })
  );

  if (threwError(insertBuildResponse)) {
    const msg = 'failed to insert a new build';
    logger.error(msg, {
      error: insertBuildResponse,
    });
    return newError(msg);
  }

  const { insert_builds_one } = insertBuildResponse;

  logger.info('Insert Build Response:', {
    insert_builds_one,
  });

  if (!insert_builds_one || insert_builds_one.id === undefined) {
    const msg = 'missing id in insert build response';
    logger.error(msg, {
      insert_builds_one,
    });
    return newError(msg);
  }

  const buildId = insert_builds_one.id as string;

  logger.info('Uploading result to S3:', {
    installationId: record.installationId.toString(),
    buildId,
  });

  const res = await catchError(uploadSbomToS3(record.installationId.toString(), buildId, gzippedSbom));
  if (threwError(res)) {
    logger.error('unable to upload sbom to s3', {
      buildId,
      message: res.message,
    });
    return newError(res.message);
  }

  return newResult(undefined);
}
