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
import React, { useMemo } from 'react';

import { Resolved_Manifest } from '../../../api/generated';
import { DependencyTree } from '../../../dependency-tree/builds-dependency-tree';
import useBreakpoint from '../../../hooks/useBreakpoint';

import { QuickViewProps } from './types';
import { VulnerablePackageList } from './vulnerable-packages/VulnerablePackageList';
import { Finding } from './vulnerable-packages/types';

export interface ResolvedManifestQueryResponse {
  __typename?: 'resolved_manifest';
  id: any;
  path?: string | null;
  child_edges_recursive?: Array<{
    __typename?: 'manifest_dependency_edge';
    parent_id: any;
    child_id: any;
    child: {
      __typename?: 'manifest_dependency_node';
      id: any;
      range: string;
      labels?: any | null;
      release_id: any;
      release: {
        __typename?: 'package_release';
        id: any;
        fetched_time?: any | null;
        version: string;
        package: {
          __typename?: 'package';
          name: string;
          last_successful_fetch?: any | null;
          package_manager: any;
          affected_by_vulnerability: Array<{
            __typename?: 'vulnerability_affected';
            vulnerability: { __typename?: 'vulnerability'; id: any; source_id: string; source: string };
            ranges: Array<{ __typename?: 'vulnerability_range'; introduced?: string | null; fixed?: string | null }>;
          }>;
        };
      };
    };
  }> | null;
}

export interface DependencyTreeViewerProps {
  findings: Finding[];
  quickViewConfig: QuickViewProps;
  resolvedManifests: ResolvedManifestQueryResponse[];
  projectId: string;
  toggleIgnoreFindings: () => void;
}

export const DependencyTreeViewer: React.FunctionComponent<DependencyTreeViewerProps> = (
  props: DependencyTreeViewerProps
) => {
  const { findings, quickViewConfig, resolvedManifests, projectId, toggleIgnoreFindings } = props;

  const depTree = useMemo(() => {
    const mergedDependencies = resolvedManifests.flatMap((manifest) => {
      return manifest.child_edges_recursive || [];
    });

    if (!mergedDependencies || mergedDependencies.length === 0) {
      return null;
    }

    return new DependencyTree(mergedDependencies);
  }, [resolvedManifests]);

  return (
    <VulnerablePackageList
      project_id={projectId}
      findings={findings}
      depTree={depTree}
      quickView={quickViewConfig}
      setIgnoreFindings={toggleIgnoreFindings}
    />
  );
};
