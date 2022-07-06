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

import { FindingForCounting, VulnerabilitySeverity } from './types';

function selectCvssSeverityFromList(severities: VulnerabilitySeverity[]) {
  const v3Severities = severities.filter((s) => s.type === 'CVSS_V3');
  if (v3Severities.length > 0) {
    return v3Severities[0];
  }
  return severities[0];
}

export function getCvssVectorFromSeverities(severities: VulnerabilitySeverity[]): CvssScore | null {
  if (severities.length === 0) {
    return null;
  }
  const severity = selectCvssSeverityFromList(severities);
  return parseCvssVector(severity.score);
}

export function countCriticalVulnerabilities(findings: FindingForCounting[]): number {
  const criticalPackagePurls = new Set<string>();
  findings.forEach((finding) => {
    if (!finding.vulnerability) {
      return;
    }

    const severity = getCvssVectorFromSeverities(finding.vulnerability.severities);
    // TODO (cthompson) getCvssVectorFromSeverities needs to be moved into the common folder
    if (severity && severity.cvss3OverallSeverityText === 'critical' && finding.purl) {
      criticalPackagePurls.add(finding.purl);
    }
  });
  return criticalPackagePurls.size;
}
