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

import api from '../../../api';
import { VulnerabilityDetailBody } from '../../vulnerabilities/detail/DetailBody';
interface VulnQuickViewProps {
  vulnId: string;
  setVulnId: (vulnId: string | null) => void;
  sideBySideView: boolean;
}

export const VulnQuickView: React.FC<VulnQuickViewProps> = ({ vulnId, setVulnId, sideBySideView }) => {
  const { data } = api.useGetVulnerabilityDetailsQuery({ vulnerability_id: vulnId });

  return (
    <>
      <Row className="m-4">
        <Button onClick={() => setVulnId(null)} variant="light">
          <ArrowLeft className="pb-1" />
          {sideBySideView ? 'Close' : 'Back to findings'}
        </Button>
      </Row>

      {data && data.vulnerabilities_by_pk ? (
        <VulnerabilityDetailBody vuln={data.vulnerabilities_by_pk} isEmbedded={true} />
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};
