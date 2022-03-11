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
import { S3ObjectMetadata } from '../types/s3';
import { aws } from '../utils/aws-utils';
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

    // Create a new build
    const { insert_builds_one } = await hasura.InsertBuild({ project_id: manifest.project_id });
    if (!insert_builds_one || !insert_builds_one.id) {
      throw new Error('Failed to insert a new build');
    }
    const buildId = insert_builds_one.id;
    // Get manifest from s3, streaming
    const [fileStream, _fileLength] = await aws.getFileFromS3(key, bucketName, region);
    // spawn a copy of the CLI to make an sbom, stream in the manifest
    const spawnedCli = callLunatraceCli(fileStream, manifest.filename);
    spawnedCli.stdout.on('data', (chunk) => {
      console.log('syft cli emitted stdout: ', chunk.toString().length);
    });
    spawnedCli.stdout.on('end', () => console.log('syft outstream ended'));
    // gzip the sbom stream
    const gZippedSbomStream = spawnedCli.stdout.pipe(gZip);
    // upload the sbom to s3, streaming
    const newSbomS3Key = aws.generateSbomS3Key(manifest.project.organization_id, buildId);
    const s3Url = await aws.uploadGzipFileToS3(newSbomS3Key, sbomBucket, gZippedSbomStream);
    // update build to have s3 url
    const { update_builds_by_pk } = await hasura.SetBuildS3Url({ id: buildId, s3_url: s3Url });
    if (!update_builds_by_pk) {
      throw new Error('Failed to update build s3 url');
    }

    // update the manifest status
    await hasura.UpdateManifest({ key_eq: key, set_status: 'sbom-generated', build_id: buildId });
  } catch (e) {
    console.error(e);
    // last ditch attempt to write an error to show in the UX..may or may not work depending on what the issue is
    await hasura.UpdateManifest({ key_eq: key, set_status: 'error', message: String(e) });
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
  console.log('syft spawned at pid', lunatraceCli.pid);

  lunatraceCli.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  lunatraceCli.on('error', (error) => {
    console.error(`error: ${error.message}`);
    // todo: might get gobbled?
    throw error;
  });

  fileContentsStream.on('data', (chunk) => lunatraceCli.stdin.write(chunk));
  fileContentsStream.on('end', () =>
    lunatraceCli.stdin.end(() =>
      console.log('Finished downloading and passing manifest contents to syft, closing stdin')
    )
  );
  fileContentsStream.on('error', (e) => {
    throw e;
  });

  return lunatraceCli;
}
