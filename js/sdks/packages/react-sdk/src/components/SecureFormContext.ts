import React from 'react';

import { SecureInput } from './SecureInput';

export type SecureFormContextProps = {
  addComponent: (component: SecureInput) => void;
  readonly removeComponent: (frameId: string) => void;
};

// Note: The "default functions" here are only used by components that *don't* have a Provider in the component chain.
// Everything won't work _anyway_ if somebody does that, so we're OK not to. :pray:
// We redefine these functions in the SecureForm to set the state there
export const SecureFormContext = React.createContext<SecureFormContextProps>({
  addComponent: (component: SecureInput) => {
    console.log('Forwarded component:', component);
  },
  removeComponent: (frameId: string) => console.log('Removed component:', frameId),
});
