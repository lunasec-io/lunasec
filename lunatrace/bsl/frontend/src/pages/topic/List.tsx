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
import { Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import api from '../../api';
import { SpinIfLoading } from '../../components/SpinIfLoading';

import { TopicListDetails } from './ListDetails';

export const TopicList: React.FC = () => {
  const { data, isLoading } = api.useGetAllTopicsQuery();

  return (
    <>
      <Helmet title="Topics" />
      <Row>
        <h3>Recent Vulnerability Writeups</h3>
        <h6 className="darker">From LunaSec</h6>
      </Row>
      <hr />
      <SpinIfLoading isLoading={isLoading}>
        <Container>{data && data.topics ? <TopicListDetails topics={data.topics} /> : null}</Container>
      </SpinIfLoading>
    </>
  );
};
