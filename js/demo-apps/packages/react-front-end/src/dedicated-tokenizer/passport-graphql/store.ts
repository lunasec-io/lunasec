import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';
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

const apollo = new ApolloClient({
  uri: 'http://localhost:3001',
  cache: new InMemoryCache(),
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
    console.log('about to make api call');
    const { data } = await axios.post<ApiResponse>(`/user/set-ssn`, { ssn_token });
    console.log('api responded ', data);
    if (data.success) {
      actions.setUser({ ...currentUser, ssn_token });
    }
    return data;
  }),

  loadUser: thunk(async (actions) => {
    const { data } = await axios.get<UserResponse>(`/user/me`);
    if (data.success) {
      actions.setUser(data.user);
      return data;
    }
    return data;
  }),

  loadDocuments: thunk(async () => {
    const { data } = await axios.get<UserDocumentsResponse>(`/documents`);
    return data;
  }),

  uploadDocumentTokens: thunk(async (actions, documents) => {
    console.log('uploading document tokens ', documents);
    const { data } = await axios.post<ApiResponse>(`/documents`, { documents });
    return data;
  }),

  login: thunk(async (actions, { username, password }) => {
    const data = await apollo.mutate({
      mutation: gql`
        mutation login(userInfo: {username {
          getFormData {
            email
            insecure_field
            text_area
            files
          }
      }`

    // const { data } = await axios.post<UserResponse>(`/auth/login`, { username, password });
    // if (data.success) {
    //   actions.setUser(data.user);
    // }
    // return data;
  }),

  signup: thunk(async (actions, { username, password }) => {
    const { data } = await axios.post<UserResponse>(`/auth/signup`, { username, password });
    if (data.success) {
      actions.setUser(data.user);
    }
    return data;
  }),
});
