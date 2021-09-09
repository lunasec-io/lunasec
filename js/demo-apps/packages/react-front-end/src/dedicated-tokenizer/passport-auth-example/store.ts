import axios from 'axios';
import { Action, action, Computed, computed, createStore, createTypedHooks, Thunk, thunk } from 'easy-peasy';

import { ApiResponse, CurrentUserResponse, UserModel } from './types';

interface StoreModel {
  user: UserModel | null;
  loggedIn: Computed<StoreModel, boolean>;
  setUser: Action<StoreModel, UserModel>;
  setSsn: Action<StoreModel, string>;
  saveUser: Thunk<StoreModel, { ssnToken: string }>;
  loadUser: Thunk<StoreModel>;
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
  saveUser: thunk(async (state, changedFields) => {
    const { data } = await axios.post<ApiResponse>(`/user/me`, changedFields);
    return data;
  }),
  loadUser: thunk(async (state) => {
    const { data } = await axios.get<CurrentUserResponse>(`/user/me`);
    if (data.success) {
      state.setUser(data.user);
      return data;
    }
    return data;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
