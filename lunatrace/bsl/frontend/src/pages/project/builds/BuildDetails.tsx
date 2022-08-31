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
import { filterFindingsNotIgnored } from '@lunatrace/lunatrace-common';
import classNames from 'classnames';
import React, { useMemo, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import api from '../../../api';
import { SpinIfLoading } from '../../../components/SpinIfLoading';
import { DependencyTree } from '../../../dependency-tree/builds-dependency-tree';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useBreakpoint from '../../../hooks/useBreakpoint';
import { add } from '../../../store/slices/alerts';

import { BuildDetailsHeader } from './BuildDetailsHeader';
import { DependencyTreeViewer } from './DependencyTreeViewer';
import { VulnQuickView } from './VulnQuickView';
import { VulnerablePackageList } from './vulnerable-packages/VulnerablePackageList';

export const BuildDetails: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const listStartRef = useRef<HTMLDivElement>(null);

  const { build_id, project_id } = useParams();
  if (!build_id || !project_id) {
    dispatch(add({ message: 'Malformed URL, missing build_id or project_id parameter' }));
    return null;
  }
  const { data, isLoading } = api.useGetBuildDetailsQuery({ build_id, project_id });

  const [ignoreFindings, setIgnoreFindings] = useState<boolean>(true);

  // We show a temporary view of any vulnerabilities that get clicked, instead of redirecting.  This is much faster when doing an audit
  // because it prevents the loss of the app state/context and any open dropdowns and filters.
  // We prop drill these pretty deep, so consider using a context provider instead
  const [vulnQuickViewId, setVulnQuickViewId] = useState<string | null>(null);

  // note that we only use this breakpoint when necessary for JS stuff, otherwise we just use classname bootstrap media queries as normal
  const isExtraLarge = useBreakpoint('xxl');

  const quickViewOpen = !!vulnQuickViewId;
  const isSideBySideView = isExtraLarge && quickViewOpen;

  function renderContainer(children: React.ReactNode) {
    return (
      <>
        {/*  widen the whole viewport using container fluid in side by side mode*/}
        <Container fluid={isSideBySideView} className="build-page">
          <SpinIfLoading isLoading={isLoading}>{children}</SpinIfLoading>
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
        Error: This build has not yet been scanned. Please wait a short time for the scan to finish and then return to
        this page.
      </span>
    );
  }

  const filteredFindings = ignoreFindings ? filterFindingsNotIgnored(build.findings) : build.findings;

  const depTree = (
    <DependencyTreeViewer
      resolvedManifests={build.resolved_manifests}
      findings={filteredFindings}
      projectId={build.project_id}
      quickViewConfig={{
        vulnQuickViewId,
        setVulnQuickViewId,
      }}
      toggleIgnoreFindings={() => setIgnoreFindings(!ignoreFindings)}
    />
  );

  // Responsible for showing or hiding the findings list when quick view is open.  D-none only applies on screens smaller than xxl(1400)
  // meaning that the findings list will be hidden on smaller screens when quick view is open.
  const packageListColClasses = classNames('d-xxl-block', { 'd-none': quickViewOpen });

  return renderContainer(
    <>
      <Helmet title={`#${build.build_number} Snapshot`} />
      <BuildDetailsHeader build={build} />
      <hr />
      <div ref={listStartRef} />
      <Row>
        <Col xxl={quickViewOpen ? 6 : 12} className={packageListColClasses}>
          {depTree}
        </Col>

        {vulnQuickViewId ? (
          <Col xxl={quickViewOpen ? 6 : 12}>
            <VulnQuickView vulnId={vulnQuickViewId} setVulnId={setVulnQuickViewId} sideBySideView={isSideBySideView} />{' '}
          </Col>
        ) : null}
      </Row>
    </>
  );
};
