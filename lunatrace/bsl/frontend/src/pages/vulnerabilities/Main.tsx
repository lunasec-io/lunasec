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
import { SeverityNamesOsv } from '@lunatrace/lunatrace-common/build/main';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Helmet } from 'react-helmet-async';
import { ArrayParam, DateParam, NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';
import { useDebounce } from 'usehooks-ts';

import api from '../../api';
import { Order_By } from '../../api/generated';

import { VulnerabilitiesControls } from './Controls';
import { VulnerabilitiesList } from './List';
import { Order, SearchControls, searchParamsConfigMap } from './types';

// const searchControlDefaults: SearchControls = {
//   ecosystem: '',
//   minimum_severity: 'Unknown',
//   search: '',
//   cwe: '',
//   from_date_string: '',
//   to_date_string: '',
// };

// const searchControlNames = Object.keys(searchControlDefaults);
//
// function initializeSearchFromUrlParams(searchParams: URLSearchParams): SearchControls {
//   const stateFromUrl = {};

// searchControlNames.forEach((controlName) => {
//   object;
// });
//
// const mode = determineQuickViewMode(searchParams.get('quick-view-mode'));
// const id = searchParams.get('quick-view-id');
//
// if (mode === 'off') {
//   return {
//     mode,
//     id: null,
//   };
// }
//
// if (!id) {
//   throw new Error('Missing quick view id');
// }
//
// return {
//   mode,
//   id,
// };

export const VulnerabilitiesMain: React.FunctionComponent = () => {
  // const [searchString, setSearchString] = useState('');
  const [vulnLimit, setVulnLimit] = useState(20);
  // const submitSearch = (search: string) => {
  //   setSearchString(search);
  // };

  // const [searchControls, setSearchControls] = useState<SearchControls>(searchControlDefaults);

  const [searchControls, setSearchControls] = useQueryParams(searchParamsConfigMap, {
    removeDefaultsFromUrl: true,
    enableBatching: false, // would be great but doesnt seem to work, oh well
    updateType: 'replace',
  });

  const postgresOrderMap: Record<Order, Record<string, unknown>> = {
    cvss: { cvss_score: Order_By.DescNullsLast },
    date: { published: Order_By.Desc },
    none: {},
  };

  // RUN SEARCH QUERY
  const { data, isFetching, refetch } = api.useSearchVulnerabilitiesQuery({
    search: searchControls.search,
    order_by: postgresOrderMap['date'],
    limit: vulnLimit,
  });

  // const [orderBy, setOrderBy] = useState<Order>('none');

  // RUN SEARCH QUERY
  // const { data, isFetching, refetch } = api.useSearchVulnerabilitiesQuery({
  //   search: searchString,
  //   order_by: postgresOrderMap[orderBy],
  //   limit: vulnLimit,
  // });

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
          searchControls={searchControls}
          setSearchControls={setSearchControls}
          isFetching={isFetching}
        />
        <VulnerabilitiesList vulnerabilities={data ? data.vulnerability : []} isLoading={isFetching} />
      </Container>
    </>
  );
};
