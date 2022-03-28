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

export interface GitHubApiProxyConfig {
  graphqlSchema: string;
}

export function SetupGitHubApiProxy(
  config: GitHubApiProxyConfig
): (req: express.Request, res: express.Response) => void {
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

  gitHubGraphqlProxy.on('proxyRes', function (proxyRes, req, res) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
  });

  return function gitHubApiProxy(req: express.Request, res: express.Response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.body.operationName === 'IntrospectionQuery') {
      // Provides us the ability to "filter" the schema that we let Hasura see.
      void graphqlIntrospectionHandler(req, res);
      return;
    }

    gitHubGraphqlProxy.web(
      req,
      res,
      {
        headers: {
          // TODO: Make this pass a "real" bearer token.
          Authorization: 'bearer ',
        },
      },
      (err) => {
        console.log('got response', err);
        res.send('yeeeeeee');
      }
    );
    return;
  };
}
