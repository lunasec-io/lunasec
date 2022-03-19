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
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export const AuthenticatedHome: React.FunctionComponent = (_props) => {
  return (
    <>
      <Helmet title="home" />
      <Container>
        <Row>
          <h1>Get started using LunaTrace!</h1>
          <p>
            LunaTrace gives you the option of either installing a Github App to automatically scan your pull requests or
            manually by using a CLI in your build pipeline.
          </p>
        </Row>
        <Row>
          <Col md={{ offset: 2, span: 4 }}>
            <Card className="mx-auto" style={{ minHeight: '18rem', width: '18rem' }}>
              <Card.Body>
                <Card.Title>Github App</Card.Title>
                <Card.Text>
                  Install the LunaTrace Github App to your repositories and/or organizations. The Github App will
                  automatically scan pull requests and leave comments when vulnerabilities have been discovered.
                </Card.Text>
                <Card.Link href="https://github.com/apps/dev-lunatrace-by-lunasec/installations/new">
                  Install LunaTrace
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span: 4 }}>
            <Card className="mx-auto" style={{ minHeight: '18rem', width: '18rem' }}>
              <Card.Body>
                <Card.Title>LunaTrace CLI</Card.Title>
                <Card.Text>
                  Manually create and scan SBOMs for your projects. The CLI can be used in any environment and will
                  report its findings to your project&apos;s dashboard.
                </Card.Text>
                <Card.Link href="#">Setup</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
