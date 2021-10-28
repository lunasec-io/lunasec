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

import { expressTransport } from './express-transport';

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

// We could use either transport here for typings, TS will throw if the Graphql transport doesnt match this one when we try to use it
export type Transport = typeof expressTransport;

export interface StoreModel {
  // Properties
  user: UserModel | null;
  loggedIn: Computed<StoreModel, boolean>;
  // Actions
  setUser: Action<StoreModel, UserModel>;
  setSsn: Action<StoreModel, string>;
  // Thunks
  saveSsn: Thunk<StoreModel, { transport: Transport; ssn_token: string }, undefined, StoreModel, Promise<ApiResponse>>;
  loadUser: Thunk<StoreModel, { transport: Transport }>;
  loadDocuments: Thunk<StoreModel, { transport: Transport }, undefined, StoreModel, Promise<UserDocumentsResponse>>;
  uploadDocumentTokens: Thunk<
    StoreModel,
    { transport: Transport; documents: string[] },
    undefined,
    StoreModel,
    Promise<ApiResponse>
  >;
  login: Thunk<
    StoreModel,
    { transport: Transport; username: string; password: string },
    undefined,
    StoreModel,
    Promise<UserResponse>
  >;
  signup: Thunk<
    StoreModel,
    { transport: Transport; username: string; password: string },
    undefined,
    StoreModel,
    Promise<UserResponse>
  >;
}

export type Mode = 'simple' | 'express' | 'graphql';
