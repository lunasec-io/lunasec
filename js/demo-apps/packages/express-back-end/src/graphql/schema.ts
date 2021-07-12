import { TokenDirective } from '@lunasec/node-sdk';
import { gql } from 'apollo-server-express';
import { Request } from 'express';
import { jwtVerify } from 'jose/jwt/verify';

import { tokenService } from '../lunasec-plugins';

// README - This demo shows how to use the lunasec @token directive in your apollo server
// Import the directive from the node-sdk and attach it to your schemaDirectives(bottom of this file) which are passed into apollo
// and declare the directive directly in your schema with the `directive` keyword.

const __PUBLIC_KEY__ = process.env.SESSION_JWT_PUBLIC_KEY as string;

export const typeDefs = gql`
  type FormData {
    email: String @token
    insecure_field: String
  }

  type Query {
    getFormData: FormData
  }

  type Mutation {
    setFormData(formData: FormDataInput): FormData @token
  }

  input FormDataInput @token {
    email: String @token #  I put the token directive all over the place to see if it could get picked up in the plugin, but ultimately it will just be here ( and on email above)
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

export function context(context: { req: Request }) {}

export const resolvers = {
  Query: {
    getFormData: () => db.formData,
  },
  Mutation: {
    setFormData: (_parent: never, args: { formData: typeof db['formData'] }, context: any, _info: any) => {
      // TODO: clean this up and do it in a context function passed to apollo
      db.formData = args.formData;
      return db.formData;
    },
  },
};

export const schemaDirectives = {
  token: TokenDirective,
};
