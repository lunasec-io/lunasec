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
import { Col, Row } from 'react-bootstrap';

import { ProjectInfo } from './types';

export interface ProjectHeaderProps {
  project: ProjectInfo;
}
export const ProjectHeader: React.FunctionComponent<ProjectHeaderProps> = ({ project }) => {
  return (
    <Row>
      <Col xs="12" className="d-none d-sm-block" style={{ textAlign: 'center' }}>
        <h1>{project.name}</h1>
        <br />
      </Col>
    </Row>
  );
};
