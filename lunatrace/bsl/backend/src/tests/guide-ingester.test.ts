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

import { readGuidesFromFolder } from '../guide-ingester/read-guides-from-folder';
describe('guide ingester', () => {
  it('parses guides from disk', () => {
    const guides = readGuidesFromFolder('./src/test/fixtures/guides');
    const guide = guides[0];
    expect(guide).toHaveProperty('body');
    expect(guide).toHaveProperty('metadata');
    expect(guide.guide_unique_id).toBe('LUNAGUIDE-20220422-1-TEST-GUIDE');
  });
});
