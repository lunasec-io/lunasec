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
export const lunaSec = new LunaSec({
    secureFrameURL: process.env.SECURE_FRAME_URL, // This is the domain to access the Tokenizer Backend
    auth: {
        secrets: { source: 'environment' },
        payloadClaims: [],
        // pluginBaseUrl: '/api', This prepends the .lunasec routes with any string you wish

        // Provide a small middleware that takes in the req object and returns a promise containing a session token
        // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
        // and to bootstrap a session if you are using the express-auth-plugin
        sessionIdProvider: lunaSecSessionIdProvider,
    },
});
```
The session ID provider callback might look like this:
```typescript
export function lunaSecSessionIdProvider(req: Request): Promise<string | null> {
  // LunaSec expects this to return a promise in case we need to do something async
  return new Promise((resolve) => {
    if (req.session.id) {
      return resolve(req.session.id);
    }
    return resolve(null); // Tells LunaSec there is no session.  LunaSec Elements will not work in this case
  });
}
```

TODO: provide extended information on full set of options, probably by linking to typedoc.

Now the SDK is configured and you have access to its modules, like the auth plugin: 
### Registering the auth plugin with express
If you want to use your own session management or use a tool like Passport, register the auth plugin with express. This will transfer the session information
onto the domain that the Dedicated Tokenizer will run on.
```typescript
// Attach the LunaSec authentication plugin
lunaSec.expressAuthPlugin.register(app);
```
See the [authentication](../../overview/authentication.md) page to understand when and why you need to register this auth plugin.

### Checking Grants
Grants connect a user's session to a token for a short time. Grants limit what sessions are allowed to read a specific token.  Your server needs to grant every token being sent to the browser
and check every token that is coming in. 

Let's say we have a LunaSec Token representing a Social Security Number:
```typescript
app.get('/get-ssn', async (req, res) => {
    const ssnToken = req.user.ssn_token

    await lunaSec.grants.create(req.session.id, ssnToken); // Make a grant 
    
    res.json({
      success: true,
      ssnToken,
    });
  });
```
Grants also ensure that tokens sent up to the server are "granted" to the user and can be safely stored in the database.  Otherwise , 
if an attacker got ahold of tokens that weren't theirs, they could upload them using the below route and then fetch them using the `/get-ssn` route above and read them.

This is how we verify the user has permission to store the grant back into the database, 
When new tokens are created on the frontend, a grant will be created automatically.

```typescript
app.post('/set-ssn', async (req, res) => {
    await lunaSec.grants.verify(req.session.id, req.body.ssn_token); // Checks this user has a grant for the token. 
    await models.user.setSsn(req.user.id, req.body.ssn_token); // Stores the ssn_token in the database
    
    return res.json({
      success: true,
    });
});
```

Do _not_ forget this step.  It is critical to have this on _every_ incoming token in order to keep your data secure, as a single unchecked token
could create an "oracle" for an attacker to read any token they can intercept.  Other systems of permission management without this concern are currently in development.

Both of the methods `grants.create()` and `grants.verify()` can and will throw, so be sure to catch and handle errors appropriately.  