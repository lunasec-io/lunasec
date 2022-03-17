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
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import { Helmet } from 'react-helmet-async';
import { NavLink, useParams } from 'react-router-dom';

import api from '../../../api';
import { SpinIfLoading } from '../../../components/SpinIfLoading';
import { prettyDate } from '../../../utils/pretty-date';
import { capitalizeFirstLetter } from '../../../utils/string-utils';
import { VulnerablePackageList } from '../finding/VulnerablePackageList';
export const BuildDetails: React.FunctionComponent = () => {
  console.log('rendering build details');
  const { build_id } = useParams();
  const { data, error, isLoading } = api.useGetBuildDetailsQuery({ build_id });

  const renderBuildDetails = () => {
    if (!data) {
      return null;
    }

    if (data.builds.length === 0) {
      console.error(`no builds are available: ${data}`);
      return <span>404: Couldn&apos;t find a build with this ID.</span>;
    }
    const build = data.builds[0];

    if (build.scans.length === 0) {
      return (
        <span>
          Error: This build has not yet been scanned. Please wait a short time for the scan to finish and then return to
          this page.
        </span>
      );
    }
    const firstScan = build.scans[0];

    const lastScannedDate = firstScan ? prettyDate(new Date(firstScan.created_at as string)) : 'Never';
    const uploadDate = prettyDate(new Date(build.created_at as string));

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
                <span className="darker">Branch: </span> {build.git_branch}
              </h6>
              <h6>
                <span className="darker">Commit: </span> {build.git_hash?.substring(0, 8)}... ↪
              </h6>
              <h6>
                <span className="darker">{capitalizeFirstLetter(firstScan.source_type)}:</span> {firstScan.target}
              </h6>
            </div>
          </Col>
        </Row>
        <hr />
        <VulnerablePackageList findings={build.findings} />
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
