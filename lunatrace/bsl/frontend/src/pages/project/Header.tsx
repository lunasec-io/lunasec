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
import { Col, Row } from 'react-bootstrap';
import { BiLinkExternal } from 'react-icons/bi';

export interface ProjectHeaderProps {
  projectName: string;
  organizationName?: string;
  githubLink?: string;
}
export const ProjectHeader: React.FunctionComponent<ProjectHeaderProps> = ({
  projectName,
  organizationName,
  githubLink,
}) => {
  return (
    <Row>
      <Col xs="12" style={{ textAlign: 'center' }}>
        <h1 className="">
          {projectName}{' '}
          {githubLink ? (
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <BiLinkExternal size=".7em" className="mb-1 ms-1" />{' '}
            </a>
          ) : null}
        </h1>
      </Col>
      {organizationName ? (
        <Col xs="12" style={{ textAlign: 'center' }}>
          <h5 className="darker">{organizationName}</h5>
        </Col>
      ) : null}
    </Row>
  );
};
