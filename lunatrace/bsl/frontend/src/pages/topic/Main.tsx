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
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import api from '../../api';
import { SpinIfLoading } from '../../components/SpinIfLoading';

import { Topic } from './Topic';

export const TopicMain: React.FC = () => {
  const { topic_id } = useParams();

  const { data, isLoading } = api.useGetTopicDetailsQuery({
    id: topic_id as string,
  });

  return (
    <SpinIfLoading isLoading={isLoading}>
      <Container>{data && data.topics_by_pk ? <Topic topic={data.topics_by_pk} /> : null}</Container>
    </SpinIfLoading>
  );
};
