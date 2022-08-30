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
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FiArrowRight, FiGithub } from 'react-icons/fi';

import api from '../../api';
import { SpinIfLoading } from '../../components/SpinIfLoading';

export const ImportProjects: React.FC = () => {
  const { data: githubData, isLoading: isLoadingGithubData } = api.useGetAvailableReposQuery();
  const { data: existingProjectData, isLoading: isLoadingProjectData } = api.useGetSidebarInfoQuery();
  const isLoading = isLoadingGithubData || isLoadingProjectData;

  if (githubData && existingProjectData) {
    githubData.availableRepos.forEach((org) => {
      org.repos.forEach((repo) => {
        existingProjectData.projects.some((existingProject) {
          if (existingProject.github_repository?.github_id === repo.)
        })
      });
    });
  }
  return (
    <Container>
      <Row>
        <Col xs="12" className="text-center">
          <h2>Import Projects from GitHub</h2>
          <p>Choose repos to add to LunaTrace</p>
        </Col>
      </Row>
      <SpinIfLoading isLoading={isLoading}>
        {data && data.availableRepos && (
          <>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Form>
                  {data.availableRepos.map((org, orgNumber) => {
                    return (
                      <Form.Group key={org.organizationName}>
                        {orgNumber > 0 && <hr />}
                        <Form.Label as="h2" className="darker">
                          {org.organizationName}
                        </Form.Label>
                        {org.repos.map((repo) => {
                          return (
                            <Form.Check
                              className="lighter"
                              type="checkbox"
                              key={repo.repoId}
                              label={<h4>{repo.repoName}</h4>}
                              id={repo.repoName}
                            ></Form.Check>
                          );
                        })}
                      </Form.Group>
                    );
                  })}
                </Form>
              </Col>
            </Row>
            <Row className="ms-lg-7 me-lg-7 mt-lg-4">
              <Col xs="12" md="6">
                <div className="d-grid m-3">
                  <Button>
                    Continue <FiArrowRight size={18} className="mb-1" />
                  </Button>
                </div>
              </Col>
              <Col xs="12" md={{ order: 'first', span: 6 }}>
                <div className="d-grid  m-3">
                  <Button variant="secondary">
                    <FiGithub className="mb-1 me-1" /> Manage Permissions on GitHub
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </SpinIfLoading>
    </Container>
  );
};
