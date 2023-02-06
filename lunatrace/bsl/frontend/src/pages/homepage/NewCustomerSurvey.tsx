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
import React, { FormEvent, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';

import { User } from '../../types/user';

export const NewCustomerSurvey: React.FunctionComponent<{ user: User }> = ({ user }) => {
  const [survey, setSurvey] = useState({ organization: '', role: '', hear_about_us: '' });

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <>
      <div className="text-center mb-4">
        <h1>Welcome to LunaTrace</h1>
        <p>Answer a few quick questions first.</p>
      </div>
      <Row>
        <Col sm={{ offset: 1, span: 10 }}>
          <Form onSubmit={(e) => void submitForm(e)}>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="organization">
                  <FloatingLabel controlId="floatingInput" label="Your Company" className="mb-3">
                    <Form.Control
                      value={survey.organization}
                      onChange={(e) => setSurvey({ ...survey, organization: e.target.value })}
                      required={true}
                      placeholder="enter project name"
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="organization">
                  <FloatingLabel controlId="floatingInput" label="Your Role" className="mb-3">
                    <Form.Control
                      value={survey.organization}
                      onChange={(e) => setSurvey({ ...survey, organization: e.target.value })}
                      required={true}
                      placeholder="enter project name"
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="organization">
                  <Form.Label controlId="floatingInput" label="How did you hear about us?" className="mb-3">
                    <Form.Control
                      value={survey.organization}
                      onChange={(e) => setSurvey({ ...survey, organization: e.target.value })}
                      required={true}
                      placeholder="enter project name"
                    />
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center text-center">
              <Col md={6} className="d-grid gap-2">
                <Button size="lg" variant="primary" type="submit">
                  Try Lunatrace
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};
