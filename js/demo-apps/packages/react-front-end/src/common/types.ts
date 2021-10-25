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
  loadUser: Thunk<StoreModel>;

  loadDocuments: Thunk<StoreModel, undefined, undefined, StoreModel, Promise<UserDocumentsResponse>>;
  uploadDocumentTokens: Thunk<StoreModel, string[], undefined, StoreModel, Promise<ApiResponse>>;
  login: Thunk<StoreModel, { username: string; password: string }, undefined, StoreModel, Promise<UserResponse>>;
  signup: Thunk<StoreModel, { username: string; password: string }, undefined, StoreModel, Promise<UserResponse>>;
}
