/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Copy, LogOut } from 'react-feather';

import { prettyDate } from '../../utils/pretty-date';

import { VulnInfo } from './types';

interface VulnerabilityListItemProps {
  vuln: VulnInfo;
}

export const VulnerabilityListItem: React.FunctionComponent<VulnerabilityListItemProps> = ({ vuln }) => {
  const packageNamesString = vuln.vulnerability_packages.map((p) => p.name).join(', ');

  const renderCvssScore = () => {
    if (!vuln.cvss_score) {
      return null;
    }
    return (
      <>
        <span>
          CVSS:{' '}
          <h3>
            {vuln.cvss_score} {renderCvssInferredWarning()}
          </h3>
        </span>
      </>
    );
  };

  const renderCvssInferredWarning = () => {
    if (!vuln.cvss_inferred) {
      return null;
    }
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>This CVSS score has been inferred from a linked NVD vulnerability.</Tooltip>}
      >
        <Copy size="12" />
      </OverlayTrigger>
    );
  };

  return (
    <>
      <Card className="flex-fill w-100 vulnerability">
        <Card.Header>
          {/*<div className="card-actions float-end">*/}
          {/*  <Dropdown align="end">*/}
          {/*    <Dropdown.Toggle as="a" bsPrefix="-">*/}
          {/*      <MoreHorizontal />*/}
          {/*    </Dropdown.Toggle>*/}
          {/*    <Dropdown.Menu>*/}
          {/*      <Dropdown.Item>Action</Dropdown.Item>*/}
          {/*      <Dropdown.Istem>Another Action</Dropdown.Item>*/}
          {/*      <Dropdown.Item>Something else here</Dropdown.Item>*/}
          {/*    </Dropdown.Menu>*/}
          {/*  </Dropdown>*/}
          {/*</div>*/}
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
                    <h3>
                      <span className="darker"> Severity: </span>
                      {vuln.severity}
                    </h3>
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
              <Col sm={{ order: 'last', span: 3 }}>
                <div style={{ float: 'right' }}>{renderCvssScore()}</div>
              </Col>
              <Col sm="3" xs="12">
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
              <Col sm="6" xs="12">
                {vuln.description ? (
                  <>
                    Description:
                    <p>
                      <strong>{vuln.description}</strong>
                    </p>
                  </>
                ) : null}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};
