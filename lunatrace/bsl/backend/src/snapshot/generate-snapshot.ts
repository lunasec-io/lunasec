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

import { getWorkerBucketConfig } from '../config';
import { hasura } from '../hasura-api';
import { SbomBucketInfo } from '../types/scan';
import { aws } from '../utils/aws-utils';
import { log } from '../utils/log';

import { generateSbomFromAsset } from './call-cli';

// Todo: this doesn't generate a snapshot, this uploads to s3, it should be elsewhere
export async function uploadSbomToS3(organizationId: string, buildId: string, gzippedSbom: zlib.Gzip) {
  const bucketConfig = getWorkerBucketConfig();
  // upload the sbom to s3, streaming
  const newSbomS3Key = aws.generateSbomS3Key(organizationId, buildId);
  const s3Url = await aws.uploadGzipFileToS3(newSbomS3Key, bucketConfig.sbomBucket, gzippedSbom);
  // update build to have s3 url
  const { update_builds_by_pk } = await hasura.SetBuildS3Url({ id: buildId, s3_url: s3Url });
  if (!update_builds_by_pk) {
    throw new Error('Failed to update build s3 url');
  }
}

// This is only called from the GUI drag and drop
export async function createBuildAndGenerateSbom(
  orgId: string,
  projectId: string,
  assetName: string,
  bucketInfo: SbomBucketInfo
): Promise<string> {
  // Create a new build
  const { insert_builds_one } = await hasura.InsertBuild({ build: { project_id: projectId, source_type: 'gui' } });
  log.info('hasura returned when inserting build ', insert_builds_one);
  if (!insert_builds_one || !insert_builds_one.id) {
    throw new Error('Failed to insert a new build');
  }
  const buildId = insert_builds_one.id as string;

  // Get manifest from s3, streaming
  const [fileStream, _fileLength] = await aws.getFileFromS3(bucketInfo.key, bucketInfo.bucketName, bucketInfo.region);
  // spawn a copy of the CLI to make an sbom, stream in the manifest
  const gzippedSbom = generateSbomFromAsset('file', assetName, 'master', undefined, {
    inputStream: fileStream,
  });

  await uploadSbomToS3(orgId, buildId, gzippedSbom);
  return buildId;
}
