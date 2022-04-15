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

import {defaultLogger} from "../utils/logger";
import { VulnerabilityLoader } from '../utils/vulnerability-loader';

const dbPath = path.join(os.homedir(), '.cache/grype/db/3/vulnerability.db');

const vulnLoader = new VulnerabilityLoader(dbPath);

void vulnLoader.loadVulnerabilities().then((res) => {
  defaultLogger.info(res);
});
