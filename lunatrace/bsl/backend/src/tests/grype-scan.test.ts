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

import { runGrypeScan } from '../models/scan';
import { log } from '../utils/log';

jest.setTimeout(20000);
describe('Grype scanner', () => {
  it('should run scan from local file', async () => {
    const res = await runGrypeScan(fs.createReadStream(path.join(__dirname, '/../fixtures/sbom.json')));
    expect(res).toBeTruthy();
    log.info('res from grype scan is ', res);
  });
});
