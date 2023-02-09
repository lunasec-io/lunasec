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
import { useExplorerPlugin } from '@graphiql/plugin-explorer';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import React, { useState } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import { BsTerminal } from 'react-icons/bs';

import 'graphiql/graphiql.css';
import '@graphiql/plugin-explorer/dist/style.css';
import { useUser } from '../../hooks/useUser';

const fetcher = createGraphiQLFetcher({
  url: '/v1/graphql',
  headers: { 'x-hasura-role': 'user' }, // Doesn't change anything yet but will be useful if we use roles to fine tune what shows up here
});

const sampleQuery = `query GetCisaVulnsAboveEpss90Percent {
  vulnerability(
    where: {cisa_known_vuln: {id: {_is_null: false}}, epss_score: {_gt: 0.9}, source: {_eq: "ghsa"}}
  ) {
    epss_score
    source_id
    cve_id
    details
    severity_name
    cvss_score
  }
}`;
export function ApiExplorerMain() {
  const { user } = useUser();
  const [query, setQuery] = useState(sampleQuery);
  // this plugin gives the nice sidebar where you can click fields. Surprisingly not part of the stock graphiql
  const explorerPlugin = useExplorerPlugin({
    query,
    onEdit: setQuery,
    title: 'LunaTrace Api Explorer',
  });

  //todo: Build an API key generator into this page (port the one from CLI tokens)

  return (
    <>
      <h3> LunaTrace API Access Explorer</h3>
      <p>
        <BsTerminal size="40px" className="me-3 mb-2" /> All functions of LunaTrace that you see in this web app (and
        more) are also available as a GraphQl API at:
        <CopyBlock
          text={'https://lunatrace.lunasec.io/v1/graphql'}
          showLineNumbers={false}
          startingLineNumber={false}
          theme={dracula}
          codeBlock
        />{' '}
        <br />
        LunaTrace aims to offer industry leading, comprehensive API access. This includes access to our extensive
        vulnerability and package database. Use this API to integrate LunaTrace into your own tooling.
      </p>

      {!user ? (
        <>
          <hr />
          <h1 className="text-center">Please log in to explore our API</h1>
        </>
      ) : (
        <GraphiQL
          fetcher={fetcher}
          query={query}
          onEditQuery={setQuery}
          plugins={[explorerPlugin]}
          // visiblePlugin={explorerPlugin}
        />
      )}
    </>
  );
}
