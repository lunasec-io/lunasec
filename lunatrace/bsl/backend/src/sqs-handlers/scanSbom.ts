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
import zlib from 'zlib';

import validate from 'validator';

import { hasura } from '../hasura-api';
import { Scan } from '../models/scan';
import { S3ObjectMetadata } from '../types/s3';
import { aws } from '../utils/aws-utils';

export async function handleScanSbom(message: S3ObjectMetadata) {
  const { key, region, bucketName } = message;
  const buildId = key.split('/').pop();
  if (!buildId || !validate.isUUID(buildId)) {
    console.error('invalid build uuid from s3 object at key ', key);
    return; // not much we can do without a valid buildId
  }

  try {
    console.log('scanning sbom ', message);

    const [sbomStream, sbomLength] = await aws.getFileFromS3(key, bucketName, region);
    console.log('started streaming file from s3');
    const gunzip = zlib.createGunzip({ chunkSize: sbomLength });

    const unZippedSbomStream = sbomStream.pipe(gunzip);
    unZippedSbomStream.on('error', (e) => {
      console.error('Error unzipping sbom ', e);
      unZippedSbomStream.end(() => console.log('closed stream due to error'));
      // throw e;
    });
    console.log('started unzipping file');
    const buildId = key.split('/').pop();
    if (!buildId || !validate.isUUID(buildId)) {
      // Todo: make sure throwing from these handlers is what we want to do, it will crash the main thread if not caught and that may not be what we want
      throw new Error('Build ID parsed from s3 key is not a valid uuid');
    }
    console.log('build id is ', buildId);
    await hasura.UpdateManifestStatusIfExists({ status: 'scanning', buildId: buildId });
    console.log('updated manifest status to scanning if it existed');
    await Scan.uploadScan(unZippedSbomStream, buildId);
    console.log('upload complete, notifying manifest if one exists');
    await hasura.UpdateManifestStatusIfExists({ status: 'scanned', buildId: buildId });
    console.log('done with scan');
  } catch (e) {
    console.error(e);
    await hasura.UpdateManifestStatusIfExists({
      status: 'error',
      message: String(e),
      buildId: buildId,
    });
    // todo: somehow write this error back to the db
  }
}
