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
import { Col, Container, Spinner } from 'react-bootstrap';

import { GetBuildDetailsQuery, useGetBuildDetailsQuery } from '../../store/api/generated';

export interface BuildDetailsProps {
  buildId: string;
}

export const BuildDetails: React.FunctionComponent<BuildDetailsProps> = ({ buildId }) => {
  const { data, error, isLoading } = useGetBuildDetailsQuery({ build_id: buildId });
  return (
    <Container className="build-page">
      <Col xs="12" className="d-none d-sm-block" style={{ textAlign: 'center' }}>
        <h1>{project.name}</h1>
        <br />
      </Col>
    </Container>
  );
};
