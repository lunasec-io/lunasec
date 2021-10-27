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
import axios from 'axios';
// easy-peasy is a simple store based on Redux, with a bad name
import { action, computed, createStore, thunk } from 'easy-peasy';

import { ApiResponse, StoreModel, UserDocumentsResponse, UserResponse } from './types';

// Its better to instantiate your own copy of axios with axios.create(), this global setting left in for testing purposes
axios.defaults.withCredentials = true;

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
    const { data } = await axios.post<ApiResponse>(`http://localhost:3001/user/set-ssn`, { ssn_token });
    if (data.success) {
      actions.setUser({ ...currentUser, ssn_token });
    }
    return data;
  }),

  loadUser: thunk(async (actions) => {
    const { data } = await axios.get<UserResponse>(`http://localhost:3001/user/me`);
    if (data.success) {
      actions.setUser(data.user);
      return data;
    }
    return data;
  }),

  loadDocuments: thunk(async () => {
    const { data } = await axios.get<UserDocumentsResponse>(`http://localhost:3001/documents`);
    return data;
  }),

  uploadDocumentTokens: thunk(async (actions, documents) => {
    const { data } = await axios.post<ApiResponse>(`http://localhost:3001/documents`, { documents });
    return data;
  }),

  login: thunk(async (actions, { username, password }) => {
    const { data } = await axios.post<UserResponse>(`http://localhost:3001/auth/login`, { username, password });
    if (data.success) {
      actions.setUser(data.user);
    }
    return data;
  }),

  signup: thunk(async (actions, { username, password }) => {
    const { data } = await axios.post<UserResponse>(`http://localhost:3001/auth/signup`, { username, password });
    if (data.success) {
      actions.setUser(data.user);
    }
    return data;
  }),
});
