import { ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache, useQuery } from '@apollo/client';
import axios from 'axios';
// easy-peasy is a simple store based on Redux, with a bad name
import { action, computed, createStore, thunk } from 'easy-peasy';

import { ApiResponse, StoreModel, UserDocumentsResponse, UserResponse } from '../../common/types';

// async function makeGraphqlRequest<ResponseDataType>(requestBody: string) {
//   const res = await axios.post(
//     'http://localhost:3001/graphql',
//     JSON.stringify({
//       query: requestBody,
//     })
//   );
//   return res.data as ResponseDataType;
// }
const link = createHttpLink({
  uri: 'http://localhost:3001/graphql',
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

export const store = createStore<StoreModel>({
  user: null,
  loggedIn: computed((state) => !!state.user),
  setUser: action((state, user) => {
    state.user = user;
  }),
  setSsn: action((state, ssn) => {
    if (!state.user) {
      throw new Error('Cant set SSN for a user that isnt logged in');
    }
    state.user.ssn_token = ssn;
  }),

  saveSsn: thunk(async (actions, ssn_token, { getState }) => {
    const currentUser = getState().user;
    if (!currentUser) {
      throw new Error('Cant set SSN for a user that isnt logged in');
    }
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
    const data = res.data.setSsn;
    if (data.success) {
      actions.setUser({ ...currentUser, ssn_token });
    }
    return data;
  }),

  loadUser: thunk(async (actions) => {
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
    const data = res.data.getCurrentUser;
    if (data.success) {
      actions.setUser(data.user);
    }
    return data;
  }),

  loadDocuments: thunk(async () => {
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
    const unwrappedDocumentTokens = data.documents ? data.documents.map((doc: { token: string }) => doc.token) : null;
    return {
      error: data.error,
      success: data.success,
      documents: unwrappedDocumentTokens,
    };
  }),

  uploadDocumentTokens: thunk(async (actions, documents) => {
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
    return res.data.setDocuments;
  }),

  login: thunk(async (actions, { username, password }) => {
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
    const data = res.data.login;
    if (data.success) {
      actions.setUser(data.user);
    }
    return data;
  }),

  signup: thunk(async (actions, { username, password }) => {
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
    const data = res.data.signup;
    if (data.success) {
      actions.setUser(data.user);
    }
    return data;
  }),
});
