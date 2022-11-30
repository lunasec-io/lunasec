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
import React, { useEffect } from 'react';
import { Button, Row, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';

import api from '../../../api';
import { StickyScrollableElement } from '../../../components/utils/StickyScrollableElement';
import { CweDetails } from '../../cwes/detail/CweDetails';
import { VulnerabilityDetailBody } from '../../vulnerabilities/detail/DetailBody';

import { QuickViewCwe, QuickViewProps, QuickViewState, QuickViewVulnerability } from './types';

interface VulnQuickViewProps {
  quickView: QuickViewProps;
  sideBySideView: boolean;
}

interface CweQuickViewProps {
  cweState: QuickViewCwe;
  sideBySideView: boolean;
}

interface VulnerabilityQuickViewProps {
  vulnState: QuickViewVulnerability;
  sideBySideView: boolean;
}

const CweQuickView: React.FC<CweQuickViewProps> = ({ cweState, sideBySideView }) => {
  const { data, isFetching } = api.useGetCweDetailsQuery({ id: cweState.id });

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

const VulnerabilityQuickView: React.FC<VulnerabilityQuickViewProps> = ({ vulnState, sideBySideView }) => {
  const { data, isFetching } = api.useGetVulnerabilityDetailsQuery({ vulnerability_id: vulnState.id });

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

export const QuickView: React.FC<VulnQuickViewProps> = ({ quickView, sideBySideView }) => {
  const CloseButton = (
    <Row className="m-4">
      <Button onClick={() => closeQuickView()} variant="light">
        <ArrowLeft className="pb-1" />
        {sideBySideView ? 'Close' : 'Back to findings'}
      </Button>
    </Row>
  );

  function closeQuickView() {
    quickView.setVulnQuickViewState(null);
  }

  // hacks to catch the back button and use it to close the vuln quick view without leaving the snapshot altogether
  // react router v6 is absolute trash and they took out this functionality
  // check this thread for updates on a better solution https://github.com/remix-run/react-router/issues/8139
  useEffect(() => {
    // Add a fake history event so that the back button does nothing by default
    window.history.pushState('fake-route', document.title, window.location.href);

    addEventListener('popstate', closeQuickView);

    // Here is the cleanup when this component unmounts
    return () => {
      removeEventListener('popstate', closeQuickView);
      // If we left without using the back button, aka by clicking a button on the page, we need to clear out that fake history event
      if (window.history.state === 'fake-route') {
        window.history.back();
      }
    };
  }, []);

  const quickViewComponent = () => {
    if (quickView.quickViewState?.type === 'vulnerability') {
      return <VulnerabilityQuickView vulnState={quickView.quickViewState} sideBySideView={sideBySideView} />;
    }
    if (quickView.quickViewState?.type === 'cwe') {
      return <CweQuickView cweState={quickView.quickViewState} sideBySideView={sideBySideView} />;
    }
    return null;
  };

  return (
    <>
      <StickyScrollableElement enabled={sideBySideView}>
        <h2 className="text-center">Quick View</h2>

        {CloseButton}
        {quickViewComponent()}
        {CloseButton}
      </StickyScrollableElement>
    </>
  );
};
