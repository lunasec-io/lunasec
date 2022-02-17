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
import { SelfServiceRegistrationFlow, SubmitSelfServiceRegistrationFlowBody } from '@ory/kratos-client';
import { CardTitle } from '@ory/themes';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Flow } from '../../components/auth';
import { ActionCard, CenterLink, Head, MarginCard } from '../../components/auth/Common';
import { useAuth } from '../../hooks/useAuth';
import { handleFlowError } from '../../utils/handleGetFlowError';
import ory from '../../utils/sdk';

// Renders the registration page
export const Registration = () => {
  const auth = useAuth();

  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const navigate = useNavigate();

  // The "flow" represents a registration process and contains
  // information about the form we need to render (e.g. username + password)
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>();

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
      ory
        .getSelfServiceRegistrationFlow(String(flowId))
        .then(({ data }) => {
          // We received the flow - let's use its data and render the form!
          setFlow(data);
        })
        .catch(handleFlowError(navigate, 'register', setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceRegistrationFlowForBrowsers(returnTo ? String(returnTo) : undefined)
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(navigate, 'register', setFlow));
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
            auth.signUp(flow, setFlow, values);
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
