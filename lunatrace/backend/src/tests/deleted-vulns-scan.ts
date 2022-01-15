/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import os from 'os';
import path from 'path';

import { VulnerabilityLoader } from '../utils/vulnerabilityLoader';

const dbPath = path.join(os.homedir(), '.cache/grype/db/3/vulnerability.db');

async function compareReports() {
  const newData = await VulnerabilityLoader.loadVulnerabilities(dbPath);
  const oldData = await VulnerabilityLoader.loadVulnerabilities('/home/forrest/tmp/old-vulnerability.db');
  Object.keys(oldData.vulnIndex).forEach((slug) => {
    if (newData.vulnIndex[slug] === undefined) {
      console.log(slug);
    }
  });
}

void compareReports();
