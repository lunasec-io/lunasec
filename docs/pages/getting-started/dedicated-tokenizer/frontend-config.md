---
id: "frontend-config"
title: "Frontend Configuration"
sidebar_label: "Frontend Configuration"
sidebar_position: 4
---
<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
# React Frontend Setup

The LunaSec frontend library `@lunasec/react-sdk` comes with a collection of components that create iFrames under the hood and handle tokenization.

### Configuration
The Secure Components get their configuration from the `<LunaSecConfigContext.Provider>`, which is typically placed somewhere near the root 
of your component tree.  Components rendered outside the provider won't work.

```tsx
import { LunaSecConfigContext } from '@lunasec/react-sdk';

export const MyApp = () => {

  return (
    <LunaSecConfigContext.Provider
      value={{
        // This is the domain the LunaSec Tokenizer backend is hosted on, which will be different in prod vs dev
        lunaSecDomain: process.env.LUNASEC_DOMAIN || 'http://localhost:37766',
        authenticationErrorHandler: (e: Error) => {
            // You may wish to render some error UI or perform an action like page refresh if LunaSec fails to authenticate
          setAuthError('Failed to authenticate with LunaSec. \n Is a user logged in?');
        },
      }}
    >
        <App/>
    </LunaSecConfigContext.Provider>
  );
};
```

Now we can use LunaSecs components.  [Next we'll create a Secure Form.](./securing-text.md)

