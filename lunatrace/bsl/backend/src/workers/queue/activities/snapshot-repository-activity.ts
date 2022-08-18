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
import util from 'util';

import { LunaLogger } from '@lunatrace/logger';

import { getRepoCloneUrlWithAuth } from '../../../github/actions/get-repo-clone-url-with-auth';
import { hasura } from '../../../hasura-api';
import { InsertBuildMutation } from '../../../hasura-api/generated';
import { generateSbomFromAsset } from '../../../snapshot/call-cli';
import { uploadSbomToS3 } from '../../../snapshot/generate-snapshot';
import { snapshotPinnedDependencies } from '../../../snapshot/node-package-tree';
import { SnapshotForRepositoryRequest } from '../../../types/sqs';
import { MaybeError, MaybeErrorVoid } from '../../../types/util';
import { newError, newResult } from '../../../utils/errors';
import { log } from '../../../utils/log';
import { catchError, threwError, Try } from '../../../utils/try';

const mkdTemp = util.promisify(fs.mkdtemp);
const rmDir = util.promisify(fs.rm);
const appPrefix = 'lunatrace';

async function performSnapshotOnRepository(
  installationId: string,
  buildId: string,
  cloneUrl: string,
  gitBranch: string,
  gitCommit?: string
): Promise<MaybeErrorVoid> {
  log.info('creating snapshot for repository');

  let repoDir = '';
  try {
    repoDir = await mkdTemp(path.join(os.tmpdir(), appPrefix));
    // the rest of your app goes here
    const sbom = generateSbomFromAsset('repository', cloneUrl, gitBranch, gitCommit, {
      workspace: repoDir,
    });
    if (sbom === null) {
      return newError('unable to generate sbom for asset');
    }

    log.info('uploading sbom to s3');

    const s3UploadRes = await catchError(uploadSbomToS3(installationId, buildId, sbom));
    if (threwError(s3UploadRes)) {
      log.error('unable to upload sbom to s3', {
        message: s3UploadRes.message,
      });
      return newError(s3UploadRes.message);
    }

    log.info('uploaded sbom to s3', {
      s3Url: s3UploadRes,
    });

    log.info('skipped snapshotting pinned dependencies', {
      repoDir,
    });

    /*

    log.info('snapshotting pinned dependencies', {
      repoDir,
    });

    const pinnedDepsError = await snapshotPinnedDependencies(buildId, repoDir);
    if (pinnedDepsError.error) {
      log.error('failed to snapshot pinned dependencies', {
        repoDir,
      });
      return newError(pinnedDepsError.msg);
    }

     */

    log.info('completed snapshotting pinned dependencies', {
      repoDir,
    });
    return newResult(undefined);
  } catch (e) {
    log.error('error occurred while snapshotting an asset', {
      tmpDir: repoDir,
      error: e,
    });
    return newError(`caught error while performing snapshot: ${e}`);
  } finally {
    try {
      if (repoDir) {
        await rmDir(repoDir, { recursive: true });
      }
    } catch (e) {
      log.error('error occurred while removing temp folder', {
        tmpDir: repoDir,
        error: e,
      });
    }
  }
  return newError('did not perform snapshot successfully');
}

interface NewBuildInfo {
  projectId: string;
  pullRequestId?: string;
  sourceType: string;
  gitCommit?: string;
  gitBranch: string;
  cloneUrl: string;
}

async function createNewBuild(logger: LunaLogger, buildInfo: NewBuildInfo): Promise<MaybeError<string>> {
  logger.info('Creating a new build for repository', {
    projectId: buildInfo.projectId,
  });

  const insertBuildResponse: Try<InsertBuildMutation> = await catchError(
    async () =>
      await hasura.InsertBuild({
        build: {
          project_id: buildInfo.projectId,
          pull_request_id: buildInfo.pullRequestId,
          source_type: buildInfo.sourceType,
          git_hash: buildInfo.gitCommit,
          git_branch: buildInfo.gitBranch,
          git_remote: buildInfo.cloneUrl,
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

  logger.info('inserted new build', {
    insert_builds_one,
  });

  if (!insert_builds_one || insert_builds_one.id === undefined) {
    const msg = 'missing idd in insert build response';
    logger.error(msg, {
      insert_builds_one,
    });
    return newError(msg);
  }

  return newResult(insert_builds_one.id as string);
}

export async function snapshotRepositoryActivity(req: SnapshotForRepositoryRequest): Promise<MaybeError<undefined>> {
  const logger = log.child('repo-snapshot-setup', {
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

  const buildId = await createNewBuild(logger, {
    projectId: repoClone.projectId,
    pullRequestId: req.pullRequestId,
    sourceType: req.sourceType,
    gitCommit: req.gitCommit,
    gitBranch: req.gitBranch,
    cloneUrl: req.cloneUrl,
  });
  if (buildId.error) {
    return buildId;
  }

  const installationId = req.installationId.toString();

  return await log.provideFields({ buildId: buildId.res, record: req, installationId }, async () => {
    return performSnapshotOnRepository(installationId, buildId.res, repoClone.cloneUrl, req.gitBranch, req.gitCommit);
  });
}
