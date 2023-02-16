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
import { Container } from 'react-bootstrap';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Helmet } from 'react-helmet-async';

import api from '../../api';
import { Order_By } from '../../api/generated';

import { VulnerabilitiesControls } from './Controls';
import { VulnerabilitiesList } from './List';
import { Order } from './types';

export const VulnerabilitiesMain: React.FunctionComponent = () => {
  const [searchString, setSearchString] = useState('');
  const [vulnLimit, setVulnLimit] = useState(20);
  const submitSearch = (search: string) => {
    setSearchString(search);
  };

  const [filterString, setFilterString] = useState('');

  const submitFilter = (namespace: string) => {
    if (namespace !== filterString) {
      setFilterString(namespace);
    }
  };

  const postgresOrderMap: Record<Order, Record<string, unknown>> = {
    cvss: { cvss_score: Order_By.DescNullsLast },
    date: { published: Order_By.Desc },
    none: {},
  };

  const [orderBy, setOrderBy] = useState<Order>('none');

  // RUN SEARCH QUERY
  const { data, isFetching, refetch } = api.useSearchVulnerabilitiesQuery({
    search: searchString,
    order_by: postgresOrderMap[orderBy],
    limit: vulnLimit,
  });

  // lazy loading. Reloads all the old vulns when expanding the batch size but..it works fine
  useBottomScrollListener(
    () => {
      if (data && data.vulnerability) {
        const vulnCount = data.vulnerability.length;
        if (vulnCount === vulnLimit) {
          setVulnLimit(vulnLimit + 20);
          refetch();
        }
      }
    },
    { offset: 200 }
  );

  return (
    <>
      <Helmet title="Vulnerabilities Index" />
      <Container>
        <VulnerabilitiesControls
          isFetching={isFetching}
          submitFilter={submitFilter}
          submitSearch={submitSearch}
          submitOrder={setOrderBy}
          order={orderBy}
        />
        <VulnerabilitiesList vulnerabilities={data ? data.vulnerability : []} isLoading={isFetching} />
      </Container>
    </>
  );
};
