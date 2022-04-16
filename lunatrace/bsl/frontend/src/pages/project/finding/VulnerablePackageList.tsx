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
import { groupByPackage, severityOrder } from '@lunatrace/lunatrace-common';
import React, { useState } from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';

import { VulnerablePackageItem } from './VulnerablePackageItem';
import { Finding } from './types';

interface FindingListProps {
  findings: Finding[];
  project_id: string;
}

export const VulnerablePackageList: React.FunctionComponent<FindingListProps> = ({ project_id, findings }) => {
  console.log('rendering finding list');
  const [severityFilter, setSeverityFilter] = useState(severityOrder.indexOf('Critical'));
  const prettySeverity = severityOrder[severityFilter] === 'Unknown' ? 'None' : severityOrder[severityFilter];

  const vulnerablePkgs = groupByPackage(project_id, findings);
  const filteredVulnerablePkgs = vulnerablePkgs.filter((pkg) => severityOrder.indexOf(pkg.severity) >= severityFilter);

  const pkgCards = filteredVulnerablePkgs.map((pkg) => {
    return (
      <Row key={pkg.purl}>
        <VulnerablePackageItem severityFilter={severityFilter} pkg={pkg} />
      </Row>
    );
  });

  return (
    <Container className="vulnerability-list">
      <Row>
        <Col md="6">
          <h2>Vulnerable Packages</h2>
        </Col>
        <Col md="6" style={{ display: 'flex', justifyContent: 'right' }}>
          <Dropdown align={{ md: 'end' }} className="d-inline me-2">
            <Dropdown.Toggle>Minimum Severity: {prettySeverity}</Dropdown.Toggle>
            <Dropdown.Menu>
              {severityOrder
                .map((severityName, severityIndex) => {
                  return (
                    <Dropdown.Item
                      active={severityIndex === severityFilter}
                      onClick={() => setSeverityFilter(severityIndex)}
                      key={severityIndex}
                    >
                      {severityName === 'Unknown' ? 'None' : severityName}
                    </Dropdown.Item>
                  );
                })
                .reverse()}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <br />
      {pkgCards}
      {vulnerablePkgs.length > filteredVulnerablePkgs.length ? (
        <Row className="text-center">
          {' '}
          <span className="link-primary cursor-pointer" onClick={() => setSeverityFilter(0)}>
            Show {vulnerablePkgs.length - filteredVulnerablePkgs.length} lower severity vulnerabilities...{' '}
          </span>
        </Row>
      ) : null}
    </Container>
  );
};
