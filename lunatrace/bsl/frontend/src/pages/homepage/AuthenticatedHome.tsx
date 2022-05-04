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
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { BsGithub } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import api from '../../api';
import { ConditionallyRender } from '../../components/utils/ConditionallyRender';
import { GithubAppUrl } from '../../constants';

export const AuthenticatedHome: React.FunctionComponent = (_props) => {
  const { data } = api.useGetSidebarInfoQuery();
  const hasAnyOrgs = !!data && data.organizations.filter((p) => p.name !== 'Personal').length > 0;
  const personalProjectId = !!data && data.projects.find((p) => p.name === 'Personal Project')?.id;
  return (
    <>
      <Helmet title="home" />
      <Container>
        <Row className="text-center mb-4">
          <h1>Welcome to LunaTrace</h1>
          <ConditionallyRender if={!hasAnyOrgs}>
            {' '}
            <p>
              You are almost on your way to finding vulnerabilities with LunaTrace! Follow the steps below to finish
              setting up your account.
            </p>
          </ConditionallyRender>
        </Row>
        <Row>
          <Card className="">
            <Card.Body className="m-md-4">
              <Card.Title>
                {' '}
                <Badge className="me-1" pill>
                  1
                </Badge>{' '}
                Connect <span className="darker">to Github.</span>
              </Card.Title>
              <Card.Subtitle className="darker homepage-subtitle left-bar-border active">
                Connect LunaTrace to at least one repo you would like to scan. You can always add more later.
              </Card.Subtitle>
              <Card.Title>
                {' '}
                <Badge className="me-1" bg={hasAnyOrgs ? 'primary' : 'secondary'} pill>
                  2
                </Badge>{' '}
                Configure <span className="darker">your project.</span>
              </Card.Title>
              <Card.Subtitle className={`darker homepage-subtitle left-bar-border ${hasAnyOrgs ? 'active' : ''}`}>
                Click your imported project in the sidebar.
              </Card.Subtitle>
              <Card.Title>
                {' '}
                <Badge className="me-1" bg={hasAnyOrgs ? 'primary' : 'secondary'} pill>
                  3
                </Badge>{' '}
                PR Scanning is Active!
              </Card.Title>
              <Card.Subtitle className={`darker homepage-subtitle ${hasAnyOrgs ? 'active' : ''}`}>
                Set up manual scans in your project if desired.
              </Card.Subtitle>

              <Row className="justify-content-center">
                <Col md="6" className="d-grid gap-2">
                  <Button variant={hasAnyOrgs ? 'light' : 'primary'} size="lg" href={GithubAppUrl}>
                    <BsGithub className="mb-1 me-1" /> {hasAnyOrgs ? 'Add more projects' : 'Connect to GitHub'}
                  </Button>
                  <Card.Subtitle className="darker">
                    Prefer not to? You can still do manual scans in{' '}
                    <NavLink to={`/project/${personalProjectId}`}>your personal project</NavLink>.
                  </Card.Subtitle>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};
