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
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import { LunaTraceIntroVideo } from '../../components/LunaTraceIntroVideo';
import { ConditionallyRender } from '../../components/utils/ConditionallyRender';
import { LunaTraceIntroVideo } from '../../components/LunaTraceIntroVideo';
import { WizardOpenContext } from '../../contexts/WizardContext';

import { RecentGuidesCard } from './cards/RecentGuides';
import { RecentProjectsCard } from './cards/RecentProjects';
import { SetupWizard } from './cards/SetupWizard';

export const AuthenticatedHome: React.FunctionComponent = (_props) => {
  const wizardOpen = useContext(WizardOpenContext);
  return (
    <>
      <Helmet title="Home" />
      <Container>
        <div className="text-center mb-4">
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
          <LunaTraceIntroVideo />
        </div>
        <Row>
          {' '}
          <ConditionallyRender if={!wizardOpen}>
            <Col lg={7}>
              <RecentProjectsCard />
              <RecentGuidesCard />
            </Col>
          </ConditionallyRender>
          <Col lg={wizardOpen ? '12' : '5'}>
            <SetupWizard compact={!wizardOpen} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
