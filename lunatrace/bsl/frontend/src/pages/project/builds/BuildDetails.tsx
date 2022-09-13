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
import { skipToken } from '@reduxjs/toolkit/query/react';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Card, Col, Container, Modal, ProgressBar, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import api from '../../../api';
import { Build_State_Enum, GetBuildLogsQuery } from '../../../api/generated';
import { SpinIfLoading } from '../../../components/SpinIfLoading';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useBreakpoint from '../../../hooks/useBreakpoint';
import { add } from '../../../store/slices/alerts';
import { toTitleCase } from '../../../utils/string-utils';
import { BuildLogs } from '../types';

import { BuildDetailsHeader } from './BuildDetailsHeader';
import { DependencyTreeViewer } from './DependencyTreeViewer';
import { VulnQuickView } from './VulnQuickView';

export const BuildDetails: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const listStartRef = useRef<HTMLDivElement>(null);
  const logsRunningQuery = useRef<any>(null);

  const { build_id, project_id } = useParams();
  if (!build_id || !project_id) {
    dispatch(add({ message: 'Malformed URL, missing build_id or project_id parameter' }));
    return null;
  }
  const [trigger, result] = api.useLazyGetBuildDetailsQuery();
  const { data, isLoading } = result;

  const [getBuildLogsTrigger, lastBuildLogsArg] = api.endpoints.GetBuildLogs.useLazyQuerySubscription({
    pollingInterval: 3000,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const buildLogsQuery = api.endpoints.GetBuildLogs.useQueryState(lastBuildLogsArg || skipToken) as {
    status: string;
    currentData: GetBuildLogsQuery;
  } | null;

  const buildLogs: BuildLogs = buildLogsQuery?.currentData?.build_log || [];

  useEffect(() => {
    if (!data && !isLoading) {
      void trigger({ build_id, project_id });
    }
    if (buildLogs.filter((log) => log.state === Build_State_Enum.SnapshotScanCompleted).length > 0) {
      logsRunningQuery.current.abort();
      void trigger({ build_id, project_id });
    }
  }, [data, buildLogs]);

  useEffect(() => {
    if (!data || !data.builds_by_pk || isLoading) {
      return;
    }

    if (data.builds_by_pk.scans.length === 0) {
      logsRunningQuery.current = getBuildLogsTrigger({
        build_id,
      });

      // After 5 minutes, stop polling for information.
      setTimeout(() => {
        logsRunningQuery.current.abort();
      }, 5 * 60 * 1000);
    }
  }, [data]);

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

  const reachedBuildStates: Record<Build_State_Enum, string | boolean> = {
    snapshot_queued: false,
    snapshot_started: false,
    snapshot_completed: false,
    snapshot_failed: false,
    snapshot_scan_queued: false,
    snapshot_scan_started: false,
    snapshot_scan_completed: false,
    snapshot_scan_failed: false,
  };

  buildLogs.forEach((log) => (reachedBuildStates[log.state] = log.message || true));

  const plannedReachedStates = Object.keys(reachedBuildStates).filter(
    (reachedState) => reachedState !== 'snapshot_failed' && reachedState !== 'snapshot_scan_failed'
  );
  const completedStateCount = plannedReachedStates.filter(
    (plannedReachedState) => !!reachedBuildStates[plannedReachedState as Build_State_Enum]
  ).length;
  const percentCompletedStates = completedStateCount / plannedReachedStates.length;

  const failedBuildStates = ['snapshot_failed', 'snapshot_scan_failed'];

  if (build.scans.length === 0) {
    return renderContainer(
      <span>
        <Card>
          <Modal.Header>
            <h4 className="mb-n2">Build In Progress</h4>
            {!reachedBuildStates['snapshot_scan_completed'] && <Spinner animation="border" />}
          </Modal.Header>
          <Modal.Body>
            <ProgressBar now={percentCompletedStates * 100} />
            <div className="mt-3">
              {failedBuildStates
                .filter((state) => !!reachedBuildStates[state as Build_State_Enum])
                .map((state, idx) => {
                  const message = reachedBuildStates[state as Build_State_Enum];
                  return (
                    <Alert key={idx} variant="danger">
                      {message}
                    </Alert>
                  );
                })}
              {plannedReachedStates.map((state) => {
                return (
                  <p
                    className={reachedBuildStates[state as Build_State_Enum] ? 'lighter font-weight-bold' : ''}
                    key={state}
                  >
                    {toTitleCase(state.replaceAll('_', ' '))}
                  </p>
                );
              })}
              {reachedBuildStates['snapshot_scan_completed'] && isLoading && (
                <div>
                  <p>
                    Loading results of snapshot scan... <Spinner animation="border" />
                  </p>
                </div>
              )}
            </div>
          </Modal.Body>
        </Card>
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
