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
import React, { useState } from 'react';

import { SIDEBAR_BEHAVIOR, SIDEBAR_POSITION } from '../constants';
import useSettingsState from '../hooks/useSettingsState';

const initialState = {
  isOpen: false,
  position: SIDEBAR_POSITION.LEFT,
  behavior: SIDEBAR_BEHAVIOR.STICKY,
  setIsOpen: (_a: boolean) => {
    return;
  },
  setPosition: (_a: string) => {
    return;
  },
  setBehavior: (_a: string) => {
    return;
  },
};

const SidebarContext = React.createContext(initialState);

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 992);
  const [position, setPosition] = useSettingsState('sidebarPosition', SIDEBAR_POSITION.LEFT);
  const [behavior, setBehavior] = useSettingsState('sidebarBehavior', SIDEBAR_BEHAVIOR.STICKY);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        position,
        setPosition,
        behavior,
        setBehavior,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarProvider, SidebarContext };
