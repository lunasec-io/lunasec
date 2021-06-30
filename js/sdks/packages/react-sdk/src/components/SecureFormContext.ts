import React from 'react';

export interface SecureFormContextProps {
  addTokenCommitCallback: (frameId: string, cb: () => Promise<void>) => void;
  removeTokenCommitCallback: (frameId: string) => void;
  submit: () => void;
}

// Note: The "default functions" here are only used by components that *don't* have a Provider in the component chain.
// Everything won't work _anyway_ if somebody does that, so we're OK not to. :pray:
// We redefine these functions in the SecureForm to set the state there
export const SecureFormContext = React.createContext<SecureFormContextProps>({
  addTokenCommitCallback: () => {
    console.debug('called the token commit provider outside of context, element must be outside of form');
  },
  removeTokenCommitCallback: () => {
    console.debug('called the token commit provider outside of context, element must be outside of form');
  },
  submit: () => {
    console.debug('called the submit provider out of context, element must be outside of form');
  },
});
