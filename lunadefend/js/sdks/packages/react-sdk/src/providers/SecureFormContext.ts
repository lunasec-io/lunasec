/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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

export type SecureFormContextType = React.ContextType<typeof SecureFormContext>;
