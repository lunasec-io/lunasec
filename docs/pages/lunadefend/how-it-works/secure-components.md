---
id: "secure-components"
title: "Secure Components"
sidebar_label: "Secure Components"
sidebar_position: 3
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

## iFrame based security
LunaDefend makes it difficult for your front-end web application to leak sensitive data to somebody attacking it.
Even if somebody manages to hack your website and inject their own malicious Javascript code into it, they
aren't able to decrypt the sensitive data that your site displays. The only information that an attacker sees is an
opaque LunaDefend Token.

While it's painful an attacker, it's easy for you to implement. You just swap out React elements like an `<input>`
with the LunaDefend equivalent `<SecureInput>`.

Behind the scenes, those components load cross-origin `iFrames` from a server on a separate domain, typically a subdomain of your website.
The iFrames communicate 
with your application over a `postmessage` based communication system, implemented behind the scenes.  They copy and imitate 
the CSS styling of your page and
attempt to mimic other browser behaviors like focus/blur, in addition creating and retrieving LunaDefend Tokens.

:::info Supported Frameworks
React is fully supported and a Vue SDK is in pre-alpha.  A generic web-component based SDK for use with any framework is planned.
:::

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
// If a token is passed to SecureInput, it will pre-fill the field.
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

:::tip
Documentation for the full set of Secure Components can be found in the [Getting Started guide](/pages/lunadefend/getting-started/dedicated-tokenizer/frontend-setup/).
:::
### User Experience
 
Simply replacing an `<input>` element with an `<iframe>` would result in your `<form>`
no longer functioning at all.

That's where LunaDefend comes in. We've gone to a lot of effort re-implementing the APIs of common HTML elements like
`<input>` in our Secure Components SDK. Components reserve CSS styling, lifecycle hooks like `onBlur`, and even perform validation on the data. 
It's designed to work 1:1 with existing apps to make migrating to LunaDefend simple. 

The LunaDefend Demo App shows a SecureInput working seamlessly with Material UI.  

### Why is splitting data across websites more secure?

As we've covered, LunaDefend relies on the strong protections that web browsers use in order to isolate data on different websites.
The iFrame and Dedicated Tokenizer run on a different domain. Typically this is a subdomain of your main site, for instance `secure.your-website.com`.
In addition to isolation, the separate context allows LunaDefend to load a very strict CSP (content security policy) for the iFrame.  

One of the main protections of the CSP is the
[Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). It's the functionality 
that prevents a random website from reading the data from another one, such as your bank or your email.

Maintaining the usefulness of the CSP in a large, real world application is difficult or sometimes downright impossible. 
In order to activate the strong protections granted by the Same-Origin Policy, LunaDefend handles sensitive data only in that separate site (the iFrame).
