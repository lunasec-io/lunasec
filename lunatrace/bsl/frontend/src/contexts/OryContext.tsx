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
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import React, { createContext, Reducer, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router';

import { createLogoutHandler } from '../hooks/createLogoutHandler';
import { getOrySession } from '../store/session';
import { handleFlowError } from '../utils/handleGetFlowError';
import ory from '../utils/sdk';

const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SIGN_UP = 'SIGN_UP';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  session: null,
};

export interface OryPayload {
  isAuthenticated: boolean;
  isInitialized: boolean;
  session: null | Session;
}

const OryReducer: Reducer<OryPayload, PayloadAction<OryPayload>> = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: !!action.payload.session,
        isInitialized: true,
        session: action.payload.session,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        session: action.payload.session,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        session: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        session: action.payload.session,
      };

    default:
      return state;
  }
};

export interface OryAuthContext {
  state: OryPayload;
  signIn: (
    flow: SelfServiceLoginFlow | undefined,
    setFlow: React.Dispatch<React.SetStateAction<SelfServiceLoginFlow | undefined>>,
    values: SubmitSelfServiceLoginFlowBody
  ) => void;
  signOut: () => void;
  signUp: (
    flow: SelfServiceRegistrationFlow | undefined,
    setFlow: React.Dispatch<React.SetStateAction<SelfServiceRegistrationFlow | undefined>>,
    values: SubmitSelfServiceRegistrationFlowBody
  ) => void;
  resetPassword: (email: string) => void;
}

export const AuthContext = createContext<OryAuthContext>({
  resetPassword: (email: string) => {
    return;
  },
  signIn: (
    flow: SelfServiceLoginFlow | undefined,
    setFlow: React.Dispatch<React.SetStateAction<SelfServiceLoginFlow | undefined>>,
    values: SubmitSelfServiceLoginFlowBody
  ) => {
    console.log('sign in stub');
  },
  signOut: () => {
    console.log('sign out stub');
  },
  signUp: (
    flow: SelfServiceRegistrationFlow | undefined,
    setFlow: React.Dispatch<React.SetStateAction<SelfServiceRegistrationFlow | undefined>>,
    values: SubmitSelfServiceRegistrationFlowBody
  ) => {
    console.log('sign up stub');
  },
  state: {
    isAuthenticated: false,
    isInitialized: false,
    session: null,
  },
});

export const AuthProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(OryReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = (session: Session) => {
      try {
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: true,
            isInitialized: true,
            session,
          },
        });
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            isInitialized: true,
            session: null,
          },
        });
      }
    };

    return getOrySession(initialize);
  }, []);

  const signIn = (
    flow: SelfServiceLoginFlow | undefined,
    setFlow: React.Dispatch<React.SetStateAction<SelfServiceLoginFlow | undefined>>,
    values: SubmitSelfServiceLoginFlowBody
  ) => {
    if (!flow) {
      throw new Error('flow is undefined in sign in');
    }

    // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
    // his data when she/he reloads the page.
    navigate(`/login?flow=${flow.id}`, { replace: true });
    ory
      .submitSelfServiceLoginFlow(String(flow.id), undefined, values)
      // We logged in successfully! Let's bring the user home.
      .then((res) => {
        if (flow.return_to) {
          window.location.href = flow.return_to;
          return;
        }
        dispatch({
          type: SIGN_IN,
          payload: {
            isAuthenticated: true,
            isInitialized: true,
            session: res.data.session,
          },
        });
        navigate('/');
      })
      .catch(handleFlowError(navigate, 'login', setFlow))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          setFlow(err.response?.data);
          return;
        }

        return Promise.reject(err);
      });
  };

  const logoutHandler = createLogoutHandler();

  const signOut = () => {
    logoutHandler();
    dispatch({
      type: SIGN_OUT,
      payload: {
        isAuthenticated: false,
        isInitialized: true,
        session: null,
      },
    });
  };

  const signUp = (
    flow: SelfServiceRegistrationFlow | undefined,
    setFlow: React.Dispatch<React.SetStateAction<SelfServiceRegistrationFlow | undefined>>,
    values: SubmitSelfServiceRegistrationFlowBody
  ) => {
    if (!flow) {
      throw new Error('flow is undefined in sign up');
    }

    // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
    // his data when she/he reloads the page.
    navigate(`/account/register?flow=${flow.id}`, { replace: true });
    ory
      .submitSelfServiceRegistrationFlow(String(flow.id), values)
      .then(({ data }) => {
        // If we ended up here, it means we are successfully signed up!
        //
        // You can do cool stuff here, like having access to the identity which just signed up:
        console.log('This is the user session: ', data, data.identity);

        dispatch({
          type: SIGN_UP,
          payload: {
            isInitialized: true,
            isAuthenticated: true,
            session: data.session || null,
          },
        });

        // For now however we just want to redirect home!
        return navigate(flow.return_to || '/');
      })
      .catch(handleFlowError(navigate, 'register', setFlow))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          setFlow(err.response?.data);
          return;
        }

        return Promise.reject(err);
      });
  };

  const resetPassword = (email: string) => {
    console.log(email);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
