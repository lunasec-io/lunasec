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
import React from 'react';

import { LAYOUT } from '../constants';
import useSettingsState from '../hooks/useSettingsState';

const initialState = {
  layout: LAYOUT.FLUID,
  setLayout: (_a: string) => {
    return;
  },
};

const LayoutContext = React.createContext(initialState);

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useSettingsState('layout', LAYOUT.FLUID);

  return (
    <LayoutContext.Provider
      value={{
        layout,
        setLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export { LayoutProvider, LayoutContext };
