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
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProjectQuery } from '../../../store/api/generated';

import { BuildList } from './BuildList';

export const Builds: React.FunctionComponent = () => {
  // const [buildDetailId, setBuildDetailId] = useState<string | null>(null);
  // if (!buildDetailId) {
  console.log('rendering builds');
  const { project_id } = useParams();
  console.log('attempting to load project id ', project_id);

  // RUN SEARCH QUERY
  const { data, error, isLoading } = useGetProjectQuery({
    project_id,
  });

  return data ? <BuildList builds={data.projects[0].builds} /> : null;
  // }
  // return <BuildDetails buildId={buildDetailId} />;
};
