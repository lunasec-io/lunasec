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
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertProps } from 'react-bootstrap';

// This slice is used to show global alerts, like when an error occurs with the page. Since these can happen from anywhere, even
// in the sidebar, they need to be part of global state and rendered as part of the layout

export interface AlertItem {
  message: string;
  variant?: AlertProps['variant'];
}

interface AlertsState {
  alerts: Record<string, AlertItem>;
}

const initialState = { alerts: {} } as AlertsState;

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    add(state, action: PayloadAction<AlertItem>) {
      const { payload } = action;
      // Alerts are deduped on message text since react's rendering flow often causes errors to be logged multiple times
      state.alerts = Object.assign({}, state.alerts, { [payload.message]: payload });
      // state.alerts[payload.message] = payload;
    },
    remove(state, action: PayloadAction<string>) {
      delete state.alerts[action.payload]; // thank you immer for making this immutable
    },
    clear(state) {
      state.alerts = {};
    },
  },
});

export const { add, remove, clear } = alertsSlice.actions;
export const alertsReducer = alertsSlice.reducer;
