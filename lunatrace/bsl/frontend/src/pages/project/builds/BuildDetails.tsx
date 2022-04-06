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
import { Col, Container, Row } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import { Helmet } from 'react-helmet-async';
import { NavLink, useParams } from 'react-router-dom';

import api from '../../../api';
import { SpinIfLoading } from '../../../components/SpinIfLoading';
import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { add } from '../../../store/slices/alerts';
import { branchLink, branchName, commitLink } from '../../../utils/build-display-helpers';
import { prettyDate } from '../../../utils/pretty-date';
import { capitalizeFirstLetter } from '../../../utils/string-utils';
import { VulnerablePackageList } from '../finding/VulnerablePackageList';
import { filterFindingsByIgnored } from '../finding/filter-findings';

import { SourceIcon } from './SourceIcon';

export const BuildDetails: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { build_id, project_id } = useParams();
  if (!build_id || !project_id) {
    dispatch(add({ message: 'Malformed URL, missing build_id or project_id parameter' }));
    return null;
  }
  const { data, isLoading } = api.useGetBuildDetailsQuery({ build_id, project_id });

  // await triggerInsertIgnored({ locations, note, project_id, vulnerability_id });

  const renderBuildDetails = () => {
    if (!data) {
      return null;
    }

    if (!data.builds_by_pk) {
      console.error(`no builds are available: ${data}`);
      return <span>404: Couldn&apos;t find a build with this ID.</span>;
    }
    const build = data.builds_by_pk;

    if (build.scans.length === 0) {
      return (
        <span>
          Error: This build has not yet been scanned. Please wait a short time for the scan to finish and then return to
          this page.
        </span>
      );
    }
    const firstScan = build.scans[0];

    const filteredFindings = filterFindingsByIgnored(build.findings);

    const lastScannedDate = firstScan ? prettyDate(new Date(firstScan.created_at as string)) : 'Never';
    const uploadDate = prettyDate(new Date(build.created_at as string));

    // const githubUrl = gitUrlToLink(build);

    const branch = branchName(build);
    const branchUrl = branchLink(build);
    const commitUrl = commitLink(build);

    return (
      <>
        <Helmet title={`#${build.build_number} Build`} />
        <Row>
          <Col xs="3">
            <NavLink to="..">
              <ArrowLeft />
              All Builds
            </NavLink>
          </Col>
          <Col xs="6" style={{ textAlign: 'center' }}>
            <h1>Build # {build.build_number}</h1>
            <span>{build.project?.name}</span>
            <h5>{uploadDate}</h5>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm={{ order: 'last', span: 5, offset: 4 }}>
            <h6 style={{ textAlign: 'right' }}>
              <span className="darker"> Last scanned:</span> {lastScannedDate}
            </h6>
            <h6 style={{ textAlign: 'right' }}>
              <span className="darker">
                Scanned {build.scans_aggregate.aggregate?.count} time
                {build.scans_aggregate.aggregate?.count !== 1 ? 's' : ''}
              </span>
            </h6>
          </Col>
          <Col xs="12" sm="3">
            <div className="build-git-info">
              <h6>
                <span className="darker">Source: </span>
                <SourceIcon source_type={build.source_type} className="mb-1" />{' '}
                <span className="text-capitalize">{build.source_type}</span>{' '}
              </h6>
              <ConditionallyRender if={branchUrl}>
                <h6>
                  <span className="darker">Branch: </span>{' '}
                  <a target="_blank" rel="noopener noreferrer" href={branchUrl || ''}>
                    {branch}
                  </a>
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
              <h6>
                <span className="darker">{capitalizeFirstLetter(firstScan.source_type)}:</span> {firstScan.target}
              </h6>
            </div>
          </Col>
        </Row>
        <hr />
        <VulnerablePackageList project_id={build.project_id} findings={filteredFindings} />
      </>
    );
  };

  return (
    <>
      <Container className="build-page">
        <SpinIfLoading isLoading={isLoading}>{renderBuildDetails()}</SpinIfLoading>
      </Container>
    </>
  );
};
