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
import { SeverityNamesOsv } from '@lunatrace/lunatrace-common/build/main';
import {
  ArrayParam,
  DateParam,
  DecodedValueMap,
  NumberParam,
  SetQuery,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';

import {
  GetVulnerabilityDetailsQuery,
  GetVulnerabilityFindingsQuery,
  SearchVulnerabilitiesQuery,
} from '../../api/generated';

export type VulnInfo = SearchVulnerabilitiesQuery['vulnerability'][number];

export type VulnInfoDetails = NonNullable<GetVulnerabilityDetailsQuery['vulnerability_by_pk']>;

export type Order = 'cvss' | 'date' | 'none';

export type Findings = NonNullable<GetVulnerabilityFindingsQuery['vulnerability_by_pk']>['findings'];

// These values get encoded into the url, that's why they use underscores
// export interface SearchControls {
//   ecosystem: string;
//   minimum_severity: SeverityNamesOsv;
//   search: string;
//   from_date_string: string;
//   to_date_string: string;
//   cwe: string;
// }

// This uses the useQueryParams library to control what our query params are, what type they are, and their defaults
export const searchParamsConfigMap = {
  ecosystem: withDefault(StringParam, ''),
  minimum_severity: withDefault(StringParam, 'Unknown'),
  search: withDefault(StringParam, ''),
  cwe: withDefault(StringParam, ''),
  from_date_string: withDefault(DateParam, null),
  to_date_string: withDefault(DateParam, null),
  order_by: withDefault(StringParam, ''),
};

export type EcoSystem = 'javascript'|'ruby'|'java'|'python'|'php'|'golang'


export type SearchControls = DecodedValueMap<typeof searchParamsConfigMap>;
export type SetSearchControls = SetQuery<typeof searchParamsConfigMap>;
