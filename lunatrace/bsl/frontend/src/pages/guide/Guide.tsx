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

import { GuideDetails } from './GuideDetails';

export const GuideMain: React.FC = () => {
  const { guide_id } = useParams();

  const { data, isLoading } = api.useGetGuideDetailsQuery({
    id: guide_id as string,
  });

  return (
    <SpinIfLoading isLoading={isLoading}>
      <Container>{data && data.guides_by_pk ? <GuideDetails guide={data.guides_by_pk} /> : null}</Container>
    </SpinIfLoading>
  );
};
