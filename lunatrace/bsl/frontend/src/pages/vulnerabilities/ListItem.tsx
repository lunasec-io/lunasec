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
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Copy } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { CvssInferredWarning } from '../../components/CvssInferredWarning';
import { prettyDate } from '../../utils/pretty-date';

import { VulnInfo } from './types';

interface VulnerabilityListItemProps {
  vuln: VulnInfo;
}

export const VulnerabilityListItem: React.FunctionComponent<VulnerabilityListItemProps> = ({ vuln }) => {
  const packageNamesString = vuln.vulnerability_packages.map((p) => p.name).join(', ');
  const navigate = useNavigate();
  const renderCvssScore = () => {
    if (!vuln.cvss_score) {
      return null;
    }
    return (
      <>
        <span>
          CVSS:{' '}
          <h3>
            {vuln.cvss_score} <CvssInferredWarning inferred={vuln.cvss_inferred || false} />
          </h3>
        </span>
      </>
    );
  };

  return (
    <>
      <Card
        onClick={() => navigate(`/vulnerabilities/${vuln.id as string}`)}
        className="flex-fill w-100 vulnerability clickable-card"
      >
        <Card.Header>
          <Container fluid>
            <Row>
              <Col sm="6">
                <Card.Title>
                  <h3>{vuln.name}</h3>
                </Card.Title>
                <Card.Subtitle>
                  <a href={vuln.data_source || ''}>{vuln.namespace} ↪</a>
                </Card.Subtitle>
              </Col>
              <Col sm={{ span: 6 }}>
                <div style={{ float: 'right' }}>
                  <Card.Title>
                    <span className="darker h4"> Severity: </span>
                    <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                      <h4 className={` ${vuln.severity}`} style={{ display: 'inline' }}>
                        {vuln.severity}
                      </h4>
                    </div>
                  </Card.Title>
                  <Card.Subtitle className="text-right">{prettyDate(new Date(vuln.created_at))}</Card.Subtitle>
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body className="d-flex">
          <Container fluid>
            <Row>
              <Col xs="12" sm={{ order: 'last', span: 3 }}>
                <div style={{ float: 'right' }}>{renderCvssScore()}</div>
              </Col>
              <Col sm="9" xs="12">
                <Card.Text>
                  Packages:{' '}
                  <p>
                    <strong>{packageNamesString}</strong>
                  </p>
                </Card.Text>
                <div className="align-self-center w-100">
                  {/*<div className="chart chart-lg">*/}
                  {/*  <Bar data={data} options={options} />*/}
                  {/*</div>*/}
                </div>
              </Col>
            </Row>

            {vuln.description ? (
              <Row>
                <Col xs="12">
                  Description:
                  <p>
                    <strong>{vuln.description}</strong>
                  </p>
                </Col>
              </Row>
            ) : null}
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};
