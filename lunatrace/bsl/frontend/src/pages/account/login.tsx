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
import { SelfServiceLoginFlow, SubmitSelfServiceLoginFlowBody } from '@ory/kratos-client';
import { CardTitle } from '@ory/themes';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Flow } from '../../components/auth';
import { ActionCard, CenterLink, Head, Link, MarginCard } from '../../components/auth/Common';
import { createLogoutHandler } from '../../hooks/createLogoutHandler';
import { handleFlowError, handleGetFlowError } from '../../utils/handleGetFlowError';
import ory from '../../utils/sdk';

const Login = () => {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>();

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

  // This might be confusing, but we want to show the user an option
  // to sign out if they are performing two-factor authentication!
  const onLogout = createLogoutHandler([aal, refresh]);

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(handleGetFlowError(navigate, 'login', setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceLoginFlowForBrowsers(
        Boolean(refresh),
        aal ? String(aal) : undefined,
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(navigate, 'login', setFlow));
  }, [flowId, aal, refresh, returnTo, flow]);

  const onSubmit = (values: SubmitSelfServiceLoginFlowBody) => {
    // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
    // his data when she/he reloads the page.
    navigate(`/login?flow=${flow?.id}`, { replace: true });
    ory
      .submitSelfServiceLoginFlow(String(flow?.id), undefined, values)
      // We logged in successfully! Let's bring the user home.
      .then((res) => {
        if (flow?.return_to) {
          window.location.href = flow?.return_to;
          return;
        }
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

  const title = flow?.refresh
    ? 'Confirm Action'
    : flow?.requested_aal === 'aal2'
    ? 'Two-Factor Authentication'
    : 'Sign In';

  return (
    <>
      <Head>
        <title>Sign in - Ory NextJS Integration Example</title>
        <meta name="description" content="NextJS + React + Vercel + Ory" />
      </Head>
      <MarginCard>
        <CardTitle>{title}</CardTitle>
        <Flow onSubmit={onSubmit} flow={flow} />
      </MarginCard>
      {aal || refresh ? (
        <ActionCard>
          <CenterLink onClick={onLogout}>Log out</CenterLink>
        </ActionCard>
      ) : (
        <>
          <ActionCard>
            <Link href="/account/register">Create account</Link>
          </ActionCard>
          <ActionCard>
            <Link href="/account/recovery">Recover your account</Link>
          </ActionCard>
        </>
      )}
    </>
  );
};

export default Login;
