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
import { filterFindingsByIgnored } from '@lunatrace/lunatrace-common';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import api from '../../../api';
import { SpinIfLoading } from '../../../components/SpinIfLoading';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useBreakpoint from '../../../hooks/useBreakpoint';
import { add } from '../../../store/slices/alerts';
import { VulnerablePackageList } from '../finding/VulnerablePackageList';

import { BuildDetailsHeader } from './BuildDetailsHeader';
import { VulnQuickView } from './VulnQuickView';

export const BuildDetails: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const listStartRef = useRef<HTMLDivElement>(null);

  const { build_id, project_id } = useParams();
  if (!build_id || !project_id) {
    dispatch(add({ message: 'Malformed URL, missing build_id or project_id parameter' }));
    return null;
  }
  const { data, isLoading } = api.useGetBuildDetailsQuery({ build_id, project_id });

  const isExtraLarge = useBreakpoint('xxl');
  // We show a temporary view of any vulnerabilities that get clicked, instead of redirecting.  This is much faster when doing an audit
  // because it prevents the loss of the app state/context and any open dropdowns and filters.
  // We prop drill these pretty deep, so consider using a context provider instead
  const [vulnQuickViewId, setVulnQuickViewId] = useState<string | null>(null);
  const quickViewOpen = !!vulnQuickViewId;
  const sideBySideView = isExtraLarge && quickViewOpen;

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

    const filteredFindings = filterFindingsByIgnored(build.findings);
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
              vulnQuickViewId={vulnQuickViewId}
              setVulnQuickViewId={setVulnQuickViewId}
            />
          </Col>

          {vulnQuickViewId ? (
            <Col xxl={quickViewOpen ? 6 : 12}>
              <VulnQuickView vulnId={vulnQuickViewId} setVulnId={setVulnQuickViewId} sideBySideView={sideBySideView} />{' '}
            </Col>
          ) : null}
        </Row>
      </>
    );
  };

  return (
    <>
      <Container fluid={sideBySideView} className="build-page">
        <SpinIfLoading isLoading={isLoading}>{renderBuildDetails()}</SpinIfLoading>
      </Container>
    </>
  );
};
