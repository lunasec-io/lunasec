import { gql } from 'apollo-server-express';

import { lunaSec } from '../configure-lunasec';
// README - This demo shows how to use the lunasec @token directive in your apollo server
// Import the directive from the node-sdk and attach it to your schemaDirectives(bottom of this file) which are passed into apollo
// and declare the directive directly in your schema with the `directive` keyword.

export const typeDefs = gql`
  type FormData {
    email: String @token
    insecure_field: String
  }

  type Query {
    getFormData: FormData
  }

  type Mutation {
    setFormData(formData: FormDataInput): FormData
  }

  input FormDataInput {
    email: String
    insecure_field: String
  }

  directive @token on FIELD_DEFINITION | INPUT_FIELD_DEFINITION | OBJECT | INPUT_OBJECT
`;

// This is a fake little database so we have some data to serve
const db = {
  formData: {
    email: 'lunasec-FAKE-TOKEN',
    insecure_field: 'Insecure_Text',
  },
};

export const resolvers = {
  Query: {
    getFormData: () => db.formData,
  },
  Mutation: {
    setFormData: async (
      _parent: never,
      args: { formData: typeof db['formData'] },
      context: { sessionId: string },
      _info: any
    ) => {
      // For now, you must manually verify all tokens are granted before writing them to the database
      await lunaSec.grants.verifyGrant(context.sessionId, args.formData.email, 'store_token'); // Throws if there is an issue
      db.formData = args.formData;
      return db.formData;
    },
  },
};

export const schemaDirectives = {
  token: lunaSec.tokenDirective,
};
