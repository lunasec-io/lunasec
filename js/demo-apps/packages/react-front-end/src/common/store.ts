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
// easy-peasy is a simple store based on Redux, with a bad name

import { action, computed, createStore, createTypedHooks, thunk } from 'easy-peasy';

import { expressTransport } from './express-transport';
import { graphQlTransport } from './graphql-transport';
import { Mode, StoreModel, Transport } from './types';

export function getTransport(mode: Mode): Transport {
  if (mode === 'graphql') {
    return graphQlTransport;
  }
  return expressTransport;
}
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

  saveSsn: thunk(async (actions, { transport, ssn_token }, { getState }) => {
    const currentUser = getState().user;
    if (!currentUser) {
      throw new Error('Cant set SSN for a user that isnt logged in');
    }
    const data = await transport.saveSsn(ssn_token);
    if (data.success) {
      actions.setUser({ ...currentUser, ssn_token });
    }
    return data;
  }),

  loadUser: thunk(async (actions, { transport }) => {
    const data = await transport.loadUser();
    if (data.success) {
      actions.setUser(data.user);
      return data;
    }
    return data;
  }),

  loadDocuments: thunk(async (actions, { transport }) => {
    return transport.loadDocuments();
  }),

  uploadDocumentTokens: thunk(async (actions, { transport, documents }) => {
    return transport.uploadDocumentTokens(documents);
  }),

  login: thunk(async (actions, { transport, username, password }) => {
    const data = await transport.login(username, password);
    if (data.success) {
      actions.setUser(data.user);
    }
    return data;
  }),

  signup: thunk(async (actions, { transport, username, password }) => {
    const data = await transport.signup(username, password);
    if (data.success) {
      actions.setUser(data.user);
    }
    return data;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
