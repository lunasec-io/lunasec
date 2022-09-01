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

import { GetBuildDetailsQuery, Resolved_Manifest } from '../../../api/generated';
import { DependencyTree } from '../../../dependency-tree/builds-dependency-tree';
import useBreakpoint from '../../../hooks/useBreakpoint';

import { QuickViewProps } from './types';
import { VulnerablePackageList } from './vulnerable-packages/VulnerablePackageList';
import { Finding } from './vulnerable-packages/types';

export type ResolvedManifestQueryResponse = NonNullable<GetBuildDetailsQuery['builds_by_pk']>['resolved_manifests'];

export interface DependencyTreeViewerProps {
  findings: Finding[];
  quickViewConfig: QuickViewProps;
  resolvedManifests: ResolvedManifestQueryResponse;
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
