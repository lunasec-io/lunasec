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
import path from 'path';

import { buildDepTreeFromFiles } from 'snyk-nodejs-lockfile-parser';

import { walk } from '../utils/fs';

async function collectPackageTreesFromDirectory(repoDir: string) {
  const lockFileRegex = new RegExp('package-lock.json|yarn.lock');
  const lockFilePaths = walk(repoDir, (path, name) => lockFileRegex.test(name));

  return await Promise.all(
    Array.from(lockFilePaths, async (lockFilePath) => {
      const { dir, name } = path.parse(lockFilePath);
      return await buildDepTreeFromFiles(dir, 'package.json', name, true);
    })
  );
}

async function snapshotPinnedDependencies(repoDir: string) {
  const pkgTrees = await collectPackageTreesFromDirectory(repoDir);
}
