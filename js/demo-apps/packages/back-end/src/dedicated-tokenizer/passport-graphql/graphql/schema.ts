import { GraphQLResolverMap } from 'apollo-graphql';
import { gql } from 'apollo-server-express';

import { DocumentMethods } from '../../../common/models/documents';
import { UserMethods } from '../../../common/models/user';
import { getUserOrThrow } from '../config/auth-helpers';
import { lunaSec } from '../config/configure-lunasec';
// README - This demo shows how to use the lunasec @token directive in your apollo server
// Import the directive from the node-sdk and attach it to your schemaDirectives(bottom of this file) which are passed into apollo
// and declare the directive directly in your schema with the `directive` keyword.

import { AppContext } from './graphql-apollo-server';
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
    signup(userInfo: UserInput): User!
    login(userInfo: UserInput): User!
    setSsn(ssnInfo: SsnInput): User
    setDocuments(tokenArray: DocumentsInput): Boolean!
  }

  type Query {
    getCurrentUser: User
    getUserDocuments: [Document]
  }
`;

export const resolvers: GraphQLResolverMap<AppContext> = {
  Query: {
    getCurrentUser: (_parent, _args, context) => {
      return context.getUser();
    }, // Once this resolver fires and tokens are retrieved, anything annotated with @token in FormData in the schema will be granted read permission for this session for 15 minutes

    getUserDocuments: (_parent, _args, context) => {
      const user = getUserOrThrow(context);
      return DocumentMethods.getUserDocuments(user.id);
    },
  },
  Mutation: {
    signup: async (_parent, args, context) => {
      const user = await UserMethods.createNewUser(args.userInfo);
      await context.login(args.userInfo);
      return user;
    },
    login: async (_parent, { username, password }, context) => {
      const { user } = await context.authenticate('graphql-local', {
        username,
        password,
      });

      await context.login({ username, password });
      return user;
    },
    setSsn: async (_parent, args, context) => {
      const user = getUserOrThrow(context);
      await UserMethods.setSsn(user.id, args.ssnInfo.ssn_token);
      return user;
    },

    setDocuments: async (_parent, args, context) => {
      const user = getUserOrThrow(context);
      await DocumentMethods.setUserDocuments(user.id, args.tokenArray);
      return true;
    },
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
