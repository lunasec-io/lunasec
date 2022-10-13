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
import React, { useContext } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import { UserContext } from '../../../contexts/UserContext';
import { ProjectInfo, SetActiveTab } from '../types';

import { DefaultBranchSummary } from './DefaultBranchSummary';
import { ProjectCloneForAdmin } from './ProjectCloneForAdmin';
import { ScanTypesExplanation } from './ScanTypesExplanation';

interface ProjectDashboardMainProps {
  project: ProjectInfo;
  setActiveTab: SetActiveTab;
}

export const ProjectDashboardMain: React.FunctionComponent<ProjectDashboardMainProps> = ({ project, setActiveTab }) => {
  const { isAdmin } = useContext(UserContext);

  return (
    <>
      <Row className="">
        <Col className="d-flex align-items-stretch" lg="12">
          <DefaultBranchSummary project={project} />
        </Col>
        {/*<Col className="d-flex align-items-stretch" lg="4">*/}
        {/*  <ManifestDrop project_id={project.id} />*/}
        {/*</Col>*/}
      </Row>
      {/*Github URL Github Name short github description blurb most recent several builds, master first probably*/}
      <Accordion flush={false} defaultActiveKey={project.builds.length > 0 ? '' : '0'}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {' '}
            <AiOutlineInfoCircle className="me-2" size="1rem" />{' '}
            {project.builds.length > 0
              ? 'When is a snapshot created'
              : 'How to take your first snapshot and start seeing vulnerabilities'}
          </Accordion.Header>
          <Accordion.Body>
            <ScanTypesExplanation project={project} setActiveTab={setActiveTab} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <ConditionallyRender if={isAdmin}>
        <hr />
        <ProjectCloneForAdmin project={project} />
      </ConditionallyRender>
    </>
  );
};
