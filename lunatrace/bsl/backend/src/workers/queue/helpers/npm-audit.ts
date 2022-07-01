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
import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

import tmp from 'tmp-promise';

import { log } from '../../../utils/log';

const writeFile = util.promisify(fs.writeFile);
const exec = util.promisify(child_process.exec);

export async function writeManifestsToDisk(
  packageJsonContents: string,
  lockContents: string,
  lockFileName: string
): Promise<tmp.DirectoryResult> {
  const dir = await tmp.dir({ unsafeCleanup: true });
  const packageJsonPath = path.join(dir.path, 'package.json');
  await writeFile(packageJsonPath, packageJsonContents);

  const lockFilePath = path.join(dir.path, lockFileName);
  await writeFile(lockFilePath, lockContents);
  return dir;
}

export async function doAudit(projectPath: string, useYarn: boolean): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const args = ['audit', '--json', '--recursive'];
    // if its yarn, the first argument will actually be "npm" to tell yarn to provide npm commands
    const command = useYarn ? 'yarn' : 'npm';
    if (useYarn) {
      args.unshift('npm');
      console.log('args are', args);
      console.log('command is ', command);
    }
    const cliResponse = child_process.spawn(command, args, { cwd: projectPath });

    cliResponse.on('error', reject);

    const outputBuffers: Buffer[] = [];
    cliResponse.stdout.on('data', (chunk) => {
      console.log('got data', chunk.toString());
      outputBuffers.push(Buffer.from(chunk));
    });
    cliResponse.stderr.on('data', (errorChunk) => {
      log.warn('npm audit stderr', {
        log: errorChunk.toString(),
      });
    });
    cliResponse.on('close', (code) => {
      // if (code !== 0) {
      //   return reject(`audit command exited with non-zero code: ${code}`);
      // }
      resolve(Buffer.concat(outputBuffers).toString());
    });
  });
}
