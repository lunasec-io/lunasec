import validate from 'validator';

import { Scan } from '../models/scan';
import { S3ObjectMetadata } from '../types/s3';
import { aws } from '../utils/aws-utils';

export async function handleScanSbom(message: S3ObjectMetadata) {
  const { key, region, bucketName } = message;
  const sbomStream = await aws.getFileFromS3(key, bucketName, region);
  const buildId = key.split('/').pop();
  if (!buildId || !validate.isUUID(buildId)) {
    // Todo: make sure throwing from these handlers is what we want to do, it will crash the main thread if not caught and that may not be what we want
    throw new Error('Build ID parsed from s3 key is not a valid uuid');
  }
  await Scan.uploadScan(sbomStream, buildId);
}
