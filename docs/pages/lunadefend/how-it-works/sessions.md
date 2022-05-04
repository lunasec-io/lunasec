---
id: "sessions"
title: "LunaDefend's Session"
sidebar_label: "Sessions"
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

Cookies (or any other session data) in the web browser are scoped to a specific domain. 
Because LunaDefend's front-end components [run in a separate domain](/pages/lunadefend/how-it-works/secure-components), they don't have access to the session data from your main site. 

### Why does LunaDefend need to know about sessions?

LunaDefend ties token permissions to sessions through short-lived [Grants](/pages/lunadefend/how-it-works/grants). 
This makes it harder for an attacker to decode sensitive data, even if they manage to steal a token.

### Methods of Bootstrapping Sessions

There are two main ways your application can handle authentication:
1. Your app creates the session and LunaDefend trusts it,
2. The session is created and managed by a specialized service like an Auth Proxy (Still in development).

LunaDefend supports both of these schemes.

## 1. Application Provided Session

### How it works

If your application server is creating sessions, the `@lunasec/node-sdk` can read your session information and use it to
create a cookie on the domain of the Secure Frame (where the iFrame and Dedicated Tokenizer live). To do this, it follows what is
essentially an [OAuth](https://en.wikipedia.org/wiki/OAuth) flow where your backend is the authentication provider. 
A request is made from our library in the browser to our plugin in your backend,
which redirects the browser to the Dedicated Tokenizer service, which finally creates a session for LunaDefend.  This all happens 
automatically as long as you have registered the `express-auth-plugin` in your server as explained in the [Getting Started guide](/pages/lunadefend/getting-started/dedicated-tokenizer/backend-setup).

1. Once the `Tokenizer` starts, it requests the provided `/.lunasec/jwks.json` endpoint in `Application Backend`
   (automatically registered to the backend with the `express-auth-plugin`)
2. Every time a page containing a LunaDefend component is loaded the authentication flow is started.
   The `LunaDefend SDK` on the frontend will start an auth redirection flow by requesting the `Tokenizer`.
3. The `Tokenizer` redirects the `Application Fronted` to the `/.lunasec/secure-frame` endpoint in `Application Backend`
   which will read the session registered on the `Application Backend` domain and then create a signed JWT containing
   a session identifier.
4. The `Application Backend` will redirect the request back to the `Tokenizer` where it will verify the signature of the
   signed JWT and then set it as a cookie on the `Tokenizer` domain. The identity associated with any subsequent calls
   to the `Tokenizer` is the identity contained in the signed JWT set as the cookie.

![diagram of auth flow](/img/auth-flow-diagram.svg)

### Session ID Provider 
When you configure `@lunasec/node-sdk`, you pass it a callback that can retrieve the user's sessionId from a request. 
That way, LunaDefend can quickly be set up to work with any authentication scheme, whether it is cookie, header, or API key based.  

Here is an example implementation of this callback where a previous middleware (`express-session` in this case) has already attached
a session object to the request as `req.user`.

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

**LunaDefend Secure Components will fail to load on a page where a session isn't available.**

If you'd like to use secure elements without a logged-in user,
like as part of a signup flow, you may wish to create a temporary session or otherwise provide
some kind of unique token in this callback so that LunaDefend can continue to work. Just be careful if you go this route,
and feel free to message our team if you'd like a hand verifying your approach. We've seen it done properly for some
deployments, but it's nuanced.

:::note
In the [Live Demo app](https://app.lunasec.dev/), after you create an account and login, you can see this session
creation process in action with the requests to `/session/ensure` and `/session/verify`. Those requests gather the identity 
of the user before any tokenization or detokenization takes place.
:::

## 2. Auth Proxy
:::info Still in Development
Support for third-party auth proxies is still in development.  It is one of the next features on the roadmap and will be
supported soon. 
:::

In this scheme, an authentication proxy like [ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/) takes care of the session.
This is typically a bit more complex as infrastructure but
much more secure. It gives the strongest guarantees around protecting your data, even if your server is compromised. LunaDefend can also load faster 
when session management has already been taken care of.

Enterprises often use a scheme like this.  LunaDefend can be adapted to work with different authentication providers.

### Authentication is not enough

Gathering the session information tells us _who_ is logged in, but it doesn't tell us _what_ Tokens they're allowed to
Detokenize. If we skipped the "what can you detokenize?" step, we would still enable an attacker to Detokenize the value
of any Token that they have access to.

In order to prevent this, we have to add an _Authorization_ check too. With LunaDefend, we rely on a system called
_Authorization Grants_ that work in conjunction with sessions to properly verify Detokenization requests are legitimate.



<!---
:::tip
LunaDefend recommends all users adopt this scheme when possible.  It is more secure against attacks that compromise your 
backend. It also allows LunaDefend to load and work more quickly and reliably, on the frontend, because it is not doing 
any session management redirects. That's especially important for users with slow internet connections.
:::
--->
