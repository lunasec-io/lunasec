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
import validate from 'validator';

import { hasura } from '../hasura-api';
import { Scan } from '../models/scan';
import { S3ObjectMetadata } from '../types/s3';
import { aws } from '../utils/aws-utils';
export async function handleScanSbom(message: S3ObjectMetadata) {
  try {
    console.log('scanning sbom ', message);
    const { key, region, bucketName } = message;
    const sbomStream = await aws.getFileFromS3(key, bucketName, region);
    console.log('got file from s3');
    const buildId = key.split('/').pop();
    if (!buildId || !validate.isUUID(buildId)) {
      // Todo: make sure throwing from these handlers is what we want to do, it will crash the main thread if not caught and that may not be what we want
      throw new Error('Build ID parsed from s3 key is not a valid uuid');
    }
    await hasura.UpdateManifestStatusIfExists({ status: 'scanning', buildId: buildId });
    await Scan.uploadScan(sbomStream, buildId);
    await hasura.UpdateManifestStatusIfExists({ status: 'scanned', buildId: buildId });
  } catch (e) {
    console.error(e);
    // todo: somehow write this error back to the db
  }
}
