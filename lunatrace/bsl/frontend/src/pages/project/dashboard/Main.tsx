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
import { useParams } from 'react-router-dom';

import { ProjectInfo } from '../types';

import { ManifestDrop } from './ManifestDrop';
import { ScanTypesExplanation } from './ScanTypesExplanation';

interface ProjectDashboardMainProps {
  project: ProjectInfo;
}

export const ProjectDashboardMain: React.FunctionComponent<ProjectDashboardMainProps> = ({ project }) => {
  const { project_id } = useParams();
  if (!project_id) {
    return null;
  }

  return (
    <>
      <ManifestDrop project_id={project_id} />
      Github URL Github Name short github description blurb most recent several builds, master first probably
      <Accordion flush={true}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="text-center secret-more-info-accordion-header">
            {' '}
            <AiOutlineInfoCircle className="me-2" size="1rem" /> How to collect Snapshots
          </Accordion.Header>
          <Accordion.Body>
            <ScanTypesExplanation />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
