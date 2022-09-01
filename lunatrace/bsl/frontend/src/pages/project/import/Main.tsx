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
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { FiArrowRight, FiGithub } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import api from '../../../api';
import { GetAvailableReposQuery, OrgsWithReposInput } from '../../../api/generated';
import { SpinIfLoading } from '../../../components/SpinIfLoading';
import { GithubAppUrl } from '../../../constants';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { add } from '../../../store/slices/alerts';

export const ImportProjectsMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // API access
  const { data: githubData, isLoading: isLoadingGithubData } = api.useGetAvailableReposQuery();
  const { data: existingProjectData, isLoading: isLoadingProjectData } = api.useGetProjectsQuery();
  const [insertRepos, insertReposResult] = api.useInstallSelectedReposMutation();

  // Computed state
  const isLoading = isLoadingGithubData || isLoadingProjectData;

  const dataLoaded =
    !!githubData && !!githubData.availableOrgsWithRepos && !!existingProjectData && !!existingProjectData.projects;

  const alreadyImported: number[] = [];

  if (dataLoaded) {
    existingProjectData.projects.forEach((existingProject) => {
      if (existingProject.github_repository && existingProject.github_repository.github_id) {
        alreadyImported.push(existingProject.github_repository.github_id);
      }
    });
  }

  // Form handling
  const [selected, setSelected] = useState<number[]>([]);

  const handleBoxChecked = (repoId: number) => {
    // it was already selected, so deselect it
    if (selected.includes(repoId)) {
      setSelected(selected.filter((p) => p !== repoId));
      return;
    }
    // it was not yet selected, so add it
    setSelected([...selected, repoId]);
  };

  // this is used to change the shape of the data so it matches the graphql mutation
  function organizeReposByOrg(): OrgsWithReposInput[] | null {
    if (!githubData?.availableOrgsWithRepos) {
      return null;
    }

    // organizes the data by installationId (org), with only the checked repos included
    const orgsWithFilteredRepos = githubData.availableOrgsWithRepos.map((org) => {
      return {
        installationId: org.installationId,
        repos: org.repos.reduce((repos, repo) => {
          if (selected.includes(repo.repoId)) {
            repos.push(repo.repoId);
          }
          return repos;
        }, [] as number[]),
      };
    });
    //filter out empty orgs
    return orgsWithFilteredRepos.filter((org) => org.repos.length > 0);
  }

  const submit = async () => {
    const orgData = organizeReposByOrg();
    if (!orgData) {
      return;
    }
    const insertResponse = await insertRepos({
      orgs: orgData,
    }).unwrap();
    const result = insertResponse.installSelectedRepos;
    if (!result || result.success === false) {
      dispatch(add({ message: 'Failed to add projects, please try again or contact support using chat.' }));
      return;
    }
    dispatch(
      add({
        message:
          'Projects imported. View your new projects under "Your Organizations" to the left. They will be scanned shortly.',
        variant: 'success',
      })
    );
    navigate('/');
  };

  // Todo: This is really only a frontend guard, someone could insert batches of up to 200 repos since the backend doesnt consider existing repo count, at present
  const tooManyRepos = alreadyImported.length + selected.length > 200;

  return (
    <Container>
      <Row>
        <Col xs="12" className="text-center">
          <h2>Import Projects from GitHub</h2>
          <p>Choose repos to add to LunaTrace</p>
        </Col>
      </Row>
      <SpinIfLoading isLoading={isLoading}>
        {!!githubData &&
          !!githubData.availableOrgsWithRepos &&
          !!existingProjectData &&
          !!existingProjectData.projects && (
            <>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Form>
                    {githubData.availableOrgsWithRepos.map((org, orgNumber) => {
                      return (
                        <Form.Group key={org.organizationName}>
                          {orgNumber > 0 && <hr />}
                          <Form.Label as="h2" className="darker">
                            {org.organizationName}
                          </Form.Label>
                          {org.repos.map((repo) => {
                            const id = repo.repoId;
                            return (
                              <Form.Check
                                onChange={() => handleBoxChecked(id)}
                                checked={selected.includes(id) || alreadyImported.includes(id)}
                                disabled={alreadyImported.includes(id)}
                                className="lighter"
                                type="checkbox"
                                key={id}
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
                <Col xs="12" lg="6">
                  <div className="d-grid m-3">
                    {tooManyRepos ? (
                      <Button variant="danger">
                        200 repo limit exceeded. Select less repos or contact support via chat
                      </Button>
                    ) : (
                      <Button onClick={submit} style={{ marginTop: '1rem' }}>
                        Continue{' '}
                        {insertReposResult.isLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <FiArrowRight size={18} className="mb-1" />
                        )}
                      </Button>
                    )}
                  </div>
                </Col>
                <Col xs="12" lg={{ order: 'first', span: 6 }}>
                  <div className="d-grid  m-3">
                    <Card.Subtitle className="darker" style={{ marginBottom: '.2rem' }}>
                      Don&apos;t see your repo? Click here
                    </Card.Subtitle>
                    <Button variant="secondary" href={GithubAppUrl}>
                      <FiGithub className="mb-1 me-1" /> Add More Repos on GitHub
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
