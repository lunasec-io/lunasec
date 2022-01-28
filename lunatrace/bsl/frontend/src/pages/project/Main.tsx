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
import React, { useState } from 'react';
import { Container, Nav, Row } from 'react-bootstrap';
import { Box, Settings } from 'react-feather';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { SpinIfLoading } from '../../components/SpinIfLoading';
import { useGetProjectQuery } from '../../store/api/generated';

import { BuildList } from './BuildList';
import { ProjectHeader } from './Header';
import { ProjectInfo } from './types';

export const ProjectMain: React.FunctionComponent = (_props) => {
  console.log('RENDERING PROJECT');
  const { project_id } = useParams();

  // RUN SEARCH QUERY
  const { data, error, isLoading } = useGetProjectQuery({
    project_id,
  });

  console.log('fetched data from hasura ', data);

  const [activeTab, setActiveTab] = useState<'builds' | 'settings'>('builds');
  const renderProjectNav = (p: ProjectInfo) => {
    return (
      <>
        <Helmet title={p.name} />
        <ProjectHeader project={p} />
        <Nav className="container-fluid fs-lg" variant="tabs" activeKey={activeTab}>
          <Nav.Item>
            <Nav.Link onClick={() => setActiveTab('builds')} eventKey="builds">
              Builds <Box size="17" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="ms-auto">
            <Nav.Link onClick={() => setActiveTab('settings')} eventKey="settings">
              Settings <Settings size="17" />
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {renderProjectSubPage(p)}
      </>
    );
  };

  const renderProjectSubPage = (p: ProjectInfo) => {
    if (activeTab === 'builds') {
      return <BuildList builds={p.builds} />;
    }
    if (activeTab === 'settings') {
      return null;
    }
  };

  return (
    <SpinIfLoading isLoading={isLoading}>
      <Container className="project-page">
        {data && data.projects[0] ? renderProjectNav(data.projects[0]) : null}
      </Container>
    </SpinIfLoading>
  );
};
