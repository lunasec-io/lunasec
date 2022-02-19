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
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { createBrowserHistory } from 'history';
// import { createReduxHistoryContext } from 'redux-first-history';

import { api } from './api';
import { authSlice } from './slices/authentication';

// redux-first-history router stuff
// const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
//   history: createBrowserHistory(),
//   reduxTravelling: true,
//   savePreviousLocations: 6,
// });

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    middleware.push(api.middleware);
    return middleware;
  },
});
setupListeners(store.dispatch);

// export const history = createReduxHistory(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
