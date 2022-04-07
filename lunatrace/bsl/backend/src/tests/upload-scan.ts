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

import { parseAndUploadScan } from '../models/scan';

import { scaffoldBuild } from './scaffold-project-and-build';

async function uploadScan() {
  void parseAndUploadScan(fs.createReadStream('/home/forrest/tmp/syftoutput.json'), await scaffoldBuild()).then(
    (res) => {
      console.log('completed scan upload: ', res);
    }
  );
}

void uploadScan();
