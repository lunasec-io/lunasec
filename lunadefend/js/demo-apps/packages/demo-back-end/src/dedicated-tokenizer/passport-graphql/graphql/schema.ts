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
import { GraphQLResolverMap } from 'apollo-graphql';
import { gql } from 'apollo-server-express';

import { authenticateUser, getUserOrThrow } from '../config/auth-helpers';
import { lunaSec } from '../config/configure-lunasec';
// README - This demo shows how to use the lunasec @token directive in your apollo server
// Import the directive from the node-sdk and attach it to your schemaDirectives(bottom of this file) which are passed into apollo
// and declare the directive directly in your schema with the `directive` keyword.

import { AppContext } from './graphql-apollo-server';
export const typeDefs = gql`
  # Declare the lunasec @token directive
  directive @token(duration: String) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

  type User {
    username: String
    ssn_token: String @token
  }
  # Types
  type UserResponse {
    success: Boolean!
    user: User
    error: String
  }

  type Document {
    token: String @token(duration: "50m")
  }

  type DocumentResponse {
    success: Boolean!
    documents: [Document]
    error: String
  }

  type EmptyResponse {
    success: Boolean!
    error: String
  }

  # Inputs
  input UserInput {
    username: String
    password: String
  }

  input SsnInput {
    ssn_token: String @token
  }

  input DocumentsInput {
    documents: [String] @token
  }

  # Mutations and Queries
  type Mutation {
    signup(userInfo: UserInput): UserResponse!
    login(userInfo: UserInput): UserResponse!
    setSsn(ssnInfo: SsnInput): UserResponse!
    setDocuments(tokenArray: DocumentsInput): EmptyResponse!
  }

  type Query {
    getCurrentUser: UserResponse
    getDocuments: DocumentResponse
  }
`;

export const resolvers: GraphQLResolverMap<AppContext> = {
  Query: {
    getCurrentUser: (_parent, _args, context) => {
      const user = context.getUser(); // this method added by the passport-graphql plugin
      return { success: true, user: user };
    }, // Once this resolver fires and tokens are retrieved, any field annotated with @token will be granted read permission for this session for 15 minutes

    getDocuments: async (_parent, _args, context) => {
      try {
        const user = getUserOrThrow(context);
        const documents = await context.models.documents.getUserDocuments(user.id);
        return { success: true, documents: documents };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
    },
  },
  Mutation: {
    signup: async (_parent, args, context) => {
      try {
        const user = await context.models.user.createNewUser(args.userInfo);
        await context.login(user);
        return { success: true, user: user };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
    },
    login: async (_parent, { userInfo }, context) => {
      try {
        const { username, password } = userInfo;
        // bypassed passport entirely for this part, it just wasn't working.  LunaSec does not recommend Passport, this is just an example
        const user = await authenticateUser(context.models, username, password);
        await context.login(user);
        return { success: true, user: user };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
    },
    setSsn: async (_parent, args, context) => {
      try {
        const user = getUserOrThrow(context);
        await context.models.user.setSsn(user.id, args.ssnInfo.ssn_token);
        return { success: true, user: user };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
    },

    setDocuments: async (_parent, args, context) => {
      try {
        const user = getUserOrThrow(context);
        await context.models.documents.setUserDocuments(user.id, args.tokenArray.documents);
        return { success: true };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
    },
  },
};

export const schemaDirectives = {
  token: lunaSec.tokenDirective,
};
