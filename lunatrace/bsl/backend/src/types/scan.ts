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
export interface Finding {
  package_name: string;
  version: string;
  version_matcher: string;
  type: string;
  locations: string[];
  severity: string;
  language: string;
  purl: string;
  virtual_path: string | null;
  matcher: string;
  dedupe_slug: string; // A combo of the CVE name and package name combined with all the locations it was found, the issue with this is that if locations change or reorder a new finding will be created
  meta: {
    vuln_slug: string;
    pkg_slug: string;
    version_slug: string;
  };
}

export interface Report {
  findings: Finding[];
  source_type: string;
  target: string;
  db_date: Date;
  grype_version: string;
  distro_name: string;
  distro_version: string;
  build_id: string;
}
