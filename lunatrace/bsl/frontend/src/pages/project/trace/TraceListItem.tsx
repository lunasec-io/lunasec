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

import { prettyDate } from '../../../utils/pretty-date';
import { InstanceInfo } from '../types';

interface TraceListItemProps {
  instance: InstanceInfo;
  onClick: (_e: unknown) => void;
}

export const TraceListItem: React.FunctionComponent<TraceListItemProps> = ({ instance, onClick }) => {
  const createdDate = prettyDate(new Date(instance.created_at as string));

  return (
    <Card onClick={onClick} className="flex-fill w-100 build build-card clickable-card">
      <Card.Header>
        <Container fluid>
          <Row>
            <Col sm="6">
              <Card.Title>
                <h3>
                  <span className="darker">Instance: </span>
                  {instance.hostname}
                </h3>
              </Card.Title>
            </Col>
          </Row>
        </Container>
      </Card.Header>

      <Card.Body className="d-flex">
        <Container fluid>
          <Row>
            <Col xs="12">
              <h6 className="text-sm">
                <span className="darker"> Startup:</span> {createdDate}
              </h6>
              <h6 className="text-sm">
                <span className="darker">{instance.logs_aggregate.aggregate?.count} messages</span>
              </h6>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};
