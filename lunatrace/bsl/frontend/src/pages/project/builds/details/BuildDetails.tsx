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
import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import api from '../../../../api';
import { SpinIfLoading } from '../../../../components/SpinIfLoading';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useBreakpoint from '../../../../hooks/useBreakpoint';
import { useQuickView } from '../../../../hooks/useQuickView';
import { add } from '../../../../store/slices/alerts';
import { BuildDetailsQuickView } from '../BuildDetailsQuickView';
import { BuildProgressViewer } from '../BuildProgressViewer';

import { BuildDetailsHeader } from './BuildDetailsHeader';
import { VulnerablePackageListWrapper } from './VulnerablePackageListWrapper';

export const BuildDetails: React.FunctionComponent = () => {
  console.log('rendering build details');
  const dispatch = useAppDispatch();
  const listStartRef = useRef<HTMLDivElement>(null);

  const { build_id, project_id } = useParams();
  if (!build_id || !project_id) {
    dispatch(add({ message: 'Malformed URL, missing build_id or project_id parameter' }));
    return null;
  }
  const [getBuildDetailsTrigger, getBuildDetailsResult] = api.useLazyGetBuildDetailsQuery();
  const { data, isLoading: getBuildDetailsIsLoading } = getBuildDetailsResult;

  const scanCompletedCallback = () => {
    void getBuildDetailsTrigger({ build_id, project_id });
  };

  useEffect(() => {
    void getBuildDetailsTrigger({ build_id, project_id });
  }, []);

  const [ignoreFindings, setIgnoreFindings] = useState<boolean>(true);

  const quickView = useQuickView();
  // note that we only use this breakpoint when necessary for JS stuff, otherwise we just use classname bootstrap media queries as normal
  const isExtraLarge = useBreakpoint('xxl');

  const isSideBySideView = isExtraLarge && quickView.isOpen;

  function renderContainer(children: React.ReactNode) {
    return (
      <>
        {/*  widen the whole viewport using container fluid in side by side mode*/}
        <Container fluid={isSideBySideView} className="build-page">
          <SpinIfLoading isLoading={getBuildDetailsIsLoading}>{children}</SpinIfLoading>
        </Container>
      </>
    );
  }

  if (!data) {
    return renderContainer(null);
  }

  if (!data.builds_by_pk) {
    console.error(`no builds are available: ${data}`);
    return renderContainer(<span>404: Couldn&apos;t find a build with this ID.</span>);
  }

  const build = data.builds_by_pk;

  if (build.scans.length === 0) {
    return renderContainer(
      <span>
        <BuildProgressViewer buildId={build_id} scanCompletedCallback={scanCompletedCallback} />
      </span>
    );
  }

  const filteredFindings = ignoreFindings ? filterFindingsNotIgnored(build.findings) : build.findings;

  const renderedPackageList = (
    <VulnerablePackageListWrapper
      findings={filteredFindings}
      projectId={build.project_id}
      buildId={build_id}
      shouldIgnore={ignoreFindings}
      toggleIgnoreFindings={() => setIgnoreFindings(!ignoreFindings)}
      build={build}
    />
  );

  // Responsible for showing or hiding the findings list when quick view is open.  D-none only applies on screens smaller than xxl(1400)
  // meaning that the findings list will be hidden on smaller screens when quick view is open.
  const packageListColClasses = classNames('d-xxl-block', { 'd-none': quickView.isOpen });

  return renderContainer(
    <>
      <Helmet title={`#${build.build_number} Snapshot`} />
      <BuildDetailsHeader build={build} />
      <hr />
      <div ref={listStartRef} />
      <Row>
        <Col xxl={isSideBySideView ? 6 : 12} className={packageListColClasses}>
          {renderedPackageList}
        </Col>

        {quickView.isOpen ? (
          <Col xxl={isSideBySideView ? 6 : 12}>
            <BuildDetailsQuickView sideBySideView={isSideBySideView} />{' '}
          </Col>
        ) : null}
      </Row>
    </>
  );
};
