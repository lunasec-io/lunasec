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

// Represents a subset of the incoming data from hasura about a tree element

export interface DependencyEdgePartial {
  id: string;
  // multiple edges could have the same child id/ the same child
  child_id: string;
  // multiple edges could have the same parent, but no edges can have the same child and parent
  parent_id?: string;
  child: {
    id: string;
    parent_id?: string; // we dump this in here as we build the tree so we can forget about edges
    range: string;
    release_id: string;
    release: Release;
    labels?: Record<string | number | symbol, unknown>;
  };
}

interface Release {
  id: string;
  version: string;
  package: Package;
}

interface Package {
  affected_by_vulnerability: Array<AffectedByVulnerability>;
  name: string;
  package_manager: string;
}

export interface AffectedByVulnerability {
  vulnerability: {
    id: string;
    severity_name?: string;
    cvss_score?: number | null;
    source: string;
    source_id: string;
  };
  ranges: Array<{
    introduced?: string | null;
    fixed?: string | null;
  }>;
  triviallyUpdatable?: boolean; // We add this by determining something can be updated to a non-vulnerable version without violating semver
  chains?: DependencyChain<DependencyEdgePartial['child']>[]; // each vuln has its own sublist of chains in addition to the global list in the main body of the release. This is in case some have been eliminated by false-positive analysis for only this vuln
}

export type DependencyChain<D extends DependencyEdgePartial['child']> = Array<D>;

// This is the OUTPUT/RESPONSE type that we generate from the tree (from the above data types) and return to the client or consumer.
// Note that it references many of the same types as above, as this is essentially just a reorganization and subset of the above data, with some additional computed fields such as devOnly
export interface VulnerableRelease<DependencyEdge extends DependencyEdgePartial> {
  release: Release;
  severity: string;
  chains: DependencyChain<DependencyEdge['child']>[];
  cvss: number | null; // the highest rating from all the vulns on the release, used for giving the user an at-a-glance rating
  devOnly: boolean;
  affectedBy: Array<AffectedByVulnerability>;
  triviallyUpdatable: 'no' | 'partially' | 'yes';
}
