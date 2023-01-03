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

import tar, { FileStat } from 'tar';

import { getWorkerBucketConfig } from '../../../config';
import { getRepoCloneUrlWithAuth } from '../../../github/actions/get-repo-clone-url-with-auth';
import { updateBuildStatus } from '../../../hasura-api/actions/update-build-status';
import { Build_State_Enum } from '../../../hasura-api/generated';
import { generateSbomFromAsset } from '../../../snapshot/call-cli';
import { uploadSbomToS3 } from '../../../snapshot/generate-snapshot';
import { snapshotPinnedDependencies } from '../../../snapshot/node-package-tree';
import { SnapshotForRepositoryRequest } from '../../../types/sqs';
import { MaybeError, MaybeErrorVoid } from '../../../types/util';
import { aws } from '../../../utils/aws-utils';
import { newError } from '../../../utils/errors';
import { log } from '../../../utils/log';
import { catchError, threwError } from '../../../utils/try';

const mkdTemp = util.promisify(fs.mkdtemp);
const rmDir = util.promisify(fs.rm);
const appPrefix = 'lunatrace';

async function performSnapshotOnRepository(
  installationId: string,
  buildId: string,
  cloneUrl: string,
  gitBranch: string,
  gitCommit?: string,
  projectId?: string
): Promise<MaybeErrorVoid> {
  let logger = log.child('snapshot-repository-activity');
  logger.info('Starting to snapshot repository.');
  updateBuildStatus(buildId, Build_State_Enum.SnapshotStarted);

  let repoDir = '';
  const failedToUploadWorktreeSnapshotForRepository = 'Failed to upload worktree snapshot for repository.';
  try {
    repoDir = await mkdTemp(path.join(os.tmpdir(), appPrefix));
    logger = logger.child('snapshot-repository-activity', { repoDir });
    // the rest of your app goes here
    const sbom = generateSbomFromAsset('repository', cloneUrl, gitBranch, gitCommit, {
      workspace: repoDir,
    });

    if (sbom === null) {
      logger.error('Failed to generated SBOM for repository.');
      updateBuildStatus(buildId, Build_State_Enum.SnapshotFailed, 'Failed to generated SBOM for repository.');
      return {
        error: true,
        msg: 'unable to generate sbom for asset',
      };
    }
    logger.info('Successfully generated SBOM for repository.');

    const s3UploadRes = await catchError(uploadSbomToS3(installationId, buildId, sbom));
    if (threwError(s3UploadRes)) {
      logger.error('Failed to save SBOM for repository.', {
        error: s3UploadRes,
        message: s3UploadRes.message,
      });

      return {
        error: true,
        msg: s3UploadRes.message,
        rawError: s3UploadRes,
      };
    }

    logger.info('Successfully saved SBOM for repository.', {
      s3Url: s3UploadRes,
    });

    logger.info('Attempting to upload worktree for repository.');
    let codeURL = '';
    try {
      codeURL = await uploadWorktreeSnapshot(buildId, repoDir);
    } catch (err) {
      logger.error(failedToUploadWorktreeSnapshotForRepository, {
        error: err,
      });

      updateBuildStatus(buildId, Build_State_Enum.SnapshotFailed, failedToUploadWorktreeSnapshotForRepository);

      return {
        error: true,
        msg: failedToUploadWorktreeSnapshotForRepository,
        rawError: err instanceof Error ? err : undefined,
      };
    }

    logger.info('Successfully uploaded worktree for repository.', {
      codeURL,
    });

    // create releases with uploaded tar url.
    logger.info('Attempting to snapshot pinned dependencies for repository.');

    try {
      await snapshotPinnedDependencies(buildId, repoDir, codeURL, projectId);
    } catch (err) {
      logger.error('Failed to snapshot pinned dependencies for repository.', {
        error: err,
      });
      updateBuildStatus(
        buildId,
        Build_State_Enum.SnapshotFailed,
        'Failed to snapshot pinned dependencies for repository.'
      );

      return {
        error: true,
        msg: 'failed to snapshot pinned dependencies',
        rawError: err instanceof Error ? err : undefined,
      };
    }

    logger.info('Successfully created snapshot for pinned dependencies for repository.');

    updateBuildStatus(buildId, Build_State_Enum.SnapshotCompleted);

    updateBuildStatus(buildId, Build_State_Enum.SnapshotScanQueued);

    return {
      error: false,
    };
  } catch (e) {
    logger.error('Experienced internal error while creating snapshot for repository.', {
      tmpDir: repoDir,
      error: e,
    });
    updateBuildStatus(
      buildId,
      Build_State_Enum.SnapshotFailed,
      'Experienced internal error while creating snapshot for repository.'
    );

    return {
      error: true,
      msg: `error occurred while snapshotting repository: ${e}`,
      rawError: e instanceof Error ? e : undefined,
    };
  } finally {
    try {
      if (repoDir) {
        await rmDir(repoDir, { recursive: true });
      }
    } catch (e) {
      // Do not update build status, this is not a fatal error.
      logger.error('error occurred while removing temp folder', {
        error: e,
      });
    }
  }

  logger.error('Experienced internal error while creating snapshot for repository.');
  updateBuildStatus(
    buildId,
    Build_State_Enum.SnapshotFailed,
    'Experienced internal error while creating snapshot for repository.'
  );

  return {
    error: true,
    msg: 'did not preform snapshot successfully',
    rawError: new Error('did not preform snapshot successfully'),
  };
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

  const installationId = req.installationId.toString();

  return await log.provideFields({ buildId: req.buildId, record: req, installationId }, async () => {
    return performSnapshotOnRepository(
      installationId,
      req.buildId,
      repoClone.cloneUrl,
      req.gitBranch,
      req.gitCommit,
      req.projectId
    );
  });
}

async function uploadWorktreeSnapshot(buildId: string, repoDir: string): Promise<string> {
  const bucketConfig = getWorkerBucketConfig();
  // upload the sbom to s3, streaming
  const fileKey = aws.generateCodeS3Key(buildId);

  const tarStream = tar.c(
    {
      cwd: repoDir,
      prefix: '',
      gzip: true,
      filter(path: string, stat: FileStat): boolean {
        return !path.includes('/.git/');
      },
    },
    ['.']
  );

  return await aws.uploadGzipFileToS3(fileKey, bucketConfig.codeBucket, tarStream);
}
