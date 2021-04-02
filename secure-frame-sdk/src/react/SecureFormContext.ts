import React, {RefObject} from 'react';

export interface SecureFormContextProps {
  addComponentRef: (ref: RefObject<HTMLIFrameElement>, frameId: string, name: string) => void;
  removeComponentRef: (frameId: string) => void;
}

// Note: The "default value" here is only used by components that *don't* have a Provider in the component chain.
// Everything won't work _anyway_ if somebody does that, so we're OK not to. :pray:
export const SecureFormContext = React.createContext<SecureFormContextProps>({
  addComponentRef: (ref, frameId, name) => {
    console.log('Forwarded ref:', ref, frameId, name);
  },
  removeComponentRef: frameId => console.log('Removed component:', frameId)
})
