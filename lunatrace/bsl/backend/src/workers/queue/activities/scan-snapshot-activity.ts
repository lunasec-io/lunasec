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
import { Readable } from 'stream';
import util from 'util';
import zlib from 'zlib';

import validate from 'validator';

import { InsertedScan, performSnapshotScanAndCollectReport } from '../../../analysis/scan';
import { queueManifestDependencyEdgeForStaticAnalysis } from '../../../analysis/static-analysis';
import { interactWithPR } from '../../../github/actions/pr-comment-generator';
import { buildTreeFromRawData } from '../../../graphql-yoga/resolvers/vulnerable-releases-from-build';
import { hasura } from '../../../hasura-api';
import { updateBuildStatus } from '../../../hasura-api/actions/update-build-status';
import { updateManifestStatus } from '../../../hasura-api/actions/update-manifest-status';
import { Build_State_Enum } from '../../../hasura-api/generated';
import { S3ObjectMetadata } from '../../../types/s3';
import { SbomBucketInfo } from '../../../types/scan';
import { MaybeError, MaybeErrorVoid } from '../../../types/util';
import { aws } from '../../../utils/aws-utils';
import { newError, newResult } from '../../../utils/errors';
import { log } from '../../../utils/log';
import { catchError, threwError } from '../../../utils/try';

function decompressGzip(stream: Readable, streamLength: number): Promise<zlib.Gzip> {
  return new Promise((resolve, reject) => {
    log.info('started streaming file from s3');

    const chunkSize = streamLength < 1024 * 256 ? streamLength : 1024 * 256;

    const gunzip = zlib.createGunzip({ chunkSize: chunkSize < 64 ? 64 : chunkSize });

    log.info('started unzipping file');
    const unZippedSbomStream = stream.pipe(gunzip);
    unZippedSbomStream.on('error', (e) => {
      log.error('Error unzipping sbom ', e);
      unZippedSbomStream.end(() => log.info('closed stream due to error'));
      reject(e);
    });

    resolve(unZippedSbomStream);
  });
}

async function scanSnapshot(buildId: string, sbomBucketInfo: SbomBucketInfo): Promise<InsertedScan | null> {
  const [sbomStream, sbomLength] = await aws.getFileFromS3(
    sbomBucketInfo.key,
    sbomBucketInfo.bucketName,
    sbomBucketInfo.region
  );

  if (sbomLength === 0) {
    log.error('SBOM length is zero.');
    updateBuildStatus(buildId, Build_State_Enum.SnapshotScanFailed, 'Internal error while scanning snapshot.');
    return null;
  }

  const unZippedSbomStream = await decompressGzip(sbomStream, sbomLength);

  log.info('Starting to scan snapshot.');
  updateBuildStatus(buildId, Build_State_Enum.SnapshotScanStarted);
  updateManifestStatus(buildId, 'scanning');

  const scanReport = await performSnapshotScanAndCollectReport(unZippedSbomStream, buildId);
  if (scanReport === null) {
    log.error('Failed to scan snapshot.');
    updateBuildStatus(buildId, Build_State_Enum.SnapshotScanFailed, 'Internal error while scanning snapshot.');
    return null;
  }
  return scanReport;
}

async function staticallyAnalyzeDependencyTree(buildId: string): Promise<MaybeErrorVoid> {
  log.info('statically analyzing dependency tree', {
    buildId,
  });

  const treeResp = await catchError(hasura.GetTreeFromBuild({ build_id: buildId }));
  if (threwError(treeResp)) {
    log.error('failed to get dependency tree', {
      error: treeResp,
    });
    return newError('failed to get dependency tree');
  }

  const rawBuildData = treeResp.builds_by_pk;
  if (!rawBuildData) {
    log.error('dependency tree is empty');
    return newError('dependency tree is empty');
  }

  const rawManifests = rawBuildData.resolved_manifests as Omit<typeof rawBuildData['resolved_manifests'], '__typename'>;

  const depTree = buildTreeFromRawData(rawManifests);
  if (!depTree) {
    log.error('unable to build dependency tree', {
      rawManifests,
    });
    return newError('unable to build dependency tree');
  }

  const vulnerabilities = depTree.getVulnerabilities();
  log.info('starting static analysis for dependency tree');

  const queuedStaticAnalyses: Map<string, boolean> = new Map<string, boolean>();
  vulnerabilities.forEach((v) => {
    v.chains.forEach((chain) => {
      chain.forEach(async (node) => {
        if (!node.parent_id) {
          log.warn('parent id is not defined', {
            vulnerabilities,
            node,
          });
          return;
        }

        const edgeId = depTree.getEdgeIdFromNodePair(node.parent_id, node.id);
        if (!edgeId) {
          log.warn('cannot find edge id', {
            vulnerabilities,
            node,
          });
          return;
        }

        // TODO (cthompson) until we are scanning first party code, this is needed so we dont try to scan
        // the made up edge from the recursive sql query.
        if (edgeId === '00000000-0000-0000-0000-000000000000') {
          return;
        }

        const key = v.vulnerability.id + edgeId;
        if (queuedStaticAnalyses.get(key)) {
          return;
        }
        queuedStaticAnalyses.set(key, true);

        const resp = await queueManifestDependencyEdgeForStaticAnalysis(v.vulnerability.id, edgeId);
        if (resp.error) {
          log.error('failed to queue vulnerable edge for analysis', {
            vulnerabilitiy: v.vulnerability.id,
            edgeId: node,
          });
        }
      });
    });
  });
  return newResult(undefined);
}

export async function scanSnapshotActivity(buildId: string, msg: S3ObjectMetadata): Promise<MaybeError<undefined>> {
  const { key, region, bucketName } = msg;
  return await log.provideFields({ key, region, bucketName }, async () => {
    if (!buildId || !validate.isUUID(buildId)) {
      log.error('invalid build uuid from s3 object at key', {
        key,
      });
      // not much we can do without a valid buildId
      return newError('invalid build uuid from s3 object at key ' + key);
    }

    const staticAnalysisRes = await catchError(staticallyAnalyzeDependencyTree(buildId));
    if (threwError(staticAnalysisRes)) {
      log.warn('failed to run static analysis on dependency tree', {
        buildId,
        msg,
      });
    }

    const bucketInfo: SbomBucketInfo = { region, bucketName, key };

    const scanResp = await catchError(scanSnapshot(buildId, bucketInfo));
    if (threwError(scanResp)) {
      log.error('Failed to scan snapshot.');
      updateBuildStatus(buildId, Build_State_Enum.SnapshotScanFailed, scanResp.message);
      updateManifestStatus(buildId, 'error', String(scanResp.message));
      return newError(scanResp.message);
    }

    if (scanResp === null) {
      log.error('failed to scan snapshot due to invalid SBOM');
      updateBuildStatus(buildId, Build_State_Enum.SnapshotScanFailed, 'Invalid SBOM was requested to be scanned.');
      updateManifestStatus(buildId, 'error', 'invalid SBOM was requested to be scanned');
      return newResult(undefined);
    }

    log.info('Successfully scanned snapshot.');
    updateBuildStatus(buildId, Build_State_Enum.SnapshotScanCompleted);
    updateManifestStatus(buildId, 'scanned');

    try {
      await interactWithPR(buildId, scanResp);
    } catch (e) {
      log.error('commenting on github pr failed, continuing...', {
        error: e,
      });
    }

    return newResult(undefined);
  });
}
