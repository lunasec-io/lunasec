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
import React, { useEffect, useState } from 'react';
import { Alert, Card, Modal, ProgressBar, Spinner } from 'react-bootstrap';

import api from '../../../api';
import { Build_State_Enum } from '../../../api/generated';
import { toTitleCase } from '../../../utils/string-utils';
import { BuildLogs } from '../types';

interface BuildProgressViewerProps {
  buildId: string;
  scanCompletedCallback: () => void;
}

export const BuildProgressViewer: React.FC<BuildProgressViewerProps> = (props) => {
  const { buildId, scanCompletedCallback } = props;

  const [pollingInterval, setPollingInterval] = useState<number>(3000);

  const [getBuildLogsTrigger, getBuildLogsResult] = api.endpoints.GetBuildLogs.useLazyQuery({
    pollingInterval,
  });
  const { data: buildLogsData } = getBuildLogsResult;

  const buildLogs: BuildLogs = buildLogsData?.build_log || [];

  useEffect(() => {
    const scanCompleted = buildLogs.filter((log) => log.state === Build_State_Enum.SnapshotScanCompleted).length > 0;
    if (scanCompleted) {
      setPollingInterval(0);
      scanCompletedCallback();
    }
  }, [buildLogs]);

  useEffect(() => {
    void getBuildLogsTrigger({
      build_id: buildId,
    });

    // After 5 minutes, stop polling for information.
    setTimeout(() => {
      setPollingInterval(0);
    }, 5 * 60 * 1000);
  }, []);

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

  return (
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
          {reachedBuildStates['snapshot_scan_completed'] && (
            <div>
              <p>
                Loading results of snapshot scan... <Spinner animation="border" />
              </p>
            </div>
          )}
        </div>
      </Modal.Body>
    </Card>
  );
};
