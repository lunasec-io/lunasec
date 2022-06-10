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
import { Card, Col, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { CvssInferredWarning } from '../../../components/CvssInferredWarning';
import { VulnInfoDetails } from '../types';

export const AffectedPackagesList: React.FC<{ relatedVulns: VulnInfoDetails['related_vulnerabilities'] }> = ({
  relatedVulns,
}) => {
  const navigate = useNavigate();

  return (
    <Row>
      <Col xs="12">
        <Card>
          <Card.Body>
            <Card.Title>Related Vulnerabilities</Card.Title>
            <Table size="sm" hover>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Vulnerability Number</th>
                  <th>Severity</th>
                  <th>CVSS</th>
                </tr>
              </thead>
              <tbody>
                {relatedVulns.map(({ vulnerability: relatedVuln }) => {
                  return (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip className="wide-tooltip"> {relatedVuln.description}</Tooltip>}
                      key={relatedVuln.id}
                    >
                      <tr
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/vulnerabilities/${relatedVuln.id as string}`)}
                      >
                        <td>{relatedVuln.namespace}</td>
                        <td>{relatedVuln.name}</td>
                        <td>{relatedVuln.severity}</td>
                        <td>
                          {relatedVuln.cvss_score}{' '}
                          <CvssInferredWarning inferred={relatedVuln.cvss_inferred || false} placement="top" />
                        </td>
                      </tr>
                    </OverlayTrigger>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
