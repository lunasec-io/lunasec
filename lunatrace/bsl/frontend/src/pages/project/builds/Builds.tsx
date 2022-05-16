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
import { Spinner } from 'react-bootstrap';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import { ProjectInfo } from '../types';

import { BuildList } from './BuildList';

interface BuildsProps {
  project: ProjectInfo;
  loadMoreBuildsCallback: () => void;
  isFetching: boolean;
}

export const Builds: React.FunctionComponent<BuildsProps> = ({ project, loadMoreBuildsCallback, isFetching }) => {
  // lazy loading. Reloads all the old vulns when expanding the batch size but..it works fine
  useBottomScrollListener(loadMoreBuildsCallback, { offset: 200 });

  return project ? (
    <>
      <BuildList project={project} />
      <ConditionallyRender if={isFetching}>
        <Spinner animation="border" className="" />
      </ConditionallyRender>
    </>
  ) : null;
};
