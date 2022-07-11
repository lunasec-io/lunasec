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
import fs from 'fs';
import * as os from 'os';
import path from 'path';

import { LunaLogger } from '@lunatrace/logger';
import { buildDepTreeFromFiles } from 'snyk-nodejs-lockfile-parser';

import { getRepoCloneUrlWithAuth } from '../../../github/actions/get-repo-clone-url-with-auth';
import { hasura } from '../../../hasura-api';
import { InsertBuildMutation } from '../../../hasura-api/generated';
import { generateSbomFromAsset } from '../../../snapshot/call-cli';
import { uploadSbomToS3 } from '../../../snapshot/generate-snapshot';
import { SnapshotForRepositoryRequest } from '../../../types/sqs';
import { MaybeError } from '../../../types/util';
import { newError, newResult } from '../../../utils/errors';
import { log } from '../../../utils/log';
import { catchError, threwError, Try } from '../../../utils/try';

const appPrefix = 'lunatrace';

function performSnapshotOnRepository(logger: LunaLogger, cloneUrl: string, gitBranch: string, gitCommit?: string) {
  let tmpDir = '';
  try {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix));
    // the rest of your app goes here
    const gzippedSbom = generateSbomFromAsset('repository', cloneUrl, gitBranch, gitCommit, {
      workspace: tmpDir,
    });
    if (gzippedSbom === null) {
      return newError('unable to generate sbom for asset');
    }
    return newResult(gzippedSbom);
  } catch (e) {
    logger.error('error occurred while generating an sbom for an asset', {
      tmpDir,
      error: e,
    });
    return newError(`caught error while performing snapshot: ${e}`);
  } finally {
    try {
      if (tmpDir) {
        fs.rmSync(tmpDir, { recursive: true });
      }
    } catch (e) {
      logger.error('error occurred while removing temp folder', {
        tmpDir,
        error: e,
      });
    }
  }
  return newError('did not perform snapshot successfully');
}

export async function snapshotRepositoryActivity(req: SnapshotForRepositoryRequest): Promise<MaybeError<undefined>> {
  const logger = log.child('repo-snapshot', {
    record: req,
  });

  logger.info('creating authed git clone url');

  const cloneUrlWithAuth = await getRepoCloneUrlWithAuth(req.repoGithubId);

  if (cloneUrlWithAuth.error) {
    logger.error('could not create authed git clone url', {
      error: cloneUrlWithAuth.msg,
    });
    return newError('could not create authed git clone url');
  }
  const repoClone = cloneUrlWithAuth.res;

  logger.info('generating SBOM for repository');
  const gzippedSbom = performSnapshotOnRepository(logger, repoClone.cloneUrl, req.gitBranch, req.gitCommit);
  if (gzippedSbom.error) {
    return gzippedSbom;
  }

  logger.info('Creating a new build for repository', {
    gitUrl: repoClone.projectId,
  });

  const insertBuildResponse: Try<InsertBuildMutation> = await catchError(
    async () =>
      await hasura.InsertBuild({
        build: {
          project_id: repoClone.projectId,
          pull_request_id: req.pullRequestId,
          source_type: req.sourceType,
          git_hash: req.gitCommit,
          git_branch: req.gitBranch,
          git_remote: req.cloneUrl,
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
    installationId: req.installationId.toString(),
    buildId,
  });

  const s3UploadRes = await catchError(uploadSbomToS3(req.installationId.toString(), buildId, gzippedSbom.res));
  if (threwError(s3UploadRes)) {
    logger.error('unable to upload sbom to s3', {
      buildId,
      message: s3UploadRes.message,
    });
    return newError(s3UploadRes.message);
  }

  return newResult(undefined);
}
