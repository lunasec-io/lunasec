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
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';
import { selectConfirmedUnauthenticated } from '../../store/slices/authentication';
import { FCWithChildren } from '../../types/common-prop-types';

export const RouteGuard: FCWithChildren = (props) => {
  const confirmedNotAuthenticed = useAppSelector(selectConfirmedUnauthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (confirmedNotAuthenticed) {
      console.warn('Detected use not logged in, redirecting to login page and saving URL for redirect back afterwards');

      // navigate to the login screen, saving the current url as a redirect that kratos will pick up after login
      navigate(`/?return_to=${encodeURIComponent(window.location.href)}`);
      // Trying to load a page designed for a logged in user without one often causes async errors and reloading fixes it..Seems ok in this case
      window.location.reload();
    }
  }, [confirmedNotAuthenticed]);

  return <>{props.children}</>;
};
