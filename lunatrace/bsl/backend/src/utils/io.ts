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
import { spawn, SpawnOptionsWithoutStdio } from 'child_process';

import BufferList from 'bl';

export const asyncSpawn = (command: string, args?: ReadonlyArray<string>, options?: SpawnOptionsWithoutStdio) => {
  const child = spawn(command, args, options);
  const stdout = new BufferList();
  const stderr = new BufferList();

  if (child.stdout) {
    child.stdout.on('data', (data) => {
      stdout.append(data);
    });
  }

  if (child.stderr) {
    child.stderr.on('data', (data) => {
      stderr.append(data);
    });
  }

  return new Promise((resolve: (stdout: BufferList) => void, reject: (error: Error) => any) => {
    child.on('error', reject);

    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        const err = new Error(`child exited with code ${code}`);
        reject(err);
      }
    });
  });
};
