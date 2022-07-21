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
import fs from 'fs';
import path from 'path';
import util from 'util';
const readDir = util.promisify(fs.readdir);

export type FilterFunction = (directoryName: string, fileName: string) => boolean;

/**
 *
 * @param rootDir
 * @param filter will be called on every file in a folder to determine if the folder matches.
 */
export async function findFilesMatchingFilter(rootDir: string, filter: FilterFunction): Promise<Array<string>> {
  const matchingFilePaths = new Array<string>();

  async function recurseFolders(directoryName: string) {
    console.error('walking folder ', directoryName);
    const contents = await readDir(directoryName, { withFileTypes: true });
    console.log('contents are ', contents);
    for (const entry of contents) {
      console.log('inspecting entry ', entry.name);
      const entryPath = path.join(directoryName, entry.name);

      if (entry.isFile() && filter(directoryName, entry.name)) {
        matchingFilePaths.push(entryPath);
      }

      if (entry.isDirectory()) {
        await recurseFolders(entryPath);
      }
    }
  }

  await recurseFolders(rootDir);
  return matchingFilePaths;
}
