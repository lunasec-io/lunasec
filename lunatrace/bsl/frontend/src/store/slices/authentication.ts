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
import {
  SelfServiceLoginFlow,
  SelfServiceRegistrationFlow,
  Session,
  SubmitSelfServiceLoginFlowBody,
  SubmitSelfServiceRegistrationFlowBody,
} from '@ory/kratos-client';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';

import { api } from '../../api/generated';
import { createLogoutHandler } from '../../hooks/createLogoutHandler';
import { handleFlowError } from '../../utils/handleGetFlowError';
import oryClient from '../../utils/ory-client';
import { getImpersonatedUser, sidebarDataIsForAdmin } from '../../utils/users';
import { AppThunk, RootState } from '../store';

export interface AuthState {
  confirmedUnauthenticated: boolean;
  session: null | Session;

  loginFlow: SelfServiceLoginFlow | undefined;
  registerFlow: SelfServiceRegistrationFlow | undefined;
}

const initialState: AuthState = {
  confirmedUnauthenticated: false,
  session: null,

  loginFlow: undefined,
  registerFlow: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLoginFlow: (state, action: PayloadAction<SelfServiceLoginFlow>) => {
      state.loginFlow = action.payload;
    },
    resetLoginFlow: (state) => {
      state.loginFlow = undefined;
    },
    setRegisterFlow: (state, action: PayloadAction<SelfServiceRegistrationFlow>) => {
      state.registerFlow = action.payload;
    },
    resetRegisterFlow: (state) => {
      state.registerFlow = undefined;
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    setConfirmedUnauthenticated: (state, action: PayloadAction<boolean>) => {
      state.confirmedUnauthenticated = action.payload;
    },
  },
});

export const {
  setLoginFlow,
  resetLoginFlow,
  setRegisterFlow,
  resetRegisterFlow,
  setSession,
  setConfirmedUnauthenticated,
} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.session !== null;
export const selectSession = (state: RootState) => state.auth.session;
export const selectLoginFlow = (state: RootState) => state.auth.loginFlow;
export const selectRegisterFlow = (state: RootState) => state.auth.registerFlow;
export const selectUserId = (state: RootState) => state.auth.session?.identity.id;
export const selectConfirmedUnauthenticated = (state: RootState) => state.auth.confirmedUnauthenticated;

const sidebarInfoResult = api.endpoints.GetSidebarInfo.select();
export const userIsAdmin = (state: RootState) => {
  if (getImpersonatedUser() !== null) {
    return true;
  }

  const userId = selectUserId(state);
  if (!userId) {
    return false;
  }
  const sidebarData = sidebarInfoResult(state).data;
  return sidebarDataIsForAdmin(userId, sidebarData);
};

export const login =
  (navigate: NavigateFunction, values: SubmitSelfServiceLoginFlowBody): AppThunk =>
  (dispatch, getState) => {
    const flow = selectLoginFlow(getState());

    if (!flow) {
      throw new Error('flow is undefined in login');
    }

    // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
    // his data when she/he reloads the page.
    navigate(`/login?flow=${flow.id}`, { replace: true });
    oryClient
      .submitSelfServiceLoginFlow(String(flow.id), undefined, values)
      // We logged in successfully! Let's bring the user home.
      .then((res) => {
        if (flow.return_to) {
          window.location.href = flow.return_to;
          return;
        }
        const session: Session = res.data.session;
        dispatch(setSession(session));

        navigate('/');
      })
      .catch(handleFlowError(navigate, 'login', () => dispatch(resetLoginFlow())))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          dispatch(setLoginFlow(err.response?.data));
          return;
        }

        return Promise.reject(err);
      });
  };

export const register =
  (navigate: NavigateFunction, values: SubmitSelfServiceRegistrationFlowBody): AppThunk =>
  (dispatch, getState) => {
    const flow = selectRegisterFlow(getState());

    if (!flow) {
      throw new Error('flow is undefined in register');
    }

    // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
    // his data when she/he reloads the page.
    navigate(`/account/register?flow=${flow.id}`, { replace: true });
    oryClient
      .submitSelfServiceRegistrationFlow(String(flow.id), values)
      .then(({ data }) => {
        // If we ended up here, it means we are successfully signed up!
        //
        // You can do cool stuff here, like having access to the identity which just signed up:
        console.log('This is the user session: ', data, data.identity);

        dispatch(setSession(data.session || null));

        // For now however we just want to redirect home!
        return navigate(flow.return_to || '/');
      })
      .catch(handleFlowError(navigate, 'register', () => dispatch(resetRegisterFlow())))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          dispatch(setRegisterFlow(err.response?.data));
          return;
        }

        return Promise.reject(err);
      });
  };

export const logout =
  (navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    const logoutHandler = createLogoutHandler(navigate);
    void logoutHandler();
    dispatch(setSession(null));
    window.Atlas.shutdown();
  };
