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
export interface Finding {
  package_name: string;
  version: string;
  version_matcher: string;
  type: string;
  locations: string[];
  language: string;
  purl: string;
  virtual_path: string | null;
  matcher: string;
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
  project_id: string;
}
