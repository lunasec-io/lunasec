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
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiBriefcase } from 'react-icons/fi';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';

import api from '../../api';
import { SpinIfLoading } from '../../components/SpinIfLoading';
import { User } from '../../types/user';

export const NewCustomerSurvey: React.FunctionComponent<{ user: User }> = ({ user }) => {
  const [survey, setSurvey] = useState({ organization: '', role: '', hear_about_us: '' });

  const [updateSurvey, updateSurveyResult] = api.useUpdateUserSurveyMutation();

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (updateSurveyResult.isLoading) {
      return;
    }
    await updateSurvey({ id: user.id, survey });
  }
  return (
    <>
      <div className="text-center mb-4">
        <h1>Welcome to LunaTrace</h1>
        <p>Please just answer a few quick questions first.</p>
      </div>
      <Row>
        <Col sm={{ offset: 1, span: 10 }}>
          <Form onSubmit={(e) => void submitForm(e)}>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="organization">
                  <FloatingLabel
                    controlId="floatingInput"
                    label={(
                      <span>
                        <HiOutlineBuildingOffice2 size="20px" className="mb-1 me-1 lighter" /> Your Company
                      </span>
                    )}
                    className="mb-3"
                  >
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
                  <FloatingLabel
                    controlId="floatingInput"
                    label={(
                      <span>
                        <FiBriefcase size="20px" className="mb-1 me-1 lighter" /> Your Role
                      </span>
                    )}
                    className="mb-3"
                  >
                    <Form.Control
                      value={survey.role}
                      onChange={(e) => setSurvey({ ...survey, role: e.target.value })}
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
                  <FloatingLabel
                    controlId="floatingInput"
                    label={(
                      <span>
                        <AiOutlineSearch size="20px" className="mb-1 me-1 lighter" /> How you heard about us
                      </span>
                    )}
                    className="mb-3"
                  >
                    <Form.Control
                      value={survey.hear_about_us}
                      onChange={(e) => setSurvey({ ...survey, hear_about_us: e.target.value })}
                      required={true}
                      placeholder="enter project name"
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center text-center">
              <Col md={6} className="d-grid gap-2">
                <Button size="lg" variant="primary" disabled={updateSurveyResult.isLoading} type="submit">
                  <SpinIfLoading isLoading={updateSurveyResult.isLoading}>Submit</SpinIfLoading>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};
