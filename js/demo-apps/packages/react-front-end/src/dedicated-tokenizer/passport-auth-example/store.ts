import axios from 'axios';
import { Action, action, Computed, computed, createStore, createTypedHooks, Thunk, thunk } from 'easy-peasy';

import { ApiResponse, CurrentUserResponse, UserModel as User } from './types';

interface StoreModel {
  user: User | null;
  loggedIn: Computed<StoreModel, boolean>;
  setUser: Action<StoreModel, User>;
  saveUser: Thunk<StoreModel, { ssnToken: string }>;
  getUser: Thunk<StoreModel>;
}

export const store = createStore<StoreModel>({
  user: null,
  loggedIn: computed((state) => !!state.user),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  saveUser: thunk(async (state, payload) => {
    const { data } = await axios.post<ApiResponse>(`/user/me`, payload);
    return data;
  }),
  getUser: thunk(async (state) => {
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
