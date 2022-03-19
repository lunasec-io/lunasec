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
import { SubmitSelfServiceRegistrationFlowBody } from '@ory/kratos-client';
import { CardTitle } from '@ory/themes';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Flow } from '../../components/auth';
import { ActionCard, CenterLink, Head, MarginCard } from '../../components/auth/Common';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { register, resetRegisterFlow, selectRegisterFlow, setRegisterFlow } from '../../store/slices/authentication';
import { handleFlowError } from '../../utils/handleGetFlowError';
import oryClient from '../../utils/ory-client';

// Renders the registration page
export const Registration = () => {
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectRegisterFlow);

  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const navigate = useNavigate();

  // Get ?flow=... from the URL
  const flowId = searchParams.get('flow');
  const returnTo = searchParams.get('return_to');

  // In this effect we either initiate a new registration flow, or we fetch an existing registration flow.
  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      oryClient
        .getSelfServiceRegistrationFlow(String(flowId))
        .then(({ data }) => {
          // We received the flow - let's use its data and render the form!
          dispatch(setRegisterFlow(data));
        })
        .catch(handleFlowError(navigate, 'register', () => dispatch(resetRegisterFlow())));
      return;
    }

    // Otherwise we initialize it
    oryClient
      .initializeSelfServiceRegistrationFlowForBrowsers(returnTo ? String(returnTo) : undefined)
      .then(({ data }) => {
        dispatch(setRegisterFlow(data));
      })
      .catch(handleFlowError(navigate, 'register', () => dispatch(resetRegisterFlow())));
  }, [flowId, returnTo, flow]);

  return (
    <>
      <Head>
        <title>Create account</title>
      </Head>
      <MarginCard>
        <CardTitle>Create account</CardTitle>
        <Flow
          onSubmit={(values: SubmitSelfServiceRegistrationFlowBody) => {
            dispatch(register(navigate, values));
          }}
          flow={flow}
        />
      </MarginCard>
      <ActionCard>
        <CenterLink data-testid="cta-link" href="/account/login">
          Sign in
        </CenterLink>
      </ActionCard>
    </>
  );
};
