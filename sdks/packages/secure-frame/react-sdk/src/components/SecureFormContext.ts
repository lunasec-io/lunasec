import React, { RefObject } from 'react';

export type SecureFormContextProps = {
  addComponentRef: (
    ref: RefObject<HTMLIFrameElement>,
    inputRef: RefObject<HTMLInputElement>,
    frameId: string,
    name: string
  ) => void;
  readonly removeComponentRef: (frameId: string) => void;
};

// Note: The "default functions" here are only used by components that *don't* have a Provider in the component chain.
// Everything won't work _anyway_ if somebody does that, so we're OK not to. :pray:
// We redefine these functions in the SecureForm to set the state there
export const SecureFormContext = React.createContext<SecureFormContextProps>({
  addComponentRef: (ref, frameId, name) => {
    console.log('Forwarded ref:', ref, frameId, name);
  },
  removeComponentRef: (frameId) => console.log('Removed component:', frameId),
});
