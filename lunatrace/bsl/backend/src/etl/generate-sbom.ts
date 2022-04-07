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

import { generateSbomFromAsset } from '../cli/call-cli';
import { getEtlBucketConfig } from '../config';
import { hasura } from '../hasura';
import { S3ObjectMetadata } from '../types/s3';
import { SbomBucketInfo } from '../types/scan';
import { QueueErrorResult, QueueSuccessResult } from '../types/sqs';
import { aws } from '../utils/aws-utils';
import {log} from "../utils/log";
import { isError } from '../utils/try';

const bucketConfig = getEtlBucketConfig();

export async function uploadSbomToS3(organizationId: string, buildId: string, gzippedSbom: zlib.Gzip) {
  // upload the sbom to s3, streaming
  const newSbomS3Key = aws.generateSbomS3Key(organizationId, buildId);
  const s3Url = await aws.uploadGzipFileToS3(newSbomS3Key, bucketConfig.sbomBucket, gzippedSbom);
  // update build to have s3 url
  const { update_builds_by_pk } = await hasura.SetBuildS3Url({ id: buildId, s3_url: s3Url });
  if (!update_builds_by_pk) {
    throw new Error('Failed to update build s3 url');
  }
}

export async function createBuildWithGenerateSbom(
  orgId: string,
  projectId: string,
  assetName: string,
  bucketInfo: SbomBucketInfo
) {
  // Create a new build
  const { insert_builds_one } = await hasura.InsertBuild({ project_id: projectId });
  if (!insert_builds_one || !insert_builds_one.id) {
    throw new Error('Failed to insert a new build');
  }
  const buildId = insert_builds_one.id as string;

  // Get manifest from s3, streaming
  const [fileStream, _fileLength] = await aws.getFileFromS3(bucketInfo.key, bucketInfo.bucketName, bucketInfo.region);
  // spawn a copy of the CLI to make an sbom, stream in the manifest
  const gzippedSbom = generateSbomFromAsset('file', assetName, 'master', {
    inputStream: fileStream,
  });

  await uploadSbomToS3(orgId, buildId, gzippedSbom);
}

async function attemptGenerateManifestSbom(bucketInfo: SbomBucketInfo) {
  // let hasura know we are starting the process, so it ends up in the UI.  Also will throw if there is no manifest
  const hasuraRes = await hasura.UpdateManifest({ key_eq: bucketInfo.key, set_status: 'sbom-processing' });
  const manifest = hasuraRes.update_manifests?.returning[0];
  if (!manifest) {
    throw new Error('Failed to find manifest matching SBOM, exiting');
  }

  const buildId = await createBuildWithGenerateSbom(
    manifest.project.organization_id,
    manifest.project_id,
    manifest.filename,
    bucketInfo
  );

  // update the manifest status
  await hasura.UpdateManifest({ key_eq: bucketInfo.key, set_status: 'sbom-generated', build_id: buildId });
}

export async function handleGenerateManifestSbom(
  message: S3ObjectMetadata
): Promise<QueueSuccessResult | QueueErrorResult> {
  const { key, bucketName, region } = message;
  const bucketInfo: SbomBucketInfo = {
    key,
    bucketName,
    region,
  };
  try {
    await attemptGenerateManifestSbom(bucketInfo);
    return {
      success: true,
    };
  } catch (e) {
    log.error('Unable to generate SBOM from Manifest', e);
    // last ditch attempt to write an error to show in the UX..may or may not work depending on what the issue is
    await hasura.UpdateManifest({ key_eq: key, set_status: 'error', message: String(e) });

    return {
      success: false,
      error: isError(e) ? e : new Error(String(e)),
    };
  }
}
