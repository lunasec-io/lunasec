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
import React, { useEffect, useState } from 'react';

import api from '../api';
import useAppSelector from '../hooks/useAppSelector';
import { selectIsAuthenticated } from '../store/slices/authentication';
import { userHasAnyOrganizations } from '../utils/organizations';

const defaultState = false;

const WizardOpenContext = React.createContext(defaultState);

function WizardOpenProvider({ children }: { children: React.ReactNode }) {
  const [trigger, result, lastPromiseInfo] = api.useLazyGetSidebarInfoQuery();
  const { data } = result;

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      void trigger();
    }
  }, [isAuthenticated]);

  const wizardOpen = isAuthenticated && !userHasAnyOrganizations(data);

  return <WizardOpenContext.Provider value={wizardOpen}>{children}</WizardOpenContext.Provider>;
}

export { WizardOpenContext, WizardOpenProvider };
