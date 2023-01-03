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
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { GetCwes } from './types';

interface ListItemProps {
  cwe: GetCwes;
}

export const CweListItem: React.FunctionComponent<ListItemProps> = ({ cwe }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        onClick={() => navigate(`/cwes/${cwe.id.toString()}`)}
        className="flex-fill w-100 vulnerability clickable-card"
      >
        <Card.Header>
          <Container fluid>
            <Row>
              <Col sm="6">
                <Card.Title>
                  <h3>{cwe.name}</h3>
                </Card.Title>
              </Col>
              <Col sm={{ span: 6 }} className="mt-xs-2 mt-sm-0">
                <div>
                  <Card.Title className="text-right">
                    <span className="darker h4"> ID: </span>
                    <div style={{ display: 'inline-block' }}>
                      <h4 style={{ display: 'inline' }}>{`CWE-${cwe.id}`}</h4>
                    </div>
                  </Card.Title>
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body className="d-flex">
          <Container>
            <Row>
              <Col md={12}>
                <p>{cwe.description}</p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};
