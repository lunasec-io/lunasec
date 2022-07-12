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
import fs, { Dirent } from 'fs';

export function* walk(path: string, filter: (path: string, name: string) => boolean): IterableIterator<string> {
  const entries: Dirent[] = fs.readdirSync(path, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath: () => string = () => `${path}/${entry.name}`;

    if (entry.isFile() && filter(path, entry.name)) {
      yield entryPath();
    }

    if (entry.isDirectory()) {
      yield* walk(entryPath(), filter);
    }
  }
}
