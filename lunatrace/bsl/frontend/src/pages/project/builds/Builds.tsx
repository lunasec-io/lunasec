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
import { useParams } from 'react-router-dom';

import api from '../../../api';

import { BuildList } from './BuildList';

export const Builds: React.FunctionComponent = () => {
  const { project_id } = useParams();

  // RUN SEARCH QUERY
  const { data } = api.useGetProjectQuery({
    project_id,
  });

  return data ? <BuildList builds={data.projects[0].builds} /> : null;
};
