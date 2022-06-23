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
import { Vulnerability_Affected_Range_Event, Vulnerability_Affected_Version } from '../api/generated';

export function formatAdvisoryUrlForSource(source: string, sourceId: string) {
  if (source === 'ghsa') {
    return `https://github.com/advisories/${sourceId}`;
  }
  if (source === 'nvd') {
    return `https://nvd.nist.gov/vuln/detail/${sourceId}`;
  }
  return null;
}
