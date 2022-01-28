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
import { Helmet } from 'react-helmet-async';

import { Order_By, useSearchVulnerabilitiesQuery } from '../../store/api/generated';

import { VulnerabilitiesControls } from './Controls';
import { VulnerabilitiesList } from './List';
import { Order } from './types';

export const VulnerabilitiesMain: React.FunctionComponent = () => {
  const [searchString, setSearchString] = useState('');

  const submitSearch = (search: string) => {
    setSearchString(search);
  };

  const [filterString, setFilterString] = useState('');

  const submitFilter = (namespace: string) => {
    if (namespace !== filterString) {
      setFilterString(namespace);
    }
  };

  const postgresSearch = searchString ? `%${searchString}%` : '%%'; // Bit of a hack, it would be a faster query to pull out this where clause
  const postgresFilter = filterString ? { _ilike: `%${filterString}%` } : {};
  const postgresOrderMap: Record<Order, Record<string, unknown>> = {
    severity: { severity: Order_By.Asc },
    cvss: { cvss_score: Order_By.DescNullsLast },
    date: { created_at: Order_By.Desc },
    none: {},
  };

  const [orderBy, setOrderBy] = useState<Order>('none');

  // RUN SEARCH QUERY
  const { data, error, isFetching } = useSearchVulnerabilitiesQuery({
    search: postgresSearch,
    namespace: postgresFilter,
    order_by: postgresOrderMap[orderBy],
  });

  return (
    <>
      <Helmet title="Vulnerabilities Index" />
      <Container>
        <VulnerabilitiesControls
          submitFilter={submitFilter}
          submitSearch={submitSearch}
          submitOrder={setOrderBy}
          order={orderBy}
        />
        <VulnerabilitiesList vulnerabilities={data ? data.vulnerabilities : []} isLoading={isFetching} />
      </Container>
    </>
  );
};
