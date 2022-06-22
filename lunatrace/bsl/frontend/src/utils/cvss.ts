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
import { CvssScore, parseCvssVector } from 'vuln-vects';

import { Vulnerability_Severity } from '../api/generated';

function selectCvssSeverityFromList(severities: Vulnerability_Severity[]) {
  const v3Severities = severities.filter((s) => s.type === 'CVSS_V3');
  if (v3Severities.length > 0) {
    return v3Severities[0];
  }
  return severities[0];
}

export function getCvssVectorFromSeverities(severities: Vulnerability_Severity[]): CvssScore {
  if (severities.length === 0) {
    throw new Error('there are no severities ');
  }
  const severity = selectCvssSeverityFromList(severities);
  return parseCvssVector(severity.score);
}
