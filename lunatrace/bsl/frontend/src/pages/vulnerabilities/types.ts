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
import { GetVulnerabilityDetailsQuery, SearchVulnerabilitiesQuery } from '../../api/generated';

export type VulnInfo = SearchVulnerabilitiesQuery['vulnerabilities'][number];

export type VulnInfoDetails = NonNullable<GetVulnerabilityDetailsQuery['vulnerabilities_by_pk']>;

export type Order = 'cvss' | 'date' | 'severity' | 'none';
