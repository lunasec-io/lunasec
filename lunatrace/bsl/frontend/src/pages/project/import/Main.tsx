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
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FiArrowRight, FiGithub } from 'react-icons/fi';

import api from '../../../api';
import { GetAvailableReposQuery } from '../../../api/generated';
import { SpinIfLoading } from '../../../components/SpinIfLoading';
import { GithubAppUrl } from '../../../constants';

//
// type RepoData = NonNullable<GetAvailableReposQuery['availableRepos']>[number]['repos'][number]
//
// interface ExtendedFields {
//   alreadyImported?:boolean;
//   selectedForImport?:boolean;
// }
//
// type ExtendedRepoData = RepoData & ExtendedFields;
//
// interface ExtendedGithubData extends GetAvailableReposQuery {
//   availableRepos?: Array<{
//     repos: Array<ExtendedRepoData>
//   }>
// }
//

export const ImportProjectsMain: React.FC = () => {
  const { data: githubData, isLoading: isLoadingGithubData } = api.useGetAvailableReposQuery();
  const { data: existingProjectData, isLoading: isLoadingProjectData } = api.useGetProjectsQuery();
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

  const organizeReposByOrg = () => {
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
  };

  console.log('filtered repos are ', organizeReposByOrg());

  // Todo: This is really only a frontend guard, someone could insert batches of up to 200 repos since the backend doesnt consider existing, at present
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
                <Col xs="12" md="6">
                  <div className="d-grid m-3">
                    {tooManyRepos ? (
                      <Button variant="danger">
                        200 repo limit exceeded. Select less repos or contact support via chat
                      </Button>
                    ) : (
                      <Button>
                        Continue <FiArrowRight size={18} className="mb-1" />
                      </Button>
                    )}
                  </div>
                </Col>
                <Col xs="12" md={{ order: 'first', span: 6 }}>
                  <div className="d-grid  m-3">
                    <Button variant="secondary" href={GithubAppUrl}>
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
