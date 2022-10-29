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
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import api from '../../../api';
import { GetProjectBuildsQuery } from '../../../api/generated';
import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import { BuildInfo } from '../types';

import { BuildList } from './BuildList';

interface BuildsProps {
  projectId: string;
  buildLimit: number;
  loadMoreBuildsCallback: () => void;
  isFetching: boolean;
}

export const Builds: React.FunctionComponent<BuildsProps> = ({
  projectId,
  buildLimit,
  loadMoreBuildsCallback,
  isFetching,
}) => {
  // lazy loading. Reloads all the old vulns when expanding the batch size but..it works fine
  useBottomScrollListener(loadMoreBuildsCallback, { offset: 200 });

  // Subscribe to builds that have been completed or are in progress
  const [getProjectBuildsTrigger, lastProjectBuildsArg] = api.endpoints.GetProjectBuilds.useLazyQuerySubscription({
    pollingInterval: 10000,
  });

  useEffect(() => {
    const runningQuery = getProjectBuildsTrigger({
      project_id: projectId,
      build_limit: buildLimit,
    });

    // After 5 minutes, stop polling for information.
    setTimeout(() => {
      runningQuery.abort();
    }, 5 * 60 * 1000);
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const projectBuildsQuery = api.endpoints.GetProjectBuilds.useQueryState(lastProjectBuildsArg || skipToken) as {
    status: string;
    currentData: GetProjectBuildsQuery;
  } | null;

  const builds: BuildInfo[] = projectBuildsQuery?.currentData?.builds || [];

  // TODO (cthompson) show an indication to the user that automatic polling has stopped and that they will need to refresh the page.
  return (
    <>
      <BuildList builds={builds} />
      <ConditionallyRender if={isFetching}>
        <Spinner animation="border" className="" />
      </ConditionallyRender>
    </>
  );
};
