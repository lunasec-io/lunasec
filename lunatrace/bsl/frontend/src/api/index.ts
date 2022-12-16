/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { add } from '../store/slices/alerts';

import { api as generatedApi } from './generated';
// This extends the generated API so we can add any custom logic needed, as per https://www.graphql-code-generator.com/plugins/typescript-rtk-query
const appApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['User', 'Projects', 'Organizations', 'Builds', 'ProjectDetails'],
  endpoints: {
    GetSidebarInfo: {
      providesTags: ['Projects', 'Organizations'],
    },
    GetProjects: {
      providesTags: ['Projects'],
    },
    InsertProject: {
      invalidatesTags: ['Projects'],
    },
    InsertProjectAccessToken: {
      invalidatesTags: ['ProjectDetails'],
    },
    DeleteProjectAccessToken: {
      invalidatesTags: ['ProjectDetails'],
    },
    InsertIgnoredVulnerabilities: {
      invalidatesTags: ['Builds'],
    },
    GetBuildDetails: {
      providesTags: ['Builds'],
    },
    GetVulnerableReleasesFromBuild: {
      providesTags: ['Builds'],
    },
    InsertPersonalProjectAndOrg: {
      invalidatesTags: ['Projects'],
    },
    InstallSelectedRepos: {
      invalidatesTags: ['Projects'],
    },
    GetProject: {
      providesTags: ['ProjectDetails'],
    },
    UpdateSettings: {
      invalidatesTags: ['ProjectDetails'],
    },
    InsertProjectFolderSetting: {
      invalidatesTags: ['ProjectDetails'],
    },
    InsertFolderEnvironmentalAdjustment: {
      invalidatesTags: ['ProjectDetails'],
    },
    DeleteFolderAdjustment: {
      invalidatesTags: ['ProjectDetails'],
    },
    DeleteProjectFolderSetting: {
      invalidatesTags: ['ProjectDetails'],
    },
    SetProjectFolderSettingsIgnore: {
      invalidatesTags: ['ProjectDetails'],
    },
  },
});

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const errorMessage = `Server communication error: ${action.error.message}`;
    console.warn('Rejected action from the API: ', errorMessage);
    console.log('action is ', action);
    if (errorMessage) {
      api.dispatch(add({ message: errorMessage }));
    }
  }

  return next(action);
};
export default appApi;
