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
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Box, Home, Lock, Menu, Settings } from 'react-feather';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import api from '../../api';
import { SpinIfLoading } from '../../components/SpinIfLoading';
import useBreakpoint from '../../hooks/useBreakpoint';
import { useRecentProjects } from '../../hooks/useRecentProjects';

import { ProjectHeader } from './Header';
import { Builds } from './builds';
import { ProjectDashboardMain } from './dashboard/Main';
import { SecretsMain } from './secrets/Main';
import { ProjectSettingsMain } from './settings/Main';
import { Traces } from './trace/Traces';
import { ProjectInfo, TabName } from './types';

export const ProjectMain: React.FunctionComponent = (_props) => {
  const { project_id } = useParams();

  const [buildLimit, setBuildLimit] = useState(10);

  // Load project information
  const { data, isLoading, refetch, isFetching } = api.useGetProjectQuery({
    project_id: project_id as string,
    build_limit: buildLimit,
  });

  // pass this down to the build view so we can lazy load more builds..not true pagination but probably good enough
  // will get slower as the user gets lower since it will be reloading more and more builds
  const loadMoreBuildsCallback = () => {
    if (data && data.projects_by_pk) {
      const buildCount = data.projects_by_pk.builds.length;
      if (buildCount !== data.projects_by_pk.builds_aggregate.aggregate?.count) {
        setBuildLimit(buildLimit + 50);
        refetch();
      }
    }
  };

  const isLarge = useBreakpoint('lg');

  const [_, setRecentProject] = useRecentProjects();

  // This will rerun whenever the data reloads, like on pagination and cache busts but..thats ok. Its deduped in the setRecentProject hook
  useEffect(() => {
    if (data && data.projects_by_pk) {
      setRecentProject(data.projects_by_pk);
    }
  }, [data]);

  const [activeTab, setActiveTab] = useState<TabName>('dashboard');
  const renderProjectNavAndHeader = (p: ProjectInfo) => {
    return (
      <>
        <Helmet title={p.name} />
        <ProjectHeader
          projectName={p.name}
          organizationName={p.organization?.name}
          githubLink={p.github_repository?.traits.fullTraits?.html_url}
          description={p.github_repository?.traits.fullTraits?.description}
        />
        <Navbar expand="lg" className="p-0 project-nav" collapseOnSelect={true}>
          <Navbar.Toggle className="m-2" aria-controls="project-tabs-nav">
            <Menu className="me-1 mb-1" />
            Menu
          </Navbar.Toggle>
          <Navbar.Collapse id="project-tabs-nav p-2">
            <Nav className="container-fluid fs-lg " variant={isLarge ? 'tabs' : 'pills'} activeKey={activeTab}>
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
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setActiveTab('trace');
                  }}
                  eventKey="trace"
                >
                  <Box size="1em" className="mb-2 me-1" /> Runtime Trace
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setActiveTab('secrets')} eventKey="secrets">
                  <Lock size="1em" className="mb-2 me-1" /> Secrets and Keys
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="ms-lg-auto">
                <Nav.Link onClick={() => setActiveTab('settings')} eventKey="settings">
                  <Settings size="1em" className="mb-2 me-1" /> Settings
                </Nav.Link>
              </Nav.Item>
              {/*<Nav.Item className="ms-auto">*/}
              {/*  <Nav.Link onClick={() => setActiveTab('settings')} eventKey="settings">*/}
              {/*    <Settings size="1em" className="mb-2 me-1" /> Settings and Secrets*/}
              {/*  </Nav.Link>*/}
              {/*</Nav.Item>*/}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <br />
        {renderProjectSubPage(p, buildLimit)}
      </>
    );
  };

  const renderProjectSubPage = (p: ProjectInfo, buildLimit: number) => {
    switch (activeTab) {
      case 'dashboard':
        return <ProjectDashboardMain project={p} setActiveTab={setActiveTab} />;
      case 'builds':
        return (
          <Builds
            project={p}
            buildLimit={buildLimit}
            loadMoreBuildsCallback={loadMoreBuildsCallback}
            isFetching={isFetching}
          />
        );
      case 'trace':
        return (
          <Traces
            project={p}
            buildLimit={buildLimit}
            loadMoreBuildsCallback={loadMoreBuildsCallback}
            isFetching={isFetching}
          />
        );
      case 'secrets':
        return <SecretsMain project={p} />;
      case 'settings':
        return <ProjectSettingsMain project={p} />;
      default:
        return <ProjectMain />;
    }
  };

  return (
    <SpinIfLoading isLoading={isLoading}>
      <Container className="project-page">
        {data && data.projects_by_pk ? renderProjectNavAndHeader(data.projects_by_pk) : null}
      </Container>
    </SpinIfLoading>
  );
};
