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
import { gql } from 'apollo-server-express';

import { lunaSec } from '../configure-lunasec';
// README - This demo shows how to use the lunasec @token directive in your apollo server
// Import the directive from the node-sdk and attach it to your schemaDirectives(bottom of this file) which are passed into apollo
// and declare the directive directly in your schema with the `directive` keyword.

export const typeDefs = gql`
  type Query {
    getFormData: FormData
  }

  type FormData {
    text_area: String @token
    email: String @token
    insecure_field: String
    files: [String] @token # @token directive also works on arrays of tokens
  }

  type Mutation {
    setFormData(formData: FormDataInput): FormData
  }

  input FormDataInput {
    email: String @token
    insecure_field: String
    text_area: String @token
    files: [String] @token
  }

  directive @token on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
`;

// This is a fake little database so we have some data to serve
const db = {
  formData: {
    text_area: '',
    email: '',
    insecure_field: 'Some Insecure Data Coexisting',
    files: [],
  },
};

export const resolvers = {
  Query: {
    getFormData: () => db.formData, // Once this resolver fires and tokens are retrieved, anything annotated with @token in FormData in the schema will be granted read permission for this session for 15 minutes
  },
  Mutation: {
    setFormData: async (
      _parent: never,
      args: { formData: typeof db['formData'] },
      _context: { sessionId: string },
      _info: any
    ) => {
      // If the tokens annotated with @token in FormDataInput in the schema are not granted permission to be written to the database for this sessionID
      // they will throw and we would not reach this resolver
      db.formData = args.formData;
      console.debug('setting test data to ', args.formData);
      return db.formData;
    },
  },
};

export const schemaDirectives = {
  token: lunaSec.tokenDirective,
};
