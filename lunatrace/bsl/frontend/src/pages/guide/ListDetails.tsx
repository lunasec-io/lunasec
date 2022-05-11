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
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { GetAllGuidesQuery } from '../../api/generated';
import { prettyDate } from '../../utils/pretty-date';

interface GuideListProps {
  guides: NonNullable<GetAllGuidesQuery['guides']>;
}
export const GuideListDetails: React.FC<GuideListProps> = ({ guides }) => {
  const navigate = useNavigate();

  const guideItems = guides.map((guide) => {
    return (
      <Card key={guide.id} className="clickable-card" onClick={() => navigate(`/guides/${guide.id}`)}>
        <Card.Body>
          <Row>
            <Col md="4">
              <h3>{guide.title}</h3>
            </Col>
            <Col md="4" className="text-md-center">
              <span>{prettyDate(new Date(guide.created_at))}</span>
            </Col>
            <Col md="4" className="text-md-end">
              <span className="darker "> Severity: </span>
              <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                <h4 className={`${guide.severity}`} style={{ display: 'inline' }}>
                  {guide.severity}
                </h4>
              </div>
            </Col>
          </Row>
          <Row>
            <span>{guide.summary}</span>
          </Row>
        </Card.Body>
      </Card>
    );
  });
  return <>{guideItems}</>;
};
