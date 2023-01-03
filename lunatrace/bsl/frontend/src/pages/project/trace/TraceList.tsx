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
import { useNavigate } from 'react-router-dom';

import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import { InstanceInfo } from '../types';

import { TraceListItem } from './TraceListItem';

interface TraceListProps {
  instances: InstanceInfo[];
}

export const TraceList: React.FunctionComponent<TraceListProps> = ({ instances }) => {
  const navigate = useNavigate();
  const instanceCards = instances.map((instance) => {
    return (
      <Row key={instance.id}>
        <TraceListItem onClick={() => navigate(`./trace/${instance.id as string}`)} instance={instance} />
      </Row>
    );
  });

  return (
    <Container className="trace-list">
      <ConditionallyRender if={instances.length === 0}>
        <p className="text-center">
          No traces yet. <br />
        </p>
      </ConditionallyRender>

      {instanceCards}
    </Container>
  );
};
