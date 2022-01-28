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
/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { useState } from 'react';

import { SIDEBAR_BEHAVIOR, SIDEBAR_POSITION } from '../constants';
import useSettingsState from '../hooks/useSettingsState';

const initialState = {
  isOpen: true,
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
  const [isOpen, setIsOpen] = useState(true);
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
