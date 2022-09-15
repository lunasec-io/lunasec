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
import { GetSidebarInfoQuery } from '../api/generated';
import { SIDEBAR_BEHAVIOR, SIDEBAR_POSITION } from '../constants';
import useAppSelector from '../hooks/useAppSelector';
import useSettingsState from '../hooks/useSettingsState';
import { selectKratosId } from '../store/slices/authentication';

interface SidebarContextType {
  isOpen: boolean;
  position: string;
  behavior: string;
  setIsOpen: (_a: boolean) => void;
  setPosition: (_a: string) => void;
  setBehavior: (_a: string) => void;
  sidebarData: GetSidebarInfoQuery | undefined;
  sidebarIsLoaded: boolean;
}

const initialState: SidebarContextType = {
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
  sidebarData: undefined,
  sidebarIsLoaded: false,
};

const SidebarContext = React.createContext(initialState);

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 992);
  const [position, setPosition] = useSettingsState('sidebarPosition', SIDEBAR_POSITION.LEFT);
  const [behavior, setBehavior] = useSettingsState('sidebarBehavior', SIDEBAR_BEHAVIOR.STICKY);

  const kratosId = useAppSelector(selectKratosId);
  const [trigger, result] = api.useLazyGetSidebarInfoQuery();
  const { data, isLoading } = result;

  useEffect(() => {
    if (kratosId) {
      void trigger({
        kratos_id: kratosId,
      });
    }
  }, [kratosId]);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        position,
        setPosition,
        behavior,
        setBehavior,
        sidebarData: data,
        sidebarIsLoaded: !isLoading && data !== undefined,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarProvider, SidebarContext };
