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
import zlib from 'zlib';

import validate from 'validator';

import { commentOnPrIfExists } from '../github/actions/pr-comment-generator';
import { hasura } from '../hasura-api';
import { InsertedScan, parseAndUploadScan } from '../models/scan';
import { S3ObjectMetadata } from '../types/s3';
import { SbomBucketInfo } from '../types/scan';
import { QueueErrorResult, QueueSuccessResult } from '../types/sqs';
import { aws } from '../utils/aws-utils';
import { log } from '../utils/log';
import { catchError, threwError } from '../utils/try';

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

async function scanSbom(buildId: string, sbomBucketInfo: SbomBucketInfo): Promise<InsertedScan> {
  log.info('scanning sbom', {
    sbomBucketInfo,
  });

  const [sbomStream, sbomLength] = await aws.getFileFromS3(
    sbomBucketInfo.key,
    sbomBucketInfo.bucketName,
    sbomBucketInfo.region
  );

  const unZippedSbomStream = await decompressGzip(sbomStream, sbomLength);

  log.info(`updating manifest status to "scanning" if it existed`);
  await hasura.UpdateManifestStatusIfExists({ status: 'scanning', buildId: buildId });

  const scanReport = await parseAndUploadScan(unZippedSbomStream, buildId);

  log.info('upload complete, notifying manifest if one exists');
  await hasura.UpdateManifestStatusIfExists({ status: 'scanned', buildId: buildId });

  log.info('done with scan');

  return scanReport;
}

export async function handleScanSbom(message: S3ObjectMetadata): Promise<QueueSuccessResult | QueueErrorResult> {
  const { key, region, bucketName } = message;
  const buildId = key.split('/').pop();
  return await log.provideFields({ key, region, bucketName }, async () => {
    if (!buildId || !validate.isUUID(buildId)) {
      log.error('invalid build uuid from s3 object at key ', key);
      // not much we can do without a valid buildId
      return {
        success: false,
        error: new Error('invalid build uuid from s3 object at key ' + key),
      };
    }

    const bucketInfo: SbomBucketInfo = { region, bucketName, key };

    const scanResp = await catchError(async () => await scanSbom(buildId, bucketInfo));

    if (threwError(scanResp)) {
      log.error('Sbom Scanning Error:', { scanResp });
      await hasura.UpdateManifestStatusIfExists({
        status: 'error',
        message: String(scanResp.message),
        buildId: buildId,
      });
      return {
        success: false,
        error: new Error(scanResp.message),
      };
    }

    try {
      await commentOnPrIfExists(buildId, scanResp);
    } catch (e) {
      log.error('commenting on github pr failed, continuing.. ', e);
    }

    return {
      success: true,
    };
  });
}
