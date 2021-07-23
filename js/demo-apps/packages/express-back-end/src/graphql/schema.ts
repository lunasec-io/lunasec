import { TokenInputType } from '@lunasec/node-sdk';
import { gql } from 'apollo-server-express';

import { lunaSec } from '../configure-lunasec';
// README - This demo shows how to use the lunasec @token directive in your apollo server
// Import the directive from the node-sdk and attach it to your schemaDirectives(bottom of this file) which are passed into apollo
// and declare the directive directly in your schema with the `directive` keyword.

export const typeDefs = gql`
  scalar TokenInput

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
    text_area: String
    files: [String] @token
  }

  directive @token on FIELD_DEFINITION | INPUT_FIELD_DEFINITION ### Enable input field annotation once plugin working
`;

// This is a fake little database so we have some data to serve
const db = {
  formData: {
    text_area: '',
    email: 'lunasec-b74d3a3a-9375-4ead-84be-a935cc00d01e',
    insecure_field: 'Some Insecure Data Coexisting',
    files: [],
  },
};

export const resolvers = {
  TokenInput: TokenInputType,
  Query: {
    getFormData: () => db.formData,
  },
  Mutation: {
    setFormData: async (
      _parent: never,
      args: { formData: typeof db['formData'] },
      _context: { sessionId: string },
      _info: any
    ) => {
      // For now, you must manually verify all tokens are granted before writing them to the database
      // await lunaSec.grants.verify(context.sessionId, args.formData.email, 'store_token'); // Throws if there is an issue
      // await lunaSec.grants.verify(context.sessionId, args.formData.text_area, 'store_token');
      db.formData = args.formData;
      console.debug('setting test data to ', args.formData);
      return db.formData;
    },
  },
};

export const schemaDirectives = {
  token: lunaSec.tokenDirective,
};
