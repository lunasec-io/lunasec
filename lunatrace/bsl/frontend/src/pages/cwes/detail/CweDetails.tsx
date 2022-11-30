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
import { Card, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { ExternalLink } from 'react-feather';

import { CweInfoDetails } from '../../project/builds/types';

interface CweDetailBodyProps {
  cwe: CweInfoDetails;
  sideBySideView?: boolean;
}

export const CweDetails: React.FunctionComponent<CweDetailBodyProps> = ({ sideBySideView = false, cwe }) => {
  return (
    <>
      <Container className="vulnerability-detail-page">
        <Row>
          <Col xs="12">
            <h1>CWE-{cwe.id}</h1>
            <a
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              href={`https://cwe.mitre.org/data/definitions/${cwe.id}.html`}
            >
              mitre
              <ExternalLink size="1em" className="mb-1 me-1" />
            </a>
          </Col>
          <hr />
          <Col md="12">
            <Card>
              <Card.Header>
                <span className="lighter">{cwe.name}</span>
              </Card.Header>
              <Card.Body>
                {cwe.common_name ? (
                  <p>
                    <span className={'lighter'}>Common Name:</span> {cwe.common_name}
                  </p>
                ) : null}
                {cwe.description}
                <hr />
                {cwe.extended_description}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
