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
import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';

import { ApiResponse, Transport, UserDocumentsResponse, UserResponse } from './types';

const link = createHttpLink({
  uri: 'http://localhost:3002/graphql',
  credentials: 'include',
});

const apollo = new ApolloClient({
  link,
  cache: new InMemoryCache(), // Todo: It is a good idea to set up a cache that won't last longer than the grant time.  Here we are just using network-only to bypass that issue
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

async function saveSsn(ssn_token: string) {
  const res = await apollo.mutate({
    variables: { ssn_token },
    mutation: gql`
      mutation SetSsn($ssn_token: String!) {
        setSsn(ssnInfo: { ssn_token: $ssn_token }) {
          success
          error
        }
      }
    `,
  });
  return res.data.setSsn as ApiResponse;
}

async function loadUser() {
  const res = await apollo.query({
    query: gql`
      query GetCurrentUser {
        getCurrentUser {
          success
          error
          user {
            username
            ssn_token
          }
        }
      }
    `,
  });
  return res.data.getCurrentUser as UserResponse;
}

async function loadDocuments() {
  const res = await apollo.query({
    query: gql`
      query GetDocuments {
        getDocuments {
          success
          error
          documents {
            token
          }
        }
      }
    `,
  });
  const data = res.data.getDocuments;
  // Have to do a little data rearranging here to keep parity with the express endpoint
  const unwrappedDocumentTokens = data.documents ? data.documents.map((doc: { token: string }) => doc.token) : null;
  const result: UserDocumentsResponse = {
    error: data.error,
    success: data.success,
    documents: unwrappedDocumentTokens,
  };
  return result;
}

async function uploadDocumentTokens(documents: string[]) {
  const res = await apollo.mutate({
    variables: { documents },
    mutation: gql`
      mutation SetDocuments($documents: [String]!) {
        setDocuments(tokenArray: { documents: $documents }) {
          success
          error
        }
      }
    `,
  });
  return res.data.setDocuments as ApiResponse;
}

async function login(username: string, password: string) {
  const res = await apollo.mutate({
    variables: { username, password },
    mutation: gql`
      mutation Login($username: String!, $password: String!) {
        login(userInfo: { username: $username, password: $password }) {
          success
          error
          user {
            username
            ssn_token
          }
        }
      }
    `,
  });
  return res.data.login as UserResponse;
}

async function signup(username: string, password: string) {
  const res = await apollo.mutate({
    variables: { username, password },
    mutation: gql`
      mutation Signup($username: String!, $password: String!) {
        signup(userInfo: { username: $username, password: $password }) {
          success
          error
          user {
            username
            ssn_token
          }
        }
      }
    `,
  });
  return res.data.signup as UserResponse;
}

export const graphQlTransport: Transport = {
  signup,
  login,
  saveSsn,
  loadUser,
  loadDocuments,
  uploadDocumentTokens,
};
