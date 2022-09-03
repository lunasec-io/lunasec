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
import { useNavigate } from 'react-router-dom';

import api from '../../../api';
import { StickyScrollableElement } from '../../../components/utils/StickyScrollableElement';
import { VulnerabilityDetailBody } from '../../vulnerabilities/detail/DetailBody';
interface VulnQuickViewProps {
  vulnId: string;
  setVulnId: (vulnId: string | null) => void;
  sideBySideView: boolean;
}

export const VulnQuickView: React.FC<VulnQuickViewProps> = ({ vulnId, setVulnId, sideBySideView }) => {
  const { data, isFetching } = api.useGetVulnerabilityDetailsQuery({ vulnerability_id: vulnId });

  const CloseButton = (
    <Row className="m-4">
      <Button onClick={() => closeQuickView()} variant="light">
        <ArrowLeft className="pb-1" />
        {sideBySideView ? 'Close' : 'Back to findings'}
      </Button>
    </Row>
  );

  function closeQuickView() {
    setVulnId(null);
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

  return (
    <>
      <StickyScrollableElement enabled={sideBySideView}>
        <h2 className="text-center">Vulnerability Quick View</h2>

        {CloseButton}

        {data && data.vulnerability_by_pk && !isFetching ? (
          <VulnerabilityDetailBody vuln={data.vulnerability_by_pk} isEmbedded={true} sideBySideView={sideBySideView} />
        ) : (
          <Spinner animation="border" />
        )}
        {CloseButton}
      </StickyScrollableElement>
    </>
  );
};
