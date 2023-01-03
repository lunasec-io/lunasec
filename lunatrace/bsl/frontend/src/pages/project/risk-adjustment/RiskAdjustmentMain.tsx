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
import { Col, Container, Row } from 'react-bootstrap';
import { Info } from 'react-feather';

import { ProjectInfo } from '../types';

import { FolderList } from './FolderList';
import { NewFolderForm } from './NewFolderForm';

interface FiltersProps {
  project: ProjectInfo;
}

export const RiskAdjustmentMain: React.FC<FiltersProps> = ({ project }) => {
  console.log('rendering risk adjustment main with project ', project);
  return (
    <Container>
      <Row>
        <Col md="auto">
          <h2>Risk Adjustment</h2>
        </Col>
        <Col md className="mt-md-1">
          <p>
            <Info size="1.2em" className="mb-1 me-2" /> LunaTrace uses these simple settings to adjust vulnerability
            scores and automatically ignore vulnerabilities in some cases. Configuring these settings properly will
            de-prioritize vulnerabilities that may be irrelevant. If unsure whether a setting applies, leave it unset.
            NOTE: The effects of these controls are currently in development. Controls selected now will take effect in
            early January, 2023.
          </p>
        </Col>
      </Row>
      <hr />
      <FolderList project={project} />
      <NewFolderForm project={project} />
    </Container>
  );
};
