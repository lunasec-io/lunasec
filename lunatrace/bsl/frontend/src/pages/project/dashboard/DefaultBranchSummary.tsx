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
import { filterFindingsNotIgnored } from '@lunatrace/lunatrace-common/build/main';
import { countCriticalVulnerabilities } from '@lunatrace/lunatrace-common/build/main/cvss';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import { LinkInNewTab } from '../../../components/utils/LinkInNewTab';
import { branchLink, branchName, commitLink } from '../../../utils/build-display-helpers';
import { prettyDate } from '../../../utils/pretty-date';
import { SourceIcon } from '../builds/SourceIcon';
import { ProjectInfo } from '../types';

interface DefaultBranchSummaryProps {
  project: ProjectInfo;
}

export const DefaultBranchSummary: React.FC<DefaultBranchSummaryProps> = ({ project }) => {
  const navigate = useNavigate();
  const defaultBranchBuilds = project.default_branch_builds;
  const defaultBranchBuild = defaultBranchBuilds ? defaultBranchBuilds[0] : null;
  const latestBuildAnyBranch = project.builds[0];
  // Prefer a build on the default branch if available, otherwise use a build from any branch just so we can show something here
  const build = defaultBranchBuild || latestBuildAnyBranch;
  if (!build) {
    return (
      <Card className="w-100">
        <Card.Header>
          <h3>Not yet scanned</h3>
        </Card.Header>
        <Card.Body>
          <p>All new projects will be scanned soon after installation, check back in a few moments.</p>
        </Card.Body>
      </Card>
    );
  }

  const uploadDate = prettyDate(new Date(build.created_at as string));
  const lastScannedDate = build.scans[0] ? prettyDate(new Date(build.scans[0].created_at as string)) : 'Never';

  const filteredFindings = filterFindingsNotIgnored(build.findings);
  const vulnerablePackageCount = countCriticalVulnerabilities(filteredFindings);

  const branch = branchName(build);
  const branchUrl = branchLink(build);
  const commitUrl = commitLink(build);

  return (
    <Card className="clickable-card w-100" onClick={(e) => navigate(`build/${build.id}`)}>
      <Card.Header>
        <Container fluid>
          <Row>
            <Col sm="6">
              <Card.Title>
                <h3>
                  <span className="lighter">Latest Results</span>
                  <ConditionallyRender if={build.git_branch}>
                    <span className="darker"> on {build.git_branch}</span>
                  </ConditionallyRender>
                </h3>
              </Card.Title>
              <Card.Subtitle className="darker"></Card.Subtitle>
            </Col>
            <Col sm={{ span: 6 }}>
              <div>
                <Card.Title className="text-sm-end">
                  <h3 style={{ display: 'inline' }}>{vulnerablePackageCount}</h3>
                  <span className="darker"> critical packages</span>
                </Card.Title>
              </div>
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Card.Body className="d-flex">
        <Container fluid>
          <Row>
            <Col xs="12" sm={{ order: 'last', span: 5, offset: 4 }}>
              <h6 className="text-sm-end">
                <SourceIcon source_type={build.source_type} className="mb-1 me-1 lighter" />{' '}
                <span className="darker"> From:</span> {uploadDate}
              </h6>
              <ConditionallyRender if={lastScannedDate !== uploadDate}>
                <h6 style={{ textAlign: 'right' }}>
                  <span className="darker"> Last scanned:</span> {lastScannedDate}
                </h6>
              </ConditionallyRender>
            </Col>
            <Col xs="12" sm="3">
              <div className="build-git-info">
                <ConditionallyRender if={branchUrl}>
                  <h6>
                    <span className="darker">Branch: </span>{' '}
                    <LinkInNewTab href={branchUrl || ''} onClick={(e) => e.stopPropagation()}>
                      {branch}
                    </LinkInNewTab>
                  </h6>
                </ConditionallyRender>
                <ConditionallyRender if={commitUrl}>
                  <h6>
                    <span className="darker">Commit: </span>{' '}
                    <a target="_blank" rel="noopener noreferrer" href={commitUrl || ''}>
                      {build.git_hash?.substring(0, 8)}...
                    </a>
                  </h6>
                </ConditionallyRender>
                <ConditionallyRender if={!commitUrl && !branchUrl}>
                  <h6 className="darker">Uploaded manually</h6>
                </ConditionallyRender>
              </div>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};
