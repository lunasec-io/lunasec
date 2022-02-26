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
import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

import api from '../../api';
import { GetSidebarInfoQuery } from '../../api/generated';
import { SpinIfLoading } from '../../components/SpinIfLoading';
// eslint-disable-next-line import/order
import useAppSelector from '../../hooks/useAppSelector';

type Organization = GetSidebarInfoQuery['organizations'][number];

const ProjectCreateForm = ({ data }: { data: GetSidebarInfoQuery | undefined }) => {
  // Mutations
  const [insertOrgAndProject, insertOrgAndProjectResult] = api.useCreateOrganizationAndProjectMutation();
  const [insertProject, insertProjectResult] = api.useInsertProjectMutation();
  // Other hooks
  const navigate = useNavigate();
  // State
  const [selectedOrgOption, setSelectedOrgOption] = useState<Option[]>([]);
  const [orgText, setOrgText] = useState<string>('');
  const [projectName, setProjectName] = useState('');
  const [validated, setValidated] = useState(false);

  const userId = useAppSelector(selectUserId);

  if (!data || !userId) {
    return null;
  }

  // computed properties
  const { organizations } = data;

  const shouldCreateNewOrg = !selectedOrgOption || (selectedOrgOption.length < 1 && orgText.length > 1);

  const mutationIsLoading = insertOrgAndProjectResult.isLoading || insertProjectResult.isLoading;

  // Methods
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const selectedOrg = selectedOrgOption[0] as Organization;
    if (!form.checkValidity()) {
      return;
    }
    setValidated(true);
    if (!shouldCreateNewOrg) {
      console.log('selected org option is ', selectedOrg);
      const insertPromise = await insertProject({
        name: projectName,
        organization_id: selectedOrg.id,
      }).unwrap();
      const projectId = insertPromise.insert_projects_one?.id;
      if (projectId) {
        navigate(`/project/${projectId}`);
      }
    } else {
      const insertPromise = await insertOrgAndProject({
        project_name: projectName,
        identity_id: userId,
        organization_name: orgText,
      }).unwrap();
      const projectId = insertPromise.insert_organizations_one?.projects[0].id;
      if (projectId) {
        navigate(`/project/${projectId}`);
      }
    }
  };
  return (
    <Row>
      <Col sm={{ offset: 1, span: 10 }}>
        <Card>
          <Card.Header>
            {' '}
            <ProjectHeader projectName="New Project" />
          </Card.Header>
          <Card.Body>
            <Form validated={validated} onSubmit={(e) => void submitForm(e)}>
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

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Typeahead
                  id="project-search-form"
                  placeholder="Search Projects"
                  aria-label="Search Projects"
                  onChange={(selected) => {
                    console.log('selected ', selected);
                    setSelectedOrgOption(selected);
                  }}
                  multiple={false}
                  labelKey="name"
                  options={organizations}
                  highlightOnlyResult={true}
                  selected={selectedOrgOption}
                  renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
                    <FloatingLabel controlId="name" label="Select or create organization">
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/*
                      @ts-ignore */}
                      <Form.Control
                        {...inputProps}
                        ref={(node: HTMLInputElement | null) => {
                          inputRef(node);
                          referenceElementRef(node);
                        }}
                        type="text"
                        required={true}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        value={inputProps.value || orgText}
                        onChange={(e) => {
                          if ('onChange' in inputProps && inputProps.onChange) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            inputProps.onChange(e);
                          }
                          setOrgText(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                  )}
                />
                <Form.Text className="text-muted">Select a prexisting organization or create a new one.</Form.Text>
              </Form.Group>
              {shouldCreateNewOrg ? (
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    checked={true}
                    disabled={true}
                    type="checkbox"
                    label={`Also create a new organization called "${orgText}"`}
                  />
                </Form.Group>
              ) : null}
              <Button variant="primary" type="submit">
                {` Create new ${shouldCreateNewOrg ? 'organization and ' : ''} project`}{' '}
                {mutationIsLoading ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                ) : null}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

import { selectUserId } from '../../store/slices/authentication';

import { ProjectHeader } from './Header';
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
