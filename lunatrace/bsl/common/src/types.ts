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
    topic_vulnerabilities?: Array<{
      topic: Topic;
    }>;
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
  topics: Topic[];
  language: string;
  type: string;
  package_name: string;
  cvss_score: number | null;
  fix_state: string | null;
  fix_versions: string[];
  findings: F[];
  project_id: string;
}

export interface Topic {
  id: string;
  body: string;
  metadata: any;
  title: string;
  summary: string;
  created_at: any;
  metadata_schema_version: number;
  related_topics: Array<{
    topic: { title: string; summary: string; id: any };
  }>;
}

// TOPICS --------------------------------------

// Convenience type for when we have more schema versions and we can | them together
export type TopicMetadata = TopicMetadata1;
export interface TopicMetadata1 {
  schemaVersion: number;
  cves: string[];
  name: string;
  summary: string;
  language: string;
  severity: string;
  advisories: Advisory[];
  cwe: Cwe;
  tags: string[];
  packages: Package[];
  conditions: Condition[];
  tools: Tool[];
  relatedTopics: string[];
}

export interface Advisory {
  type: string;
  name: string;
  url: string;
}

export interface Condition {
  type: string;
  purl?: string;
  versionConstraint: string;
  name?: string;
}

export interface Cwe {
  number: number;
  name: string;
}

export interface Package {
  type: string;
  purl: string;
  language: string;
  name: string;
  versionConstraint: string;
  fixed: boolean;
  fixVersion: string;
}

export interface Tool {
  name: string;
  link: string;
}
