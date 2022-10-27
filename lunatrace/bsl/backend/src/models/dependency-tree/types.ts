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

/* -------------------------------------------------------------------------- */
/*                    Input data as it comes from the database                */
/* -------------------------------------------------------------------------- */

export interface RawManifest {
  path?: string | null;
  child_edges_recursive?: RawEdge[] | null;
}
export interface RawEdge {
  child_id: string;
  parent_id?: string;
  id: string;
  child: RawNode;
}

// Referred to as a "manifest_dependency_node" in the database, which we shorted here to "node"
export interface RawNode {
  id: string;
  range: string;
  release_id: string;
  release: RawRelease;
  labels?: Record<string | number | symbol, unknown>;
}

interface RawRelease {
  id: string;
  version: string;
  package: RawPackage;
}

interface RawPackage {
  affected_by_vulnerability: Array<RawVulnMeta>;
  name: string;
  package_manager: string;
}

export interface RawVulnMeta {
  vulnerability: {
    id: string;
    severity_name?: string | null;
    cvss_score?: number | null;
    source: string;
    source_id: string;
    summary?: string | null;
    guide_vulnerabilities: Array<{ guide: RawGuide }>;
  };
  ranges: Array<{
    introduced?: string | null;
    fixed?: string | null;
  }>;
}

export interface RawGuide {
  id: string;
  title: string;
  summary: string;
}

export interface IgnoredVulnerability {
  vulnerability_id: string;
  locations: string[];
  note: string;
}
/* -------------------------------------------------------------------------- */
/*                  Output data that is returned from the tree                */
/* -------------------------------------------------------------------------- */

export interface BuiltNode extends RawNode {
  // we dump these in here as we build the tree so we can forget about edges, because edges are confusing
  edge_id: string;
  parent_id?: string;
  release: BuiltRelease;
}

export interface BuiltRelease extends RawRelease {
  package: BuiltPackage;
}

interface BuiltPackage extends RawPackage {
  affected_by_vulnerability: Array<BuiltVulnMeta>;
}

export interface BuiltVulnMeta extends RawVulnMeta {
  trivially_updatable_to: string | null; // We add this by determining something can be updated to a non-vulnerable version without violating semver
  chains: DependencyChain[]; // each vuln has its own sublist of chains in addition to the global list in the main body of the release. This is in case some have been eliminated by false-positive analysis for only this vuln
  path: string;
  beneath_minimum_severity: boolean;
  fix_versions: string[];
  ignored: boolean;
  ignored_vulnerability: IgnoredVulnerability | undefined;
}

export type DependencyChain = Array<BuiltNode>;

// This is the OUTPUT/RESPONSE type that we generate from the tree (from the above data types) and return to the client or consumer.
// Note that it references many of the same types as above, as this is essentially just a reorganization and subset of the above data, with some additional computed fields such as devOnly
export interface VulnerableRelease {
  release: BuiltRelease;
  severity: string;
  beneath_minimum_severity: boolean; // if all its vulns are beneath severity, mark the release as beneath severity as well
  chains: DependencyChain[];
  cvss: number | null; // the highest rating from all the vulns on the release, used for giving the user an at-a-glance rating
  dev_only: boolean;
  affected_by: Array<BuiltVulnMeta>;
  trivially_updatable: 'no' | 'partially' | 'yes';
  paths: string[];
  guides: RawGuide[];
  fix_versions: string[];
}
