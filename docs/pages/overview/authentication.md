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
---
id: "authentication"
title: "Authentication"
sidebar_label: "Authentication"
sidebar_position: 5
---

# Authentication and Session Management

LunaSec needs access to your user's session to make sure they have permission to read and write tokens.  When permission has been
given to a certain user to use a token, we say that the token is `granted`.  The Dedicated Tokenizer keeps a record of the short-lived 
`grants` that have been created by your application.

There are two main ways for LunaSec :
1. Your app creates the session and LunaSec trusts it (most existing web applications).
2. The session is created and managed by a specialized service like an Auth Proxy.

LunaSec supports both of these schemes.

## 1. Application Provided Session
If your application server is creating sessions, the `@lunasec/node-sdk` can read your session information and use it to
create cookie on the domain of the Secure Frame (where the iFrame and Dedicated Tokenizer live). To do this it follows what is
essentially an oAuth flow where your backend is the authentication provider. A request is made from our library in the browser to
the Dedicated Tokenizer, 
which redirects to your app to get the session information and then sets a session cookie on the Dedicated Tokenizer's domain.  

When you configure `@lunasec/node-sdk`, you pass it a callback that can retrieve the users sessionId from a request. 
That way, LunaSec can quickly be set up to work with any authentication scheme, whether it is cookie, header, api key based.  

Here is an example implementation of this callback where a previous middleware (express-session in this case) has already attached
a session object to the request.
```typescript
export const lunaSec = new LunaSec({
  // ...
  auth: {
    // ...
    sessionIdProvider: (req: Request) => {
      if (req.user !== undefined) {
        return req.session.id;
      }
      return null; // LunaSec elements will fail in this case
    },
    // ...
  },
});
```
LunaSec elements will fail to load on a page where a session isn't available. If you'd like to use secure elements without a logged-in user,
like as part of a signup flow, you may wish to create a temporary session or otherwise provide
some kind of unique token in this callback so that LunaSec can continue to work. 

## 2. Auth Proxy
In this scheme, an authentication proxy like [ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/) takes care of the session.
This is typically a bit more complex as infrastructure but
much more secure. It gives the strongest guarantees around protecting your data, even if your server is compromised. 

Enterprises often use a scheme like this.  LunaSec can be adapted to work with different authentication providers.

:::tip
LunaSec recommends all users adopt this scheme when possible.  It is more secure against attacks that compromise your backend.  LunaSec to load and work more quickly and reliably in the frontend because it is not doing any session management redirects.
:::