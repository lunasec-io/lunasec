import React from 'react';

export interface LunaSecConfigContextProps {
  backendURL: string;
}

// We throw in wrapComponent if this gets left empty like this
export const LunaSecConfigContext = React.createContext<LunaSecConfigContextProps>({
  backendURL: '',
});

export type LunaSecConfigContextType = React.ContextType<typeof LunaSecConfigContext>;
