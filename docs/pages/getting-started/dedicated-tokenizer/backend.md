---
id: "backend"
title: "Backend Configuration"
sidebar_label: "Backend Setup"
---

# Node Setup
First, initialize the NodeSDK.  We recommend doing this once and exporting it from a module, since you might want to use the
SDK from multiple places.

### Configuration
```typescript
import { LunaSec } from '@lunasec/node-sdk
const lunaSec = new LunaSec({
  secureFrameURL: process.env.SECURE_FRAME_URL,
  auth: {
    secrets: { source: 'environment' },
    payloadClaims: [],
    // Provide a small middleware that takes in the req object and returns a promise containing a session ID
    // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
    sessionIdProvider: readSessionFromRequest,
  },
});
```
TODO: provide extended information on full set of options, probably by linking to typedoc.

Now the SDK is configured and you have access to its modules, like the auth plugin: 
### Registering the auth plugin with express
If you want to use your own session management, register the auth plugin with express. This will transfer the session information
onto the domain that the Dedicated Tokenizer will run on.
```typescript
// Attach the LunaSec authentication plugin
lunaSec.expressAuthPlugin.register(app);
```
See the [authentication](../../overview/authentication.md) page to understand when and why you need to register this auth plugin.

### Checking Grants
Grants limit what sessions are allowed to read a specific token (Read Grants) and also ensures that the session who sent 
a token to the server is the same session that created it (Store Grants).  Your server needs to grant every token being sent to the browser
and check every token that is coming in. 




This can also be done manually in a request handler with the grant service:
```typescript
// Check if its safe to store a token, throws if there is an issue
lunasec.grants.verify('session123', 'token123', 'StoreToken')
// Create a grant for the browser to read a token.  The default expiration time is 15 minutes
lunasec.grants.create('session123', 'token123', 'ReadToken')
```

