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

import { ApiResponse, UserDocumentsResponse, UserResponse } from './types';

// Its better to instantiate your own copy of axios with axios.create(), this global setting left in for testing purposes because it tends to cause more issues
axios.defaults.withCredentials = true;

async function loadDocuments() {
  const { data } = await axios.get<UserDocumentsResponse>(`http://localhost:3001/documents`);
  return data;
}

async function uploadDocumentTokens(documents: string[]) {
  const { data } = await axios.post<ApiResponse>(`http://localhost:3001/documents`, { documents });
  return data;
}

async function login(username: string, password: string) {
  const { data } = await axios.post<UserResponse>(`http://localhost:3001/auth/login`, { username, password });
  return data;
}

async function signup(username: string, password: string) {
  const { data } = await axios.post<UserResponse>(`http://localhost:3001/auth/signup`, { username, password });
  return data;
}

async function saveSsn(ssn_token: string) {
  const { data } = await axios.post<ApiResponse>(`http://localhost:3001/user/set-ssn`, { ssn_token });
  return data;
}

async function loadUser() {
  const { data } = await axios.get<UserResponse>(`http://localhost:3001/user/me`);
  return data;
}
export const expressTransport = {
  signup,
  login,
  saveSsn,
  loadUser,
  loadDocuments,
  uploadDocumentTokens,
};
