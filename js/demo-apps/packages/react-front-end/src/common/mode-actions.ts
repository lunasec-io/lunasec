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
import { Actions } from 'easy-peasy';

import { StoreModel } from './types';

export function getActionsForMode(mode: 'graphql' | 'express', actions: Actions<StoreModel>) {
  const isGraphQlMode = mode === 'graphql';

  if (isGraphQlMode) {
    return {
      signup: actions.signupGql,
      login: actions.loginGql,
      saveSsn: actions.saveSsnGql,
      loadUser: actions.loadUserGql,
      loadDocuments: actions.loadDocumentsGql,
      uploadDocumentTokens: actions.uploadDocumentTokensGql,
    };
  }

  return {
    signup: actions.signup,
    login: actions.login,
    saveSsn: actions.saveSsn,
    loadUser: actions.loadUser,
    loadDocuments: actions.loadDocuments,
    uploadDocumentTokens: actions.uploadDocumentTokens,
  };
}
