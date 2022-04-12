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
import { SubmitSelfServiceLoginFlowBody } from '@ory/kratos-client';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Flow } from '../../components/auth';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { login, resetLoginFlow, selectLoginFlow, setLoginFlow } from '../../store/slices/authentication';
import { handleFlowError, handleGetFlowError } from '../../utils/handleGetFlowError';
import oryClient from '../../utils/ory-client';

export const Login = () => {
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectLoginFlow);

  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const navigate = useNavigate();

  // Get ?flow=... from the URL
  const returnTo = searchParams.get('return_to');
  const flowId = searchParams.get('flow');
  // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
  // of a user.
  const refresh = searchParams.get('refresh');
  // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
  // to perform two-factor authentication/verification.
  const aal = searchParams.get('aal');

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      oryClient
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => {
          dispatch(setLoginFlow(data));
        })
        .catch(handleGetFlowError(navigate, 'login', () => dispatch(resetLoginFlow())));
      return;
    }

    // Otherwise we initialize it
    oryClient
      .initializeSelfServiceLoginFlowForBrowsers(
        Boolean(refresh),
        aal ? String(aal) : undefined,
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        dispatch(setLoginFlow(data));
      })
      .catch(handleFlowError(navigate, 'login', () => dispatch(resetLoginFlow())));
  }, [flowId, aal, refresh, returnTo, flow]);

  const title = flow?.refresh
    ? 'Confirm Action'
    : flow?.requested_aal === 'aal2'
    ? 'Two-Factor Authentication'
    : 'Login';

  return (
    <>
      <Flow
        onSubmit={(values: SubmitSelfServiceLoginFlowBody) => {
          dispatch(login(navigate, values));
        }}
        flow={flow}
      />
    </>
  );
};
