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
// Helper for linking to external query files:
import { join } from 'path';

import { QueryFile } from 'pg-promise';

export function loadSql(file: string) {
  const fullPath = join(__dirname, file);
  return new QueryFile(fullPath, {
    minify: false,
    debug: true,
  });
}
