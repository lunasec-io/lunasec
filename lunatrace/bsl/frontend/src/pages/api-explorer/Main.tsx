import { GraphiQLProvider, QueryEditor } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import React from 'react';

const fetcher = createGraphiQLFetcher({
  url: '/v1/graphql',
});

export const ApiExplorerMain: React.FC = () => {
  return (
    <GraphiQLProvider fetcher={fetcher}>
      <div className="graphiql-container">Hello GraphQL</div>
      <QueryEditor />
    </GraphiQLProvider>
  );
};
