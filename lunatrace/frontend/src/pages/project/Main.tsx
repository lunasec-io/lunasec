/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { SpinIfLoading } from '../../components/SpinIfLoading';
import { GetProjectQuery, useGetProjectQuery } from '../../store/api/generated';

export const ProjectMain: React.FunctionComponent = (_props) => {
  console.log('RENDERING PROJECT');
  const { project_id } = useParams();

  // RUN SEARCH QUERY
  const { data, error, isLoading } = useGetProjectQuery({
    project_id,
  });

  const renderProjectView = (data: GetProjectQuery) => {
    const p = data.projects[0];
    // <VulnerabilitiesControls
    //     submitFilter={submitFilter}
    //     submitSearch={submitSearch}
    //     submitOrder={setOrderBy}
    //     order={orderBy}
    // />
    // <VulnerabilitiesList vulnerabilities={data ? data.vulnerabilities : []} isLoading={isFetching} />
    return <span>{p.name}</span>;
  };
  return (
    <SpinIfLoading isLoading={isLoading}>
      <Helmet title="Vulnerabilities Index" />
      <Container>{data && data.projects[0] ? renderProjectView(data) : null}</Container>
    </SpinIfLoading>
  );
};
