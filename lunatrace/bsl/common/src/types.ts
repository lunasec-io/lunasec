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
export const severityOrder = ['Unknown', 'Negligible', 'Low', 'Medium', 'High', 'Critical'];

export interface Finding {
  created_at: string;
  purl: string;
  locations: string[];
  severity: typeof severityOrder[number];
  version: string;
  language: string;
  type: string;
  vulnerability: {
    namespace: string;
    slug: string;
    cvss_score?: number;
  };
  package_name: string;
  fix_state: string | null;
  fix_versions?: string[];
  vulnerability_id: string;
}

export interface VulnerablePackage<F extends Finding> {
  created_at: string;
  purl: string;
  locations: string[];
  severity: typeof severityOrder[number];
  version: string;
  language: string;
  type: string;
  package_name: string;
  cvss_score: number | null;
  fix_state: string | null;
  fix_versions: string[];
  findings: F[];
  project_id: string;
}
