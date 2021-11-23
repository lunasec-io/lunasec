---
id: "authentication"
title: "Creating a LunaSec Session"
sidebar_label: "Authentication"
sidebar_position: 5
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
LunaSec makes it really, really hard for your front-end application to leak sensitive data to somebody attacking it.
Even if somebody manages to hack your front-end website and inject their own malicious Javascript code into it, they 
aren't able to decrypt the sensitive data that your site displays. The only information that an attacker sees is an
opaque LunaSec Token.

But, while it's painful an attacker, it's actually very easy for you. You just swap out HTML elements like an `<input>` 
with the LunaSec equivalent `<SecureInput>`.

In order to power that simple API, and also provide strong security guarantees, we use multiple cross-origin domains
via `iframes` with `postMessage`. We circumvent issues with Authentication and Authorization by bootstrapping a session
off of your application's existing session to provide a "Grant" system that ensures that all requests to the Tokenizer
are properly authorized.

If that's confusing to you, then please continue reading this page. We're going to dive in and explain how LunaSec
Detokenization Grants work by first giving you context about why they're necessary in the first place.

Already up to speed on how cross-origin iframes works? Feel free to skip ahead to setting up 
[Sessions](#the-problems-with-two-domains) below.

### Adding Secure Elements to your Application

Starting with React code like this: 
```jsx title="normal-form.tsx"
import React from 'react';

export function renderInsecureComponent(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" value={props.value} onChange={props.onChange} name="ssn" />
      <input type="submit" />
    </form>
  );
}
```

You swap out elements dealing with sensitive data with drop-in replacements like this:
```tsx title="secure-form.tsx"
import React from 'react';
import {SecureForm, SecureInput} from '@lunasec/react-sdk';

// The returned output from SecureInput is now a token instead of the actual SSN.
// And, if a token is passed to this component, it will automatically be detokenized (or fail if the user is unauthorized).
export function renderSecureComponent(props) {
  return (
    <SecureForm onSubmit={props.onSubmit}>
      <SecureInput type="text" token={props.value} onChange={props.onChange} onError={props.onError} name="ssn" />
      <input type="submit" />
    </SecureForm>
  );
}
````

Now your application is protected against vulnerabilities like 
[Cross-Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) (XSS) automatically.

### What makes that more secure?

It's secure because it's LunaSec is now seamlessly inlining a second website into yours in the form of an embedded 
[iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe). This adds security by splitting your data 
across two entirely different websites, and your browser is very good at preventing websites from snooping on each other's data.

You might think: "Sure, cool, but doesn't that completely break my app?"

Yes, you're absolutely correct. Simply replacing an `<input>` element with an `<iframe>` would result in your `<form>` 
no longer functioning at all.

That's where LunaSec comes in. We've spent a _lot_ of time re-implementing the APIs of common HTML elements like 
`<input>` in our [Secure Components SDK](../getting-started/dedicated-tokenizer/frontend-config.md). Every element uses
an `<iframe>` internally and only ever exposes the non-sensitive [Token](./token-lifecycle.md) to your app. Every 
component is able to preserve CSS styling, lifecycle hooks like `onBlur`, and even perform validation on the data. It
all happens over `postMessage`, and it's designed to work 1:1 with existing apps to make migrating to LunaSec seamless.

### Why is splitting data across websites more secure?

LunaSec relies on the strong protections that web browsers use in order to isolate data on different websites. 
This functionality is known as the 
"[Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)" and it powers every
website on the internet. It's the functionality that prevents a random website from reading the data from another one
like, say, your bank or your email.

In order to activate the strong protections granted by the Same-Origin Policy, you need to have 2 separate websites with
2 different domains. Fortunately, subdomains count as 2 different domains, and that's what we'll use in our examples.

One domain runs your application (`app.your-domain.com`).

The other runs the LunaSec "Secure Frame" (`secure-frame.your-second-domain.com`).

Under the hood of the LunaSec React SDK, you're actually embedding LunaSec into your application via an `<iframe>`.
Your application is then only interacting with LunaSec via a cross-origin `postMessage` call. `postMessage` is a 
[secure API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) provided by your browser to make
cross-origin communication possible.

### The Problems with Two Domains

Alright, now that have a baseline to understand how LunaSec provides strong security guarantees on the front-end by
relying on an `<iframe>`, now we have to explain the problems that come with that approach.

Notably: If you login to `app.your-domain.com`, then you're not automatically logged in to `secure-frame.your-second-domain.com`!

That's because Cookies in the web browser are scoped to a specific domain. Your browser won't send your credentials to a
random other website thanks to the Same-Origin Policy.

You might think, "Well, isn't it fine if we're not logged in to the Secure Frame? We're logged in on our website already!"

Unfortunately, that's a huge can of _security worms_ to go down that route. There are many attacks that pop up, but the
simplest is: If an attacker gets their hands on a Token by exploiting a bug like an SQL Injection, then that attacker is
able to Detokenize any Token now because there is no way to authorize the Detokenization request. There are more problems,
but that's the most obvious one.

Without a session on the LunaSec domain, we are operating blindly, and we'd have to trust that every request is valid.
That undermines the entire purpose of the system! To fix this, we have to _bootstrap trust_ between the two domains.

### Tying both websites together via Sessions

In order for LunaSec to protect your information and prevent Tokens from being Detokenized by anybody, 
your application needs to forward certain information to allow LunaSec to tie back requests to the user signed in on
your website. This is a process that's basically just [OAuth](https://en.wikipedia.org/wiki/OAuth) between two domains, 
except we do it for every request. (Or, with our future Auth Proxy support, this will happen via signed JWTs.)

In the [Live Demo app](https://app.lunasec.dev/), after you create an account and login, you can see this session 
creation process in action with the requests to `/session/ensure` and `/session/verify`. Those requests go out _before_ 
the Detokenization process happens, and are responsible for gathering the identity of the currently authenticated user.

LunaSec verifies that a user has permission to read and write Tokens by requesting a user's _Session ID_ from your
application. When permission has been given to a certain user to operate on a Token, we say that the Token is `granted`. 
The Dedicated Tokenizer keeps a record of the short-lived `grants` that have been created.

When a Token is going to be _Detokenized_, your backend creates a _Detokenization Grant_ and passes the along to LunaSec.

When a plaintext value is going to _Tokenized_, the Tokenizer creates a _Token Store Grant_, stores it, and your
application _must_ verify that the _Token Store Grant_ is valid. (If it's not verified, it creates an attack oracle 
which is outside the scope of this document.)

### Methods of Bootstrapping Sessions

There are two main ways your application can handle authentication:
1. Your app creates the session and LunaSec trusts it,
2. The session is created and managed by a specialized service like an Auth Proxy (Still in development).

LunaSec supports both of these schemes.

## 1. Application Provided Session

### How it works

If your application server is creating sessions, the `@lunasec/node-sdk` can read your session information and use it to
create a cookie on the domain of the Secure Frame (where the iFrame and Dedicated Tokenizer live). To do this, it follows what is
essentially an [OAuth](https://en.wikipedia.org/wiki/OAuth) flow where your backend is the authentication provider. 
A request is made from our library in the browser to our plugin in your backend,
which redirects the browser to the Dedicated Tokenizer which creates a session for LunaSec.  This all happens automatically as long as you 
have registered the `express-auth-plugin` in your app.

![diagram of auth flow](/img/auth-flow-diagram.svg)

### Session ID Provider 
When you configure `@lunasec/node-sdk`, you pass it a callback that can retrieve the user's sessionId from a request. 
That way, LunaSec can quickly be set up to work with any authentication scheme, whether it is cookie, header, or API key based.  

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

**LunaSec Secure Components will fail to load on a page where a session isn't available.**

If you'd like to use secure elements without a logged-in user,
like as part of a signup flow, you may wish to create a temporary session or otherwise provide
some kind of unique token in this callback so that LunaSec can continue to work. Just be careful if you go this route,
and feel free to message our team if you'd like a hand verifying your approach. (We've seen it done properly for some
deployments, but it's nuanced and we're planning to document it better soon.)

## 2. Auth Proxy
:::info Still in Development
Support for third-party auth proxies is still in development.  It is one of the next features on the roadmap and will be
supported soon. 
:::

In this scheme, an authentication proxy like [ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/) takes care of the session.
This is typically a bit more complex as infrastructure but
much more secure. It gives the strongest guarantees around protecting your data, even if your server is compromised. LunaSec can also load faster 
when session management has already been taken care of.

Enterprises often use a scheme like this.  LunaSec can be adapted to work with different authentication providers.

### Authentication is not enough

Gathering the session information tells us _who_ is logged in, but it doesn't tell us _what_ Tokens they're allowed to
Detokenize. If we skipped the "what can you detokenize?" step, we would still enable an attacker to Detokenize the value
of any Token that they have access to.

In order to prevent this, we have to add an _Authorization_ check too. With LunaSec, we rely on a system called
_Authorization Grants_ that work in conjunction with sessions to properly verify Detokenization requests are legitimate.



<!---
:::tip
LunaSec recommends all users adopt this scheme when possible.  It is more secure against attacks that compromise your 
backend. It also allows LunaSec to load and work more quickly and reliably, on the frontend, because it is not doing 
any session management redirects. That's especially important for users with slow internet connections.
:::
--->