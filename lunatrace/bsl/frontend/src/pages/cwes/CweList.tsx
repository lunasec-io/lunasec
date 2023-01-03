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
import { Container, Row, Spinner } from 'react-bootstrap';

import { CweListItem } from './CweListItem';
import { GetCwes } from './types';

interface ListProps {
  cwes: GetCwes[];
  isLoading: boolean;
}

export const CweList: React.FunctionComponent<ListProps> = ({ cwes, isLoading }) => {
  const vulnCards = cwes.map((cwe) => {
    return (
      <Row key={cwe.id}>
        <CweListItem cwe={cwe} />
      </Row>
    );
  });
  return (
    <Container className="cwe-list">
      {vulnCards}
      {isLoading ? <Spinner animation="border" variant="primary" /> : null}
    </Container>
  );
};
