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
import React, { useContext, useEffect } from 'react';
import { Badge, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { BsGithub } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import api from '../../api';
import { ConditionallyRender } from '../../components/utils/ConditionallyRender';
import { GithubAppUrl } from '../../constants';
import { WizardOpenContext } from '../../contexts/WizardContext';
import useAppSelector from '../../hooks/useAppSelector';
import useSidebar from '../../hooks/useSidebar';
import { selectKratosId } from '../../store/slices/authentication';

export const AuthenticatedHome: React.FunctionComponent = (_props) => {
  const wizardOpen = useContext(WizardOpenContext);
  const { isOpen, setIsOpen } = useSidebar();

  const [createPersonalProjectMutation, createPersonalProjectMutationResult] =
    api.useInsertPersonalProjectAndOrgMutation();

  if (createPersonalProjectMutationResult.isSuccess) {
    // Make sure the sidebar opens if someone has just created a personal project. Helpful on mobile and in situations where they may have closed it.
    // if (!isOpen) {
    //   setIsOpen(true);
    // }
  }
  console.log('sidebar open is ', isOpen);
  const hasNoProjects = !wizardOpen;
  return (
    <>
      <Helmet title="home" />
      <Container>
        <Row className="text-center mb-4">
          <h1>Welcome to LunaTrace</h1>

          {wizardOpen ? (
            <p>
              {' '}
              You are almost on your way to finding vulnerabilities with LunaTrace! Follow the steps below to finish
              setting up your account.
            </p>
          ) : (
            <p>View your existing projects in the sidebar.</p>
          )}
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
                <Badge className="me-1" bg={hasNoProjects ? 'primary' : 'secondary'} pill>
                  2
                </Badge>{' '}
                Configure <span className="darker">your project.</span>
              </Card.Title>
              <Card.Subtitle className={`darker homepage-subtitle left-bar-border ${hasNoProjects ? 'active' : ''}`}>
                Click your imported project in the sidebar.
              </Card.Subtitle>
              <Card.Title>
                {' '}
                <Badge className="me-1" bg={hasNoProjects ? 'primary' : 'secondary'} pill>
                  3
                </Badge>{' '}
                PR Scanning is Active!
              </Card.Title>
              <Card.Subtitle className={`darker homepage-subtitle ${hasNoProjects ? 'active' : ''}`}>
                Set up manual scans in your project if desired.
              </Card.Subtitle>

              <Row className="justify-content-center">
                <Col md="6" className="d-grid gap-2">
                  <Button variant={hasNoProjects ? 'light' : 'primary'} size="lg" href={GithubAppUrl}>
                    <BsGithub className="mb-1 me-1" /> {hasNoProjects ? 'Add more projects' : 'Connect to GitHub'}
                  </Button>
                  <ConditionallyRender if={!hasNoProjects}>
                    {createPersonalProjectMutationResult.isLoading ? (
                      <Spinner animation="border" variant="primary" />
                    ) : (
                      <Card.Subtitle className="darker">
                        Prefer not to? If you would like to do manual scans without GitHub,{' '}
                        <span onClick={() => createPersonalProjectMutation({})} className="link-primary cursor-pointer">
                          click here to create an unlinked project
                        </span>
                        .
                      </Card.Subtitle>
                    )}
                  </ConditionallyRender>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};
