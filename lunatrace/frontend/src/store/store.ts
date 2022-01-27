/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { createBrowserHistory } from 'history';
// import { createReduxHistoryContext } from 'redux-first-history';

import counterReducer from '../components/counter/counterSlice';

// redux-first-history router stuff
// const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
//   history: createBrowserHistory(),
//   reduxTravelling: true,
//   savePreviousLocations: 6,
// });

import { api } from './api';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [api.reducerPath]: api.reducer,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // router: routerReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    middleware.push(api.middleware);
    // middleware.push(routerMiddleware);
    return middleware;
  },
});
setupListeners(store.dispatch);

// export const history = createReduxHistory(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
