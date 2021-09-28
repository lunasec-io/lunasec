
---
id: "frontend-config"
title: "Frontend Configuration"
sidebar_label: "Frontend Configuration"
sidebar_position: 4
---
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

Now we can use LunaSecs components.  [Next we'll create a Secure Form.](/pages/getting-started/dedicated-tokenizer/securing-text)

