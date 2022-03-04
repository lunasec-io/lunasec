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

import { insertBuild } from '../hasura-calls/insertBuild';
import { setManifestStatus } from '../hasura-calls/updateManifestStatus';
import { S3ObjectMetadata } from '../types/s3';
import { aws } from '../utils/aws-utils';
if (process.env.NODE_ENV === 'production' && !process.env.S3_SBOM_BUCKET_NAME) {
  throw new Error('Must set S3_SBOM_BUCKET_NAME env var');
}

const SbomBucket = process.env.S3_SBOM_BUCKET_NAME || 'sbom-test-bucket';

const gZip = zlib.createGzip();

export async function handleGenerateSbom(message: S3ObjectMetadata) {
  const { key, region, bucketName } = message;
  try {
    // let hasura know we are starting the process, so it ends up in the UI.  Also will throw if there is no manifest
    const hasuraRes = await setManifestStatus(key, 'processing', null, null);
    console.log('hasuraRes is  ', hasuraRes);
    // Get manifest from s3, streaming
    const fileStream = await aws.getFileFromS3(key, bucketName, region);
    // spawn a copy of the CLI to make an sbom, stream in the manifest
    const spawnedCli = callLunatrace(fileStream, hasuraRes.filename);
    // gzip the sbom stream
    const gZippedSbomStream = spawnedCli.stdout.pipe(gZip);
    // upload the sbom to s3, streaming
    const newSbomS3Key = aws.generateSbomS3Key(hasuraRes.project.organization_id, hasuraRes.project_id);
    const s3Url = await aws.uploadGzipFileToS3(newSbomS3Key, SbomBucket, gZippedSbomStream);
    console.log('aws upload responded ', s3Url);
    // Create a new build
    const buildRes = await insertBuild({ s3_url: s3Url, project_id: hasuraRes.project_id });
    await setManifestStatus(key, 'done', null, buildRes.id);
  } catch (e) {
    console.error(e);
    // if ('message' in e) {
    //
    //   // last ditch attempt to write an error to show in the UX..may or may not work depending on what the issue is
    //   await fetchSetManifestStatus(key, 'error', e.message);
    // }
  }
}

export function callLunatrace(fileContentsStream: Readable, fileName: string) {
  const lunatraceCli = spawn('lunatrace', [
    '--debug',
    '--log-to-stderr',
    'inventory',
    'create',
    '--stdin-filename',
    fileName,
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
  fileContentsStream.on('end', () => lunatraceCli.stdin.end(() => console.log('CLOSED STDINNNNN')));
  fileContentsStream.on('error', (e) => {
    throw e;
  });

  // lunatraceCli.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });

  return lunatraceCli;
}
