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
import { Button, Row, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
      <Button onClick={() => setVulnId(null)} variant="light">
        <ArrowLeft className="pb-1" />
        {sideBySideView ? 'Close' : 'Back to findings'}
      </Button>
    </Row>
  );

  return (
    <>
      <StickyScrollableElement enabled={sideBySideView}>
        <h2 className="text-center">Vulnerability Quick View</h2>

        {CloseButton}

        {data && data.vulnerabilities_by_pk && !isFetching ? (
          <VulnerabilityDetailBody
            vuln={data.vulnerabilities_by_pk}
            isEmbedded={true}
            sideBySideView={sideBySideView}
          />
        ) : (
          <Spinner animation="border" />
        )}
        {CloseButton}
      </StickyScrollableElement>
    </>
  );
};
