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
import { Col, Container, Form, Row } from 'react-bootstrap';

export const ImportProjects: React.FC = () => {
  const orgs = [
    { name: 'factoidForrest', repos: [{ name: 'my first project' }, { name: 'my second project' }] },
    { name: 'lunasec', repos: [{ name: 'my first project' }, { name: 'lunatrace' }] },
  ];
  return (
    <Container>
      <Row>
        <Col xs="12" className="text-center">
          <h2>Import Projects from GitHub</h2>
          <p>Choose repos to add to LunaTrace</p>
        </Col>
      </Row>
      <Row>
        <Form>
          {orgs.map((org) => {
            return (
              <React.Fragment key={org.name}>
                <h3>{org.name}</h3>

                {org.repos.map((repo) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      key={repo.name}
                      label={repo.name}
                      id="disabled-custom-switch"
                    ></Form.Check>
                  );
                })}
              </React.Fragment>
            );
          })}
        </Form>
      </Row>
    </Container>
  );
};
