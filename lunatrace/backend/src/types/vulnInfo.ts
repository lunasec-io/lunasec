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
export interface PkgInfo {
  vulnerability_name_namespaced: string;
  pkg_name: string;
  version_constraint: string;
  version_format: string;
  fixed_in_versions: string;
  fix_state: string;
  cpes: string;
  advisories: string;
}

export interface VulnInfo {
  name: string;
  namespace: string;
  name_namespaced: string;
  related_vulnerabilities: string;
  data_source: string;
  record_source: string;
  severity: string;
  urls: string;
  description: string;
}
