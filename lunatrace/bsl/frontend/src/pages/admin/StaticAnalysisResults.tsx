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
import { Button, Card, Col, Form, Pagination, Row } from 'react-bootstrap';
import { CopyBlock, tomorrowNight } from 'react-code-blocks';

import { Analysis_Manifest_Dependency_Edge_Result_Bool_Exp, api } from '../../api/generated';
import { formatPackageManagerUrlForPackage } from '../../utils/advisory';
import { inputChangeHandler } from '../../utils/input-helpers';

interface PaginateProps {
  setPage: (page: number) => void;
  page: number;
  totalPages: number;
}

const Paginate: React.FC<PaginateProps> = ({ page, setPage, totalPages }) => {
  return (
    <Pagination>
      <Pagination.First onClick={() => setPage(0)} />
      <Pagination.Prev
        onClick={() => {
          page > 0 && setPage(page - 1);
        }}
      />
      <Pagination.Item active>{page + 1}</Pagination.Item>
      <Pagination.Next
        onClick={() => {
          page < totalPages && setPage(page + 1);
        }}
      />
      <Pagination.Last onClick={() => setPage(totalPages)} />
    </Pagination>
  );
};

function getSearch(search: string): Analysis_Manifest_Dependency_Edge_Result_Bool_Exp {
  if (search === '') {
    return {};
  }
  return {
    _or: [
      {
        manifest_dependency_edge: {
          parent: {
            release: {
              package: {
                name: {
                  _eq: search,
                },
              },
            },
          },
        },
      },
      {
        manifest_dependency_edge: {
          child: {
            release: {
              package: {
                name: {
                  _eq: search,
                },
              },
            },
          },
        },
      },
    ],
  };
}

export const AdminDashboardStaticAnalysis = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const limit = 20;
  const offset = page * limit;

  const { data, error, isLoading } = api.endpoints.GetAnalysisManifestDependencyEdgeResultsOverview.useQuery({
    offset,
    limit,
    where: getSearch(search),
  });

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return (
      <p>
        <>Error loading data: {JSON.stringify(error)}</>
      </p>
    );
  }

  if (
    !data ||
    !data.analysis_manifest_dependency_edge_result_aggregate ||
    !data.analysis_manifest_dependency_edge_result_aggregate.aggregate
  ) {
    return <p>No data available</p>;
  }

  const totalResults = data.analysis_manifest_dependency_edge_result_aggregate.aggregate.count;
  const totalPages = totalResults / limit - 1;

  return (
    <>
      <Row className="mb-3">
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Filter results..." onChange={inputChangeHandler(setSearch)} />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <div>
          <Paginate setPage={setPage} page={page} totalPages={totalPages} />
        </div>
      </Row>
      <Row>
        {data.analysis_manifest_dependency_edge_result.map((r) => {
          const parentPackage = r.manifest_dependency_edge.parent.release.package.name;
          const childPackage = r.manifest_dependency_edge.child.release.package.name;
          const parentPackageVersion = r.manifest_dependency_edge.parent.release.version;
          const childPackageVersion = r.manifest_dependency_edge.child.release.version;
          const parentPackageUrl = formatPackageManagerUrlForPackage('npm', parentPackage);
          const childPackageUrl = formatPackageManagerUrlForPackage('npm', childPackage);

          // TODO (cthompson) as there are more analyses, we will need to change this command to support those
          const analysisCmd = `mkdir -p /tmp/lunasec-package-test && cd /tmp/lunasec-package-test && touch .semgrepignore && echo '{ "name": "package-test", "dependencies": {"${parentPackage}": "${parentPackageVersion}"} }' > package.json && npm i && analysiscli code-calls-dependency --debug --dependency ${childPackage} .`;

          return (
            <Col key={r.id} md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>{r.vulnerability.source_id}</Card.Title>
                  <p>{r.vulnerability.details}</p>
                  <p>
                    <a href={parentPackageUrl || '#'}>{`${parentPackage}@${parentPackageVersion}`}</a>
                    {'->'}
                    <a href={childPackageUrl || '#'}>{`${childPackage}@${childPackageVersion}`}</a>
                  </p>
                  <CopyBlock
                    text={analysisCmd}
                    language="bash"
                    showLineNumbers={false}
                    startingLineNumber={false}
                    theme={tomorrowNight}
                    codeBlock
                  />
                  <p>{r.finding_type}</p>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
