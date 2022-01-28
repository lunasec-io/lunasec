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

// TODO: Pull in CVSS
export interface PkgVersion {
  version_constraint: string; // use this to dedup, okay if empty, just overwrite
  version_format: string;
  fixed_in_versions: string[];
  fix_state: string;
  cpes: string[];
  pkg_slug: string; // foreign key -> pkg.id
  slug: string; // vuln.name : vuln.namespace : pkg.name : version_constraint
}
export interface PkgInfo {
  vuln_slug: string; // foreign key -> vuln.name_namespaced
  slug: string; // vuln.name : vuln.namespace : name
  name: string;
  advisories: string;
}

export type VulnInfo = VulnWithoutCvss & CvssColumns;

export interface VulnWithoutCvss {
  name: string;
  namespace: string;
  slug: string; // name : namespace
  data_source: string;
  record_source: string;
  severity: string;
  urls: string[];
  description: string;
}

export interface CvssColumns {
  cvss_version: string | null;
  cvss_score: number | null;
  cvss_exploitability_score: number | null;
  cvss_impact_score: number | null;
  cvss_inferred: boolean | null;
}

export interface RelatedVulnerability {
  vulnerability_slug: string;
  related_vulnerability_slug: string;
}
