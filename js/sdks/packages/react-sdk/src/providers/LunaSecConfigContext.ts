import React from 'react';

export interface LunaSecConfigContextProps {
  lunaSecDomain: string;
  authenticationErrorHandler: (e: Error) => void;
}

// We throw in wrapComponent if this gets left empty like this
export const LunaSecConfigContext = React.createContext<LunaSecConfigContextProps>({
  lunaSecDomain: '',
  authenticationErrorHandler: (e) => {
    throw e;
  },
});

export type LunaSecConfigContextType = React.ContextType<typeof LunaSecConfigContext>;
