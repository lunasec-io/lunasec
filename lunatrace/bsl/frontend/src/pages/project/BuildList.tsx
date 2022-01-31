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

import { BuildListItem } from './BuildListItem';
import { BuildInfo } from './types';
interface BuildListProps {
  builds: BuildInfo[];
  setBuildDetailId: (id: string | null) => void;
}

export const BuildList: React.FunctionComponent<BuildListProps> = ({ builds, setBuildDetailId }) => {
  const buildCards = builds.map((build) => {
    return (
      <Row key={build.id}>
        <BuildListItem onClick={() => setBuildDetailId(build.id as string)} build={build} />
      </Row>
    );
  });

  return (
    <Container className="vulnerability-list">
      {/*<br />*/}
      {/*<Row>*/}
      {/*  <h2>Builds</h2>*/}
      {/*</Row>*/}
      <br />

      {buildCards}
    </Container>
  );
};
