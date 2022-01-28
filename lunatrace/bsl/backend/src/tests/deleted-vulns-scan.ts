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
import os from 'os';
import path from 'path';

import { VulnerabilityLoader } from '../utils/vulnerability-loader';

const dbPath = path.join(os.homedir(), '.cache/grype/db/3/vulnerability.db');

async function compareReports() {
  const newVulnLoader = new VulnerabilityLoader(dbPath);
  const oldVulnLoader = new VulnerabilityLoader('/home/forrest/tmp/old-vulnerability.db');

  const newData = await newVulnLoader.loadVulnerabilities();
  const oldData = await oldVulnLoader.loadVulnerabilities();
  Object.keys(oldData.vulns).forEach((slug) => {
    return;
  });
}

void compareReports();
