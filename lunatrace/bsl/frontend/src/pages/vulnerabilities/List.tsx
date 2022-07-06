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

import { VulnerabilityListItem } from './ListItem';
import { VulnInfo } from './types';
interface VulnerabilityListProps {
  vulnerabilities: VulnInfo[];
  isLoading: boolean;
}

export const VulnerabilitiesList: React.FunctionComponent<VulnerabilityListProps> = ({
  vulnerabilities,
  isLoading,
}) => {
  const vulnCards = vulnerabilities.map((vuln) => {
    return (
      <Row key={vuln.id}>
        <VulnerabilityListItem vuln={vuln} />
      </Row>
    );
  });
  return (
    <Container className="vulnerability-list">
      {vulnCards}
      {isLoading ? <Spinner animation="border" variant="primary" /> : null}
    </Container>
  );
};
