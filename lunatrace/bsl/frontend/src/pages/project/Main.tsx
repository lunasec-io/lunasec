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
import { useParams } from 'react-router-dom';

import api from '../../api';
import { SpinIfLoading } from '../../components/SpinIfLoading';

import { ProjectHeader } from './Header';
import { Builds } from './builds';
import { ProjectDashboardMain } from './dashboard/Main';
import { SecretsMain } from './secrets/Main';
import { ProjectSettingsMain } from './settings/Main';
import { ProjectInfo, TabName } from './types';

export const ProjectMain: React.FunctionComponent = (_props) => {
  const { project_id } = useParams();

  // RUN SEARCH QUERY
  const { data, isLoading } = api.useGetProjectQuery({
    project_id: project_id as string,
  });

  const [activeTab, setActiveTab] = useState<TabName>('dashboard');
  const renderProjectNav = (p: ProjectInfo) => {
    return (
      <>
        <Helmet title={p.name} />
        <ProjectHeader
          projectName={p.name}
          organizationName={p.organization?.name}
          githubLink={p.github_repository?.traits?.html_url}
        />
        <Nav className="container-fluid fs-lg" variant="tabs" activeKey={activeTab}>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setActiveTab('dashboard');
              }}
              eventKey="dashboard"
            >
              <Home size="1em" className="mb-2 me-1" /> Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setActiveTab('builds');
              }}
              eventKey="builds"
            >
              <Box size="1em" className="mb-2 me-1" /> Snapshots
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="ms-auto">
            <Nav.Link onClick={() => setActiveTab('secrets')} eventKey="secrets">
              <Settings size="1em" className="mb-2 me-1" /> Secrets and Keys
            </Nav.Link>
          </Nav.Item>
          {/*<Nav.Item className="ms-auto">*/}
          {/*  <Nav.Link onClick={() => setActiveTab('settings')} eventKey="settings">*/}
          {/*    <Settings size="1em" className="mb-2 me-1" /> Settings and Secrets*/}
          {/*  </Nav.Link>*/}
          {/*</Nav.Item>*/}
        </Nav>
        <br />
        {renderProjectSubPage(p)}
      </>
    );
  };

  const renderProjectSubPage = (p: ProjectInfo) => {
    switch (activeTab) {
      case 'dashboard':
        return <ProjectDashboardMain project={p} setActiveTab={setActiveTab} />;
      case 'builds':
        return <Builds project={p} />;
      case 'secrets':
        return <SecretsMain project={p} />;
      //{/*case 'settings':*/}
      //{/*  return <ProjectSettingsMain project={p} />;*/}
      default:
        return <ProjectMain />;
    }
  };

  return (
    <SpinIfLoading isLoading={isLoading}>
      <Container className="project-page">
        {data && data.projects_by_pk ? renderProjectNav(data.projects_by_pk) : null}
      </Container>
    </SpinIfLoading>
  );
};
