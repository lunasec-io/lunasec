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
import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import { NavLink } from 'react-router-dom';

import api from '../../../../api';
import { ConditionallyRender } from '../../../../components/utils/ConditionallyRender';
import { branchLink, branchName, commitLink } from '../../../../utils/build-display-helpers';
import { prettyDate } from '../../../../utils/pretty-date';
import { SourceIcon } from '../SourceIcon';
import { BuildDetailInfo } from '../types';

export const BuildDetailsHeader: React.FC<{ build: BuildDetailInfo }> = ({ build }) => {
  const [getSbomUrl, sbomUrlResult, lastPromiseInfo] = api.useLazyGetSbomUrlQuery();

  const firstScan = build.scans[0];

  const lastScannedDate = firstScan ? prettyDate(new Date(firstScan.created_at as string)) : 'Never';
  const uploadDate = prettyDate(new Date(build.created_at as string));

  const showPrettyTarget = () => {
    if (build.source_type === 'pr' || build.source_type === 'default_branch') {
      return 'Repo Root';
    }
    return firstScan.target;
  };
  // const githubUrl = gitUrlToLink(build);

  const branch = branchName(build);
  const branchUrl = branchLink(build);
  const commitUrl = commitLink(build);

  const sourceTypePretty = build.source_type === 'default_branch' ? 'Commit to Default Branch' : build.source_type;
  return (
    <Container>
      <Row>
        <Col xs="3">
          <NavLink to="..">
            <ArrowLeft />
            All Snapshots
          </NavLink>
        </Col>
        <Col xs="6" style={{ textAlign: 'center' }}>
          <h4>{build.project?.name}</h4>

          <h1>Snapshot #{build.build_number}</h1>
          <h5>{uploadDate}</h5>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm={{ order: 'last', span: 6 }} className="text-sm-end">
          <h6>
            <span className="darker"> Last scanned:</span> {lastScannedDate}
          </h6>
          <h6>
            <span className="darker">
              Scanned {build.scans_aggregate.aggregate?.count} time
              {build.scans_aggregate.aggregate?.count !== 1 ? 's' : ''}
            </span>
          </h6>
          <h6>
            <span className="darker">
              <a
                href={'#'}
                onClick={async (e) => {
                  const url = (await getSbomUrl({ build_id: build.id }))?.data?.builds_by_pk?.s3_url_signed;
                  if (url) {
                    window.location.href = url;
                  }
                }}
              >
                Download SBOM
              </a>
            </span>
          </h6>
        </Col>
        <Col xs="12" sm="6">
          <div className="build-git-info">
            <h6>
              <span className="darker">Trigger: </span>
              <SourceIcon source_type={build.source_type} className="mb-1" />{' '}
              <span className="text-capitalize">{sourceTypePretty}</span>{' '}
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
              <span className="darker text-capitalize">{firstScan.source_type}:</span> {showPrettyTarget()}
            </h6>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
