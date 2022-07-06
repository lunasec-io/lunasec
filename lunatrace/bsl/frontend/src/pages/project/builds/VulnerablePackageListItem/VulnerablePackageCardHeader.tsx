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
import { filterFindingsByIgnored, VulnerablePackage } from '@lunatrace/lunatrace-common/build/main';
import { getCvssVectorFromSeverities } from '@lunatrace/lunatrace-common/build/main/cvss';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { Finding } from './types';

interface VulnerablePackageCardHeaderProps {
  pkg: VulnerablePackage<Finding>;
}

export const VulnerablePackageCardHeader: React.FunctionComponent<VulnerablePackageCardHeaderProps> = ({ pkg }) => {
  const filteredFindings = filterFindingsByIgnored(pkg.findings);
  const allFindingsAreIgnored = filteredFindings.length === 0;
  const headerClassNames = allFindingsAreIgnored ? 'text-decoration-line-through' : '';

  // From the list of severities for a given vulnerability, determine which one is the most severe
  // and display this score. Most often, there will only be one score, but in the case there are multiple,
  // we need to choose one to show.
  const sortedSeverities = filteredFindings
    .map((finding) => getCvssVectorFromSeverities(finding.vulnerability.severities))
    .filter((severity) => !!severity)
    .sort((a, b) => (a && b ? b.overallScore - a.overallScore : 0));
  const mostSevereSeverity = sortedSeverities.length > 0 ? sortedSeverities[0] : null;

  return (
    <Card.Header>
      <Container fluid>
        <Row>
          <Col sm="6">
            <Card.Title>
              <h2 className={headerClassNames}>{pkg.package_name}</h2>
            </Card.Title>
            <Card.Subtitle>
              {' '}
              <span className="darker">Version: </span>
              {pkg.version}
            </Card.Subtitle>
          </Col>
          <Col sm={{ span: 6 }}>
            <div style={{ float: 'right', textAlign: 'right' }}>
              {mostSevereSeverity ? (
                <>
                  <Card.Title>
                    <span className="text-right darker"> Severity: </span>
                    <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                      <h4
                        className={`p-1 ${mostSevereSeverity.cvss3OverallSeverityText} text-capitalize`}
                        style={{ display: 'inline' }}
                      >
                        {mostSevereSeverity.cvss3OverallSeverityText}
                      </h4>
                    </div>
                  </Card.Title>
                  <Card.Subtitle>
                    {' '}
                    <span className="darker">CVSS: </span>
                    {mostSevereSeverity.overallScore}
                  </Card.Subtitle>
                </>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </Card.Header>
  );
};
