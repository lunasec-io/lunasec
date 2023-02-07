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
import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import api from '../../../api';
import { useUser } from '../../../hooks/useUser';

import { VulnerabilityDetailBody } from './DetailBody';

export const VulnerabilityDetailMain: React.FC = () => {
  const { vulnerability_id } = useParams();
  const { user } = useUser();

  if (!vulnerability_id) {
    return <p>Missing vulnerability ID in url.</p>;
  }
  const { data } = api.useGetVulnerabilityDetailsQuery({ vulnerability_id });

  if (!data) {
    return <Spinner animation="border" />;
  }
  const vuln = data.vulnerability_by_pk;
  if (!vuln) {
    return <p>Vulnerability with that ID not found.</p>;
  }

  return (
    <>
      <Helmet title={vuln.source_id} />
      <VulnerabilityDetailBody vuln={vuln} />
    </>
  );
};
