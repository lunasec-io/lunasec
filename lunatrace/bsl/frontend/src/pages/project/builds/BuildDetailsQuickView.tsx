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
import React, { useEffect, useState } from 'react';
import { Button, Row, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import { useLocation, useSearchParams } from 'react-router-dom';

import api from '../../../api';
import { StickyScrollableElement } from '../../../components/utils/StickyScrollableElement';
import { useQuickView } from '../../../hooks/useQuickView';
import { CweDetails } from '../../cwes/detail/CweDetails';
import { VulnerabilityDetailBody } from '../../vulnerabilities/detail/DetailBody';

import { QuickViewProps } from './types';

interface VulnQuickViewProps {
  sideBySideView: boolean;
}

interface CweQuickViewProps {
  cweId: number;
  sideBySideView: boolean;
}

interface VulnerabilityQuickViewProps {
  vulnId: string;
  sideBySideView: boolean;
}

// TODO: Get these multiple components into their own files, this is bad
const CweQuickView: React.FC<CweQuickViewProps> = ({ cweId, sideBySideView }) => {
  const { data, isFetching } = api.useGetCweDetailsQuery({ id: cweId });

  return (
    <>
      {data && data.vulnerability_cwe_by_pk && !isFetching ? (
        <CweDetails cwe={data.vulnerability_cwe_by_pk} sideBySideView={sideBySideView} />
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

const VulnerabilityQuickView: React.FC<VulnerabilityQuickViewProps> = ({ vulnId, sideBySideView }) => {
  const { data, isFetching } = api.useGetVulnerabilityDetailsQuery({ vulnerability_id: vulnId });

  return (
    <>
      {data && data.vulnerability_by_pk && !isFetching ? (
        <VulnerabilityDetailBody vuln={data.vulnerability_by_pk} isEmbedded={true} sideBySideView={sideBySideView} />
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

// We show a temporary view of any vulnerabilities that get clicked, instead of redirecting.  This is much faster when doing an audit
// because it prevents the loss of the app state/context and any open dropdowns and filters.
export const BuildDetailsQuickView: React.FC<VulnQuickViewProps> = ({ sideBySideView }) => {
  const quickView = useQuickView();
  const CloseButton = (
    <Row className="m-4">
      <Button onClick={() => quickView.setState({ mode: 'off', id: null })} variant="light">
        <ArrowLeft className="pb-1" />
        {sideBySideView ? 'Close' : 'Back to findings'}
      </Button>
    </Row>
  );

  const renderQuickView = () => {
    console.log('rendering quick view');
    if (quickView.state.mode === 'vuln') {
      return <VulnerabilityQuickView vulnId={quickView.state.id} sideBySideView={sideBySideView} />;
    }
    if (quickView.state.mode === 'cwe') {
      return <CweQuickView cweId={Number(quickView.state.id)} sideBySideView={sideBySideView} />;
    }
    // mode === 'off'
    return null;
  };

  return (
    <>
      <StickyScrollableElement enabled={sideBySideView}>
        <h2 className="text-center">Quick View</h2>

        {CloseButton}
        {renderQuickView()}
        {CloseButton}
      </StickyScrollableElement>
    </>
  );
};
