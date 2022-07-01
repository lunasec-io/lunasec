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
export interface AuditReport {
  auditReportVersion: number;
  vulnerabilities: AuditReportVulnerabilities;
  metadata: Metadata;
}

export interface Metadata {
  vulnerabilities: MetadataVulnerabilities;
  dependencies: Dependencies;
}

export interface Dependencies {
  prod: number;
  dev: number;
  optional: number;
  peer: number;
  peerOptional: number;
  total: number;
}

export interface MetadataVulnerabilities {
  info: number;
  low: number;
  moderate: number;
  high: number;
  critical: number;
  total: number;
}

export type AuditReportVulnerabilities = Record<string, Vulnerability>;

export interface FixAvailable {
  name: string;
  version: string;
  isSemVerMajor: boolean;
}

export interface Via {
  source: number;
  name: string;
  dependency: string;
  title: string;
  url: string;
  severity: string;
  cwe: string[];
  cvss: Cvss;
  range: string;
}

export interface Cvss {
  score: number;
  vectorString: string;
}

export interface Vulnerability {
  name: string;
  severity: string;
  isDirect: boolean;
  via: Via[];
  effects: any[];
  range: string;
  nodes: string[];
  fixAvailable: boolean | FixAvailable;
}
