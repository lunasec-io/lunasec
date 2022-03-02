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
import fs from 'fs';
import path from 'path';
import util from 'util';

import { fetchSetManifestStatus } from '../hasura-calls/updateManifestStatus';
import { SqsMessage } from '../types/SqsMessage';
import { S3ObjectMetadata } from '../types/s3';
import { aws } from '../utils/aws-utils';

export async function handleGenerateSbom(message: S3ObjectMetadata) {
  const { key, region, bucketName } = message;
  try {
    const hasuraRes = await fetchSetManifestStatus(key, 'processing');
    console.log('hasuraRes is  ', hasuraRes);
    const fileBuffer = await aws.getFileFromS3(key, bucketName, region);
    const fileString = await aws.streamToString(fileBuffer);
    console.log('filestring length ', fileString.length);
    // const commandString = `${__dirname}/../../../../cli/bin/lunatrace --log-to-stderr inventory create --stdin-filename ${hasuraRes.filename} --skip-upload --stdout 2> /dev/null`;
    // console.log('command string is ', commandString);
    const sbom = await new Promise((resolve, reject) => {
      const lunatraceCli = spawn('lunatrace',['--log-to-stderr','inventory','create','--stdin-filename', hasuraRes.filename, '--skip-upload','--stdout','2>','/dev/null']);
      lunatraceCli.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });


      lunatraceCli.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      lunatraceCli.on('error', (error) => {
        console.log(`error: ${error.message}`);
        reject(error);
      });

      lunatraceCli.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        Promise.resolve('donezo');
      });
      lunatraceCli.stdin.write(`${fileString}\n`, () => console.log('FLUSHED data to stdin'));
    });
    console.log('sbom is ', sbom);
  } catch (e) {
    console.error(e);
    // if ('message' in e) {
    //
    //   // last ditch attempt to write an error to show in the UX..may or may not work depending on what the issue is
    //   await fetchSetManifestStatus(key, 'error', e.message);
    // }
  }
}
