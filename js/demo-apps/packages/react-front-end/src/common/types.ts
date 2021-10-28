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
import { Action, Computed, Thunk } from 'easy-peasy';

export interface UserModel {
  id: string;
  username: string;
  ssn_token?: string;
}

export interface SuccessApiResponse {
  success: true;
}

export interface FailApiResponse {
  success: false;
  error: string;
}

export type ApiResponse = SuccessApiResponse | FailApiResponse;

interface UserSuccess {
  success: true;
  user: UserModel;
}

export type UserResponse = UserSuccess | FailApiResponse;

interface UserDocumentsSuccess {
  success: true;
  documents: string[];
}

export type UserDocumentsResponse = UserDocumentsSuccess | FailApiResponse;

/**
 These strings here are used to define Thunks in the store. Whenever you add a new Thunk, you must add it here.

 This implementation is... a little complicated.
 It's a clever solution that's type-safe, but that's also what I don't like about it.

 We need to have only one store if we want the app to work well.
 That means we need 2 functions -- one for the Express and GraphQL implementations.

 But how do manage that? Do we now have every component in the app aware of the "mode" that the app runs in?
 That's a leaky abstraction!

 So the solution is to create a standard "actions" object that is passed to every component of the app.
 Components can define which actions they need in their props.

 Then we "map" the desired actions (express or graphql) into the object at runtime based on the mode.
 But, how do we ensure that every time an action is added that it's properly statically typed?

 Well, to do that we follow a normal convention for the function. Like this: `saveSsn` and `saveSsnGql`.

 To enforce this, I'm using the TypeScript Template literals functionality in the `types.ts` file to enforce that these
 keys are present on the store implementation. It works beautifully, but the syntax is quite terse.
 */
export type StoreThunks = 'saveSsn' | 'loadUser' | 'loadDocuments' | 'uploadDocumentTokens' | 'login' | 'signup';
export type StoreModes = '' | 'gql';

export type StoreThunksWithModes<K extends StoreThunks> = `${K}${Capitalize<StoreModes>}`;

export type CombinedStoreThunks = {
  [Key in StoreThunks as StoreThunksWithModes<Key>]: StoreModel[Key];
};

// todo: maybe switch from using easy-peasy, this is clunky
export interface StoreModel {
  // Properties
  user: UserModel | null;
  loggedIn: Computed<StoreModel, boolean>;
  // Actions
  setUser: Action<StoreModel, UserModel>;
  setSsn: Action<StoreModel, string>;
  // Thunks
  saveSsn: Thunk<StoreModel, string, undefined, StoreModel, Promise<ApiResponse>>;
  saveSsnGql: Thunk<StoreModel, string, undefined, StoreModel, Promise<ApiResponse>>;
  loadUser: Thunk<StoreModel>;
  loadUserGql: Thunk<StoreModel>;

  loadDocuments: Thunk<StoreModel, undefined, undefined, StoreModel, Promise<UserDocumentsResponse>>;
  loadDocumentsGql: Thunk<StoreModel, undefined, undefined, StoreModel, Promise<UserDocumentsResponse>>;
  uploadDocumentTokens: Thunk<StoreModel, string[], undefined, StoreModel, Promise<ApiResponse>>;
  uploadDocumentTokensGql: Thunk<StoreModel, string[], undefined, StoreModel, Promise<ApiResponse>>;
  login: Thunk<StoreModel, { username: string; password: string }, undefined, StoreModel, Promise<UserResponse>>;
  loginGql: Thunk<StoreModel, { username: string; password: string }, undefined, StoreModel, Promise<UserResponse>>;
  signup: Thunk<StoreModel, { username: string; password: string }, undefined, StoreModel, Promise<UserResponse>>;
  signupGql: Thunk<StoreModel, { username: string; password: string }, undefined, StoreModel, Promise<UserResponse>>;
}
