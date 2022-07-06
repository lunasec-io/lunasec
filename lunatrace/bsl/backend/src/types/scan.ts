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

export interface SbomBucketInfo {
  key: string;
  bucketName: string;
  region: string;
}

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
  fix_state: string | null;
  fix_versions: string[] | null;
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
