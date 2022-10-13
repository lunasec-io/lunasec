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
import React from 'react';

import api from '../../../api';
import { GetBuildDetailsQuery } from '../../../api/generated';

import { QuickViewProps } from './types';
import { LegacyGrypeVulnerablePackageList } from './vulnerable-packages-legacy-grype/LegacyGrypeVulnerablePackageList';
import { Finding } from './vulnerable-packages-legacy-grype/types';

export type ResolvedManifestQueryResponse = NonNullable<GetBuildDetailsQuery['builds_by_pk']>['resolved_manifests'];

export interface DependencyTreeViewerProps {
  findings: Finding[];
  quickViewConfig: QuickViewProps;
  resolvedManifests: ResolvedManifestQueryResponse;
  projectId: string;
  toggleIgnoreFindings: () => void;
}

export const VulnerablePackageListWrapper: React.FunctionComponent<DependencyTreeViewerProps> = (
  props: DependencyTreeViewerProps
) => {
  const { findings, quickViewConfig, resolvedManifests, projectId, toggleIgnoreFindings } = props;

  const { data: vulnerableReleasesData, isLoading } = api.useVulnerableReleasesFromBuildQuery();
  return (
    <LegacyGrypeVulnerablePackageList
      project_id={projectId}
      findings={findings}
      depTree={null}
      quickView={quickViewConfig}
      setIgnoreFindings={toggleIgnoreFindings}
    />
  );
};
