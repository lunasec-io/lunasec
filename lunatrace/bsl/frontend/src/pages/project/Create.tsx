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
import { Button, Card, Col, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { BiUnlink } from 'react-icons/bi';
import { GoOrganization } from 'react-icons/go';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import api from '../../api';
import { GetSidebarInfoQuery } from '../../api/generated';
import { SpinIfLoading } from '../../components/SpinIfLoading';
import { ConditionallyRender } from '../../components/utils/ConditionallyRender';
import { GithubAppUrl } from '../../constants';
import useAppDispatch from '../../hooks/useAppDispatch';
import { add } from '../../store/slices/alerts';

import { ProjectHeader } from './Header';

const ProjectCreateForm = ({ data }: { data: GetSidebarInfoQuery | undefined }) => {
  // Params
  const dispatch = useAppDispatch();
  const { organization_id } = useParams();

  // Mutations
  const [insertProject, insertProjectResult] = api.useInsertProjectMutation();
  // Other hooks
  const navigate = useNavigate();
  // State
  const [projectName, setProjectName] = useState('');
  const [validated, setValidated] = useState(false);

  if (!data) {
    return null;
  }

  const mutationIsLoading = insertProjectResult.isLoading;

  const organization = data.organizations.find((o) => o.id === organization_id);
  if (!organization_id || !organization) {
    dispatch(add({ message: 'Cannot find organization matching org ID from url' }));
    return null;
  }

  // Methods
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      return;
    }
    setValidated(true);
    const insertPromise = await insertProject({
      name: projectName,
      organization_id: organization.id,
    }).unwrap();
    const projectId = insertPromise.insert_projects_one?.id;
    if (projectId) {
      navigate(`/project/${projectId}`);
    }
  };
  return (
    <Row>
      <Col sm={{ offset: 1, span: 10 }}>
        <Card>
          <Card.Header>
            {' '}
            <ProjectHeader projectName="New Project" organizationName={organization.name} />
          </Card.Header>
          <Card.Body>
            <div className="text-center">
              <p className="text-sm ms-md-6 me-md-6">
                <BiUnlink size="1.2rem" className="mb-1 me-1" />
                This project will not be linked to a GitHub repository. To import a project from GitHub instead,{' '}
                <a href={GithubAppUrl}>click here</a>.{' '}
              </p>
            </div>
            <Form validated={validated} onSubmit={(e) => void submitForm(e)}>
              <Row className="justify-content-center">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingInput" label="Project Name" className="mb-3">
                      <Form.Control
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required={true}
                        placeholder="enter project name"
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center text-center">
                <Col md={6} className="d-grid gap-2">
                  <Button size="lg" variant="primary" type="submit">
                    {` Create new project in ${organization.name}`}
                    <ConditionallyRender if={mutationIsLoading}>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    </ConditionallyRender>
                  </Button>
                </Col>
              </Row>
              <div className="text-center">
                {organization.name !== 'Personal' ? (
                  <p className="text-sm mb-1 mt-2">
                    <GoOrganization size="1rem" className="mb-1 me-1" />
                    Will be shared with everyone who has GitHub access to {organization.name}.
                  </p>
                ) : null}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export const ProjectCreate: React.FC = () => {
  const { data, isLoading } = api.useGetSidebarInfoQuery();

  return (
    <>
      <Helmet title={'Create Project'} />
      <SpinIfLoading isLoading={isLoading}>
        <ProjectCreateForm data={data} />
      </SpinIfLoading>
    </>
  );
};
