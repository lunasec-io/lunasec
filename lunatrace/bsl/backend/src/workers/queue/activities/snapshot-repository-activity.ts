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

import { getRepoCloneUrlWithAuth } from '../../../github/actions/get-repo-clone-url-with-auth';
import { updateBuildStatus } from '../../../hasura-api/actions/update-build-status';
import { Build_State_Enum } from '../../../hasura-api/generated';
import { generateSbomFromAsset } from '../../../snapshot/call-cli';
import { uploadSbomToS3 } from '../../../snapshot/generate-snapshot';
import { snapshotPinnedDependencies } from '../../../snapshot/node-package-tree';
import { SnapshotForRepositoryRequest } from '../../../types/sqs';
import { MaybeError, MaybeErrorVoid } from '../../../types/util';
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
  gitCommit?: string
): Promise<MaybeErrorVoid> {
  log.info('Starting to snapshot repository.');
  updateBuildStatus(buildId, Build_State_Enum.SnapshotStarted);

  let repoDir = '';
  try {
    repoDir = await mkdTemp(path.join(os.tmpdir(), appPrefix));

    // the rest of your app goes here
    const sbom = generateSbomFromAsset('repository', cloneUrl, gitBranch, gitCommit, {
      workspace: repoDir,
    });

    if (sbom === null) {
      log.error('Failed to generated SBOM for repository.');
      updateBuildStatus(buildId, Build_State_Enum.SnapshotFailed, 'Failed to generated SBOM for repository.');
      return {
        error: true,
        msg: 'unable to generate sbom for asset',
      };
    }
    log.info('Successfully generated SBOM for repository.');

    const s3UploadRes = await catchError(uploadSbomToS3(installationId, buildId, sbom));
    if (threwError(s3UploadRes)) {
      log.error('Failed to save SBOM for repository.', {
        error: s3UploadRes,
        message: s3UploadRes.message,
      });

      return {
        error: true,
        msg: s3UploadRes.message,
        rawError: s3UploadRes,
      };
    }

    log.info('Successfully saved SBOM for repository.', {
      s3Url: s3UploadRes,
    });

    log.info('Attempting to snapshot pinned dependencies for repository.', {
      repoDir,
    });

    try {
      await snapshotPinnedDependencies(buildId, repoDir);
    } catch (err) {
      log.error('Failed to snapshot pinned dependencies for repository.', {
        error: err,
        repoDir,
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

    log.info('Successfully created snapshot for pinned dependencies for repository.', {
      repoDir,
    });
    updateBuildStatus(buildId, Build_State_Enum.SnapshotCompleted);

    updateBuildStatus(buildId, Build_State_Enum.SnapshotScanQueued);

    return {
      error: false,
    };
  } catch (e) {
    log.error('Experienced internal error while creating snapshot for repository.', {
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
      log.error('error occurred while removing temp folder', {
        tmpDir: repoDir,
        error: e,
      });
    }
  }

  log.error('Experienced internal error while creating snapshot for repository.');
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
    return performSnapshotOnRepository(installationId, req.buildId, repoClone.cloneUrl, req.gitBranch, req.gitCommit);
  });
}
