---
id: "backend"
title: "Backend Configuration"
sidebar_label: "Backend Setup"
sidebar_position: 2
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
# Node Setup
First, initialize LunaSec's NodeSDK.  We recommend doing this once and exporting it from a module, since you might want to use the
SDK from multiple places.

Install the module:
```shell
yarn add @lunasec/node-sdk
```
### Configuration
Here's an example configuration, below we will explain what the values mean:  
```typescript
import { LunaSec } from '@lunasec/node-sdk'
export const lunaSec = new LunaSec({
    tokenizerURL: process.env.TOKENIZER_URL, // This is the domain of the Tokenizer Backend
    auth: {
        secrets: { source: 'environment' }, // Reads base64 encoded RSA key from LUNASEC_SIGNING_KEY
        // Provide a small middleware that knows how to read the req object and return a promise containing a session id
        // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
        // and to bootstrap a session if you are using the express-auth-plugin
        sessionIdProvider: lunaSecSessionIdProvider,
    },
});
```

#### Session ID Provider
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
#### Secret Signing Key
When we set up the LunaSec Node SDK, we pass a private key that LunaSec uses to establish trust with your app.

If the `environment` secret provider is used (as shown above), the `LUNASEC_SIGNING_KEY` environment
variable must be set with a valid RSA key, base64 encoded. 

Here is an example of how you would generate a secret key to use for this on arch linux:
```shell
ssh-keygen -t rsa -f lunasec_signing_key
cat lunasec_signing_key | base64 -w0
```

LunaSec also supports passing a secret key directly or reading one from AWS Secrets manager.
For instructions, see [the secret provider page](/pages/deployment/secret-providers) of the deployment documentation.

:::tip
To see full documentation of the configuration, see the [config's typedoc](/pages/node-sdk/interfaces/LunaSecConfig/).  To 
see commented typedoc for everything this class exposes, see the [typedoc for the class](/pages/node-sdk/classes/LunaSec/).
:::

Now the SDK is configured and you have access to its modules, like the auth plugin: 

### Registering the auth plugin with express


If you want to use your own session management or use a tool like Passport, register the auth plugin with express. This will transfer the session information
onto the domain that the Dedicated Tokenizer will run on.

```typescript
// Attach the LunaSec authentication plugin
lunaSec.expressAuthPlugin.register(app);
```

:::info
See the [authentication page](../../overview/authentication.md) for more information on when to use this plugin and how it works.
:::

### Checking Grants

Grants connect a user's session to a token for a short time. Grants limit what sessions are allowed to read a specific token.  Your server needs to grant every token being sent to the browser
and check every token that is coming in. 

If you're using GraphQL instead of Express, this is even easier with [the graphql plugin.](./apollo-graphql.md)

Let's say we have a LunaSec Token representing a Social Security Number:
```typescript
app.get('/get-ssn', async (req, res) => {
    const ssnToken = req.user.ssn_token
    
    await lunaSec.grants.create(req.session.id, ssnToken, '15m'); // Make a grant, optionally overriding the default expiration time
    
    res.json({
      success: true,
      ssnToken,
    });
  });
```
Grants also ensure that tokens sent up to the server are "granted" to the user and can be safely stored in the database.  Otherwise , 
if an attacker got ahold of tokens that weren't theirs, they could upload them using the below route and then fetch them using the `/get-ssn` route above and read them.

This is how we verify the user has permission to store the grant back into the database.
When new tokens are created by the frontend, a grant will have been created automatically.  

```typescript
app.post('/set-ssn', async (req, res) => {
    await lunaSec.grants.verify(req.session.id, req.body.ssn_token); // Checks this user has a grant for the token. 
    await models.user.setSsn(req.user.id, req.body.ssn_token); // Stores the ssn_token in the database
    
    return res.json({
      success: true,
    });
});
```
:::caution Warning
Do _not_ forget to verify incoming tokens. It is critical to have this on _every_ incoming token in order to keep your data secure, as a single unchecked token
could create an "oracle" for an attacker to read any token they can intercept. There will be no warning or error if you forget.

Other systems of permission management without this concern are currently in development.
:::
### Error Handling
Both of the methods `grants.create()` and `grants.verify()` can and will throw a `LunaSecError`, so be sure to catch and handle errors appropriately.  

```typescript
app.get('/get-ssn', async (req, res) => {
    try {
        await lunaSec.grants.create(req.session.id, req.body.ssn_token); // Make a grant 

        res.json({
            success: true,
            ssnToken,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            error: e
        })
        
    }    
  });
```

Since you will be using these methods often, you probably want to simply let them throw(or call `next(e)`) and catch in your global error handler:

```typescript
app.use((err, req, res, next) => {
    // LunaSec libraries should always throw an instance of LunaSecError in normal operation
    // so you can easily check if the error was created by LunaSec
    if (err instanceof LunaSecError){ 
        res.status(err.code).json({
            success: false,
            error: err
        })
    }
    // ...handle other errors...
})
```

That's it for the backend, let's move onto [the frontend.](./frontend-config.md)