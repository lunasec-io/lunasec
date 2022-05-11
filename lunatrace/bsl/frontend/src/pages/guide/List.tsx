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

import { GuideListDetails } from './ListDetails';

export const GuideList: React.FC = () => {
  const { data, isLoading } = api.useGetAllGuidesQuery();

  return (
    <>
      <Helmet title="Guides" />
      <Row>
        <h3>Recent Vulnerability Writeups</h3>
        <h6 className="darker">From LunaSec</h6>
      </Row>
      <hr />
      <SpinIfLoading isLoading={isLoading}>
        <Container>{data && data.guides ? <GuideListDetails guides={data.guides} /> : null}</Container>
      </SpinIfLoading>
    </>
  );
};
