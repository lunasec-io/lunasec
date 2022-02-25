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
import { Container, Nav } from 'react-bootstrap';
import { Box, Home, Settings } from 'react-feather';
import { Helmet } from 'react-helmet-async';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import api from '../../api';
import { SpinIfLoading } from '../../components/SpinIfLoading';

import { ProjectHeader } from './Header';
import { Builds } from './builds';
import { ProjectDashboardMain } from './dashboard/Main';
import { ProjectInfo } from './types';

export const ProjectMain: React.FunctionComponent = (_props) => {
  const { project_id } = useParams();
  const navigate = useNavigate();

  // RUN SEARCH QUERY
  const { data, error, isLoading } = api.useGetProjectQuery({
    project_id,
  });

  console.log('fetched data from hasura ', data);

  const [activeTab, setActiveTab] = useState<'builds' | 'settings' | 'dashboard'>('dashboard');
  const renderProjectNav = (p: ProjectInfo) => {
    return (
      <>
        <Helmet title={p.name} />
        <ProjectHeader projectName={p.name} />
        <Nav className="container-fluid fs-lg" variant="tabs" activeKey={activeTab}>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setActiveTab('dashboard');
              }}
              eventKey="dashboard"
            >
              <Home size="17" /> Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setActiveTab('builds');
              }}
              eventKey="builds"
            >
              <Box size="17" /> Builds
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="ms-auto">
            <Nav.Link onClick={() => setActiveTab('settings')} eventKey="settings">
              <Settings size="17" /> Settings
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <br />
        {renderProjectSubPage(p)}
      </>
    );
  };

  const renderProjectSubPage = (p: ProjectInfo) => {
    switch (activeTab) {
      case 'dashboard':
        return <ProjectDashboardMain project={p} />;
      case 'builds':
        return <Builds />;
      case 'settings':
        return <span>settings placeholder</span>;
      default:
        return <ProjectMain />;
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
