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
import { skipToken } from '@reduxjs/toolkit/query/react';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTimeout } from 'usehooks-ts';

import api from '../../../api';
import { ProjectInfo } from '../types';

import { BuildList } from './BuildList';
import { SnapShotExplainerAccordion } from './SnapShotExplainerAccordion';

interface BuildsProps {
  project: ProjectInfo;
}

export const Builds: React.FunctionComponent<BuildsProps> = ({ project }) => {
  // lazy loading. Reloads all the old vulns when expanding the batch size but..it works fine

  const [buildLimit, setBuildLimit] = useState(10);

  useBottomScrollListener(
    () => {
      setBuildLimit(buildLimit + 50);
    },
    { offset: 200 }
  );

  const [shouldSkip, setShouldSkip] = useState(false);

  // Subscribe to builds that have been completed or are in progress
  const { data, isLoading } = api.endpoints.GetProjectBuilds.useQuery(
    {
      project_id: project.id,
      build_limit: buildLimit,
    },
    {
      pollingInterval: 10000,
      skip: shouldSkip,
    }
  );

  if (isLoading || !data || !data.builds) {
    return <Spinner animation="border" />;
  }

  const builds = data.builds;

  // TODO: This is broken for now, it never stops, no idea why this was breaking reacts hook order
  // useTimeout(() => {
  //   // After 5 minutes, stop polling for information.
  //   setShouldSkip(true);
  // }, 5 * 60 * 1000);

  // TODO (cthompson) show an indication to the user that automatic polling has stopped and that they will need to refresh the page.
  return (
    <>
      <SnapShotExplainerAccordion project={project} />
      <BuildList builds={builds} />
    </>
  );
};
