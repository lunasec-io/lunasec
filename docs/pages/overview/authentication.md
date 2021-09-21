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

LunaSec needs access to your user's session to make sure they have permission to read and write tokens.

There are two main ways for your app to handle session management:
1. Your app creates the session and LunaSec trusts it (most existing web applications).
2. The session is created and managed by a specialized service like an Auth Proxy.  This is typically a bit more complex but
much more secure.

LunaSec supports both of these schemes.

## 1. User Provided Session
If your application server is creating sessions, the `@lunasec/node-sdk` can read your session information and use it to
create cookie on the domain of the Secure Frame (where the iFrame and Dedicated Tokenizer live). To do this it follows what is
essentially an oAuth flow, where a request is redirected to Dedicated Tokenizer, which sets a session cookie for the Dedicated Tokenizer's domain.

When you configure `@lunasec/node-sdk`, you pass it a callback that can retrieve the users sessionId from a request. 
That way, LunaSec can quickly be set up to work with any authentication scheme, whether it is cookie, header, api key based.  

Here is an example implementation of this callback where `req.user` contains the authenticated user to the application:
```typescript
export const lunaSec = new LunaSec({
  // ...
  auth: {
    // ...
    sessionIdProvider: (req: Request) => {
      if (req.user !== undefined) {
        return req.user.id;
      }
      return null;
    },
    // ...
  },
});
```

## 2. Auth Proxy
In this scheme, an authentication proxy like [ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/) takes care of the session. 
This is more secure and allows us to offer the strongest guarantees around protecting your data, even if your server is compromised. 

Enterprises often use a scheme like this.  LunaSec can be adapted to work with different authentication providers.