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
    token: String @token
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
    getUserDocuments: DocumentResponse
  }
`;

export const resolvers: GraphQLResolverMap<AppContext> = {
  Query: {
    getCurrentUser: (_parent, _args, context) => {
      const user = context.getUser(); // this method added by the passport-graphql plugin
      return { success: true, user: user };
    }, // Once this resolver fires and tokens are retrieved, any field annotated with @token will be granted read permission for this session for 15 minutes

    getUserDocuments: async (_parent, _args, context) => {
      try {
        const user = getUserOrThrow(context);
        const documents = await DocumentMethods.getUserDocuments(user.id);
        return { success: true, documents: documents };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
    },
  },
  Mutation: {
    signup: async (_parent, args, context) => {
      try {
        const user = await UserMethods.createNewUser(args.userInfo);
        await context.login(args.userInfo);
        return { success: true, user: user };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
    },
    login: async (_parent, { userInfo }, context) => {
      try {
        const { username, password } = userInfo;
        const { user } = await context.authenticate('graphql-local', {
          username,
          password,
        });

        await context.login({ username, password });
        return { success: true, user: user };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
    },
    setSsn: async (_parent, args, context) => {
      try {
        const user = getUserOrThrow(context);
        await UserMethods.setSsn(user.id, args.ssnInfo.ssn_token);
        return { success: true, user: user };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
    },

    setDocuments: async (_parent, args, context) => {
      try {
        const user = getUserOrThrow(context);
        await DocumentMethods.setUserDocuments(user.id, args.tokenArray);
        return { success: true };
      } catch (e) {
        return { success: false, error: (e as Error).toString() };
      }
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
