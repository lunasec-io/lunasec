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
import { SeverityNamesOsv } from '@lunatrace/lunatrace-common/build/main';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

import api from '../../../../api';
import { Builds } from '../../../../api/generated';
import { SpinIfLoading } from '../../../../components/SpinIfLoading';
import { BuildDetailInfo, QuickViewProps } from '../types';

import { LegacyGrypeVulnerablePackageList } from './vulnerable-packages-legacy-grype/LegacyGrypeVulnerablePackageList';
import { Finding } from './vulnerable-packages-legacy-grype/types';
import { VulnerablePackagesList } from './vulnerable-packages/VulnerablePackagesList';

export interface VulnerablePackageListWrapperProps {
  findings: Finding[];
  quickViewConfig: QuickViewProps;
  projectId: string;
  buildId: string;
  toggleIgnoreFindings: () => void;
  shouldIgnore: boolean;
  build: BuildDetailInfo;
}

// This component will switch between legacy views or the newer tree-based view if data is available
export const VulnerablePackageListWrapper: React.FC<VulnerablePackageListWrapperProps> = ({
  findings,
  quickViewConfig,
  projectId,
  toggleIgnoreFindings,
  buildId,
  shouldIgnore,
  build,
}) => {
  // severity state for modern tree data, legacy has its own state and doesn't use this
  const [severity, setSeverity] = useState<SeverityNamesOsv>('Critical');

  // data for modern tree, legacy doesn't use this
  const {
    data: vulnerableReleasesData,
    isLoading,
    isFetching,
  } = api.useGetVulnerableReleasesFromBuildQuery({
    buildId,
    minimumSeverity: severity,
  });

  const unfilteredVulnerableReleasesFromTree = vulnerableReleasesData?.vulnerableReleasesFromBuild;

  if (isLoading) {
    return <Spinner animation="border" />;
  }
  // we have tree data
  if (unfilteredVulnerableReleasesFromTree) {
    return (
      <>
        <SpinIfLoading isLoading={isFetching} />
        <VulnerablePackagesList
          vulnerablePackages={unfilteredVulnerableReleasesFromTree}
          quickView={quickViewConfig}
          setIgnoreFindings={toggleIgnoreFindings}
          severity={severity}
          setSeverity={setSeverity}
          shouldIgnore={shouldIgnore}
          build={build}
        />
      </>
    );
  }
  //legacy
  return (
    <LegacyGrypeVulnerablePackageList
      project_id={projectId}
      findings={findings}
      quickView={quickViewConfig}
      setIgnoreFindings={toggleIgnoreFindings}
    />
  );
};
