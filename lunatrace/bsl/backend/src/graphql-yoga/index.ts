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
import { join } from 'path';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { createServer } from '@graphql-yoga/node';
import Express from 'express';

import { jwtMiddleware } from '../utils/jwt-middleware';
import { log } from '../utils/log';

import { resolvers } from './resolvers';

const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), { loaders: [new GraphQLFileLoader()] });

const schemaWithResolvers = addResolversToSchema(schema, resolvers);

const graphqlServer = createServer({
  // logging: log,
  schema: schemaWithResolvers,
  graphiql: true,
  maskedErrors: false,
});

export function registerYoga(app: Express.Application): void {
  app.use('/graphql', jwtMiddleware, graphqlServer);
  log.log('Started Graphql Yoga Server');
}
