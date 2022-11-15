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
import { Accordion } from 'react-bootstrap';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { ScanTypesExplanation } from '../dashboard/ScanTypesExplanation';
import { ProjectInfo } from '../types';

export const SnapShotExplainerAccordion: React.FC<{ project: ProjectInfo }> = ({ project }) => {
  return (
    <Accordion flush={false} defaultActiveKey={project.builds.length > 0 ? '' : '0'} className="mb-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {' '}
          <AiOutlineInfoCircle className="me-2" size="1rem" />{' '}
          {project.builds.length > 0
            ? 'How snapshots are created'
            : 'How to take your first snapshot and start seeing vulnerabilities'}
        </Accordion.Header>
        <Accordion.Body>
          <ScanTypesExplanation project={project} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
