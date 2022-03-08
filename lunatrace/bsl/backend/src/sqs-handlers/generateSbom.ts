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
import { spawn } from 'child_process';
import { Readable } from 'stream';
import zlib from 'zlib';

import { sbomBucket } from '../constants';
import { hasura } from '../hasura-api';
import { insertBuild } from '../hasura-api/insertBuild';
import { setManifestStatus } from '../hasura-api/updateManifestStatus';
import { S3ObjectMetadata } from '../types/s3';
import { aws } from '../utils/aws-utils';

if (process.env.NODE_ENV === 'production' && !process.env.S3_SBOM_BUCKET_NAME) {
  throw new Error('Must set S3_SBOM_BUCKET_NAME env var');
}

const gZip = zlib.createGzip();

export async function handleGenerateSbom(message: S3ObjectMetadata) {
  const { key, region, bucketName } = message;
  try {
    // let hasura know we are starting the process, so it ends up in the UI.  Also will throw if there is no manifest
    const hasuraRes = await hasura.UpdateManifest({ key_eq: key, set_status: 'sbom-processing' });
    const manifest = hasuraRes.update_manifests?.returning[0];
    if (!manifest) {
      throw new Error('Failed to find manifest matching SBOM, exiting');
    }
    // Get manifest from s3, streaming
    const fileStream = await aws.getFileFromS3(key, bucketName, region);
    // spawn a copy of the CLI to make an sbom, stream in the manifest
    const spawnedCli = callLunatraceCli(fileStream, hasuraRes.filename);
    // gzip the sbom stream
    const gZippedSbomStream = spawnedCli.stdout.pipe(gZip);
    // upload the sbom to s3, streaming
    const newSbomS3Key = aws.generateSbomS3Key(hasuraRes.project.organization_id, hasuraRes.project_id);
    const s3Url = await aws.uploadGzipFileToS3(newSbomS3Key, sbomBucket, gZippedSbomStream);
    // Create a new build
    const buildRes = await hasura.InsertBuild({ s3_url: s3Url, project_id: hasuraRes.project_id });
    await setManifestStatus(key, 'sbom-generated', null, buildRes.id);
  } catch (e) {
    console.error(e);
    // last ditch attempt to write an error to show in the UX..may or may not work depending on what the issue is
    await setManifestStatus(key, 'error', String(e), null);
  }
}

export function callLunatraceCli(fileContentsStream: Readable, fileName: string) {
  const lunatraceCli = spawn('lunatrace', [
    '--debug',
    '--log-to-stderr',
    'inventory',
    'create',
    '--stdin-filename',
    fileName, // todo: i believe this will be sanitized but docs are unclear
    '--skip-upload',
    '--stdout',
  ]);

  lunatraceCli.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  lunatraceCli.on('error', (error) => {
    console.log(`error: ${error.message}`);
    // todo: might get gobbled?
    throw error;
  });

  fileContentsStream.on('data', (chunk) => lunatraceCli.stdin.write(chunk));
  fileContentsStream.on('end', () =>
    lunatraceCli.stdin.end(() => console.log('Finished passing manifest contents to syft'))
  );
  fileContentsStream.on('error', (e) => {
    throw e;
  });

  return lunatraceCli;
}
