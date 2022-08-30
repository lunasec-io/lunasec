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
import React, { useRef, useState } from 'react';
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

  // note that we only use this breakpoint when necessary for JS stuff, otherwise we just use classname bootstrap media queries as normal
  const isExtraLarge = useBreakpoint('xxl');

  // We show a temporary view of any vulnerabilities that get clicked, instead of redirecting.  This is much faster when doing an audit
  // because it prevents the loss of the app state/context and any open dropdowns and filters.
  // We prop drill these pretty deep, so consider using a context provider instead
  const [vulnQuickViewId, setVulnQuickViewId] = useState<string | null>(null);
  const quickViewOpen = !!vulnQuickViewId;
  const isSideBySideView = isExtraLarge && quickViewOpen;

  const [ignoreFindings, setIgnoreFindings] = useState<boolean>(true);

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

    const filteredFindings = ignoreFindings ? filterFindingsNotIgnored(build.findings) : build.findings;

    // todo this is a dumb hack that will only build the tree for hte first manifest we scanned.
    const depTree = build.resolved_manifests[0]?.child_edges_recursive
      ? new DependencyTree(build.resolved_manifests[0].child_edges_recursive)
      : null;

    // Responsible for showing or hiding the findings list when quick view is open.  D-none only applies on screens smaller than xxl(1400)
    // meaning that the findings list will be hidden on smaller screens when quick view is open.
    const packageListColClasses = classNames('d-xxl-block', { 'd-none': quickViewOpen });

    return (
      <>
        <Helmet title={`#${build.build_number} Snapshot`} />
        <BuildDetailsHeader build={build} />
        <hr />
        <div ref={listStartRef} />
        <Row>
          <Col xxl={quickViewOpen ? 6 : 12} className={packageListColClasses}>
            <VulnerablePackageList
              project_id={build.project_id}
              findings={filteredFindings}
              depTree={depTree}
              quickView={{ vulnQuickViewId, setVulnQuickViewId }}
              setIgnoreFindings={setIgnoreFindings}
            />
          </Col>

          {vulnQuickViewId ? (
            <Col xxl={quickViewOpen ? 6 : 12}>
              <VulnQuickView
                vulnId={vulnQuickViewId}
                setVulnId={setVulnQuickViewId}
                sideBySideView={isSideBySideView}
              />{' '}
            </Col>
          ) : null}
        </Row>
      </>
    );
  };

  return (
    <>
      {/*  widen the whole viewport using container fluid in side by side mode*/}
      <Container fluid={isSideBySideView} className="build-page">
        <SpinIfLoading isLoading={isLoading}>{renderBuildDetails()}</SpinIfLoading>
      </Container>
    </>
  );
};
