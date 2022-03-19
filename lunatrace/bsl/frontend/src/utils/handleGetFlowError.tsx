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
import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router';

// A small function to help us deal with errors coming from fetching a flow.
export function handleGetFlowError<S>(
  navigate: NavigateFunction,
  flowType: 'login' | 'register' | 'settings' | 'recovery' | 'verification',
  resetFlow: () => void
) {
  return async (err: AxiosError) => {
    switch (err.response?.data.error?.id) {
      case 'session_aal2_required':
        // 2FA is enabled and enforced, but user did not perform 2fa yet!
        window.location.href = err.response?.data.redirect_browser_to;
        return;
      case 'session_already_available':
        // User is already signed in, let's redirect them home!
        navigate('/');
        return;
      case 'session_refresh_required':
        // We need to re-authenticate to perform this action
        window.location.href = err.response?.data.redirect_browser_to;
        return;
      case 'self_service_flow_return_to_forbidden':
        // The flow expired, let's request a new one.
        console.error('The return_to address is not allowed.');
        resetFlow();
        navigate('/account/' + flowType);
        return;
      case 'self_service_flow_expired':
        // The flow expired, let's request a new one.
        console.error('Your interaction expired, please fill out the form again.');
        resetFlow();
        navigate('/account/' + flowType);
        return;
      case 'security_csrf_violation':
        // A CSRF violation occurred. Best to just refresh the flow!
        console.error('A security violation was detected, please fill out the form again.');
        resetFlow();
        navigate('/account/' + flowType);
        return;
      case 'security_identity_mismatch':
        // The requested item was intended for someone else. Let's request a new flow...
        resetFlow();
        navigate('/account/' + flowType);
        return;
      case 'browser_location_change_required':
        // Ory Kratos asked us to point the user to this URL.
        window.location.href = err.response.data.redirect_browser_to;
        return;
    }

    switch (err.response?.status) {
      case 410:
        // The flow expired, let's request a new one.
        resetFlow();
        navigate('/' + flowType);
        return;
    }

    // We are not able to handle the error? Return it.
    return Promise.reject(err);
  };
}

// A small function to help us deal with errors coming from initializing a flow.
export const handleFlowError = handleGetFlowError;
