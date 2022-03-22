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
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import httpProxy from 'http-proxy';

import { hasura } from '../hasura-api';

export interface GitHubApiProxyConfig {
  graphqlSchema: string;
}

export function SetupGitHubApiProxy(config: GitHubApiProxyConfig) {
  // const parsedSchema = makeExecutableSchema({
  //   typeDefs: config.graphqlSchema
  // });

  const gitHubGraphqlProxy = httpProxy.createProxyServer({
    target: {
      host: 'api.github.com',
      port: '443',
      protocol: 'https',
      path: '/graphql',
    },
    autoRewrite: true,
    protocolRewrite: 'https',
    ws: true,
  });

  gitHubGraphqlProxy.on('proxyReq', (proxyReq, req, res, options) => {
    proxyReq.setHeader('Authorization', '');
  });

  const graphqlIntrospectionHandler = graphqlHTTP({
    schema: buildSchema(config.graphqlSchema),
    graphiql: false,
  });

  return function gitHubApiProxy(req: express.Request, res: express.Response) {
    if (req.body.operationName === 'IntrospectionQuery') {
      // Provides us the ability to "filter" the schema that we let Hasura see.
      graphqlIntrospectionHandler(req, res);
      return;
    }

    const hasuraRes = await hasura.gitHubGraphqlProxy.web(req, res, {
      headers: {
        // TODO: Make this pass a "real" bearer token.
        Authorization: 'bearer foobar',
      },
    });
    return;
  };
}
