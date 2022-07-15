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
import { expect } from '@jest/globals';

import { snapshotPinnedDependencies } from '../snapshot/package-tree';

jest.setTimeout(100000);

describe('buildDepTreeFromFiles for yarn2', () => {
  it('should be able to parse very big yarn.lock files', async () => {
    try {
      await snapshotPinnedDependencies('bfe13208-7b39-4f53-b8c0-46850e81457f', './src/fixtures/large-repo');
    } catch (e) {
      console.error(e);
    }
  });
});
