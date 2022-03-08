import validate from 'validator';

import { hasura } from '../hasura-api';
import { Scan } from '../models/scan';
import { S3ObjectMetadata } from '../types/s3';
import { aws } from '../utils/aws-utils';
export async function handleScanSbom(message: S3ObjectMetadata) {
  try {
    const { key, region, bucketName } = message;
    const sbomStream = await aws.getFileFromS3(key, bucketName, region);
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
