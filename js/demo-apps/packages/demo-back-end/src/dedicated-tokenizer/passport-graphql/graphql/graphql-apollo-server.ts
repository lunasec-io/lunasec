/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { Express } from 'express';
import { buildContext as buildPassportContext, PassportContext } from 'graphql-passport';

import { Models } from '../../../common/models';
import { UserModel } from '../../../common/models/user';

import { resolvers, schemaDirectives, typeDefs } from './schema';

export async function attachApolloServer(app: Express, models: Models): Promise<void> {
  console.log('attaching apollo server to express');

  function buildContext(context: ExpressContext) {
    return {
      ...buildPassportContext(context),
      models,
    };
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers,
    schemaDirectives,
    context: buildContext,
  });
  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
      methods: ['GET', 'PUT', 'POST'],
      credentials: true,
    },
  });
}

export interface AppContext extends PassportContext<UserModel, { username: string; password?: string; id?: string }> {
  models: Models;
}
