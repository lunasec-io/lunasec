import { gql, IResolvers } from 'apollo-server-express';

import { DocumentMethods } from '../../../common/models/documents';
import { UserMethods } from '../../../common/models/user';
import { lunaSec } from '../../../configure-lunasec';
// README - This demo shows how to use the lunasec @token directive in your apollo server
// Import the directive from the node-sdk and attach it to your schemaDirectives(bottom of this file) which are passed into apollo
// and declare the directive directly in your schema with the `directive` keyword.

export const typeDefs = gql`
  # Declare the lunasec @token directive
  directive @token on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

  # Types
  type User {
    username: String
    ssn_token: String @token
  }

  type Document {
    token: String @token
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
    signup(userInfo: UserInput): User
    login(userInfo: UserInput): User
    setSsn(ssnInfo: SsnInput): User
    setDocuments(tokenArray: DocumentsInput): Boolean
  }

  type Query {
    getCurrentUser: User
    getUserDocuments: [Document]
  }
`;

export const resolvers: IResolvers = {
  Query: {
    getCurrentUser: (parent, args, context, info) => {}, // Once this resolver fires and tokens are retrieved, anything annotated with @token in FormData in the schema will be granted read permission for this session for 15 minutes
    getUserDocuments: () => {},
  },
  Mutation: {
    // setFormData: async (
    //   _parent: never,
    //   args: { formData: typeof db['formData'] },
    //   _context: { sessionId: string },
    //   _info: any
    // ) => {
    //   // If the tokens annotated with @token in FormDataInput in the schema are not granted permission to be written to the database for this sessionID
    //   // they will throw and we would not reach this resolver
    //   db.formData = args.formData;
    //   console.debug('setting test data to ', args.formData);
    //   return db.formData;
    // },
  },
};

export const schemaDirectives = {
  token: lunaSec.tokenDirective,
};
