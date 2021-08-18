---
sidebar_position: 1
---

# What is LunaSec?
LunaSec is an open source Data Security Platform designed to securely store sensitive data separately from your main application infrastructure (through a process known as "Data Tokenization").

With LunaSec integrated into your stack data leaks _much_ more difficult. 
Simply put: a single bug can no longer compromise the entire security of your system or data. 
We do that by removing all _single points of failure_ from your software in order to make a data leak require _multiple_ bugs simultaneously in order to leak data.

No software is guaranteed to be perfectly secure, but with LunaSec you can easily decrease your risk by an order of magnitude (or three) _without_ rewriting everything from scratch.

## Who should be interested in LunaSec?
LunaSec was designed for developers to be used in real-world production environments with software that needs to store sensitive data. 
If you've ever struggled with lengthy security reviews, painful compliance requirements, or otherwise jumped through hoops in the name of "data security", then you'll likely be interested in what LunaSec offers.

Our open source software can be used to enhance the security of new or existing software, and is designed for production use cases that require _high availability and scalability_ by default.
By making security _simple and centralized_ we hope to unblock developers and enable them to write code _without_ having to worry about the security of every line they write (or every library they import).

We all know that software security is frequently overlooked in the name of meeting "deadlines" or is otherwise never prioritized by management. 
Very few developers are judged by the security of their code -- only on their impact to the business's bottom line.
We aim to fix that by removing the problem of "productivity vs security" by making all code _secure by default_.

## How does LunaSec improve security?
We make software "secure by default" in order to prevent malicious or unintentional exposure of sensitive data (Social Security Numbers, Driver's License photos, Home addresses, etc).

The primary route that LunaSec protects against data exposure is by encrypting data with a _unique_ encryption key per record.
Instead of storing the unencrypted "plaintext" data in your database, you instead store a _reference_ to that data known as a *token*. 
The encrypted data (or "ciphertext") is then stored in a separate LunaSec database (which is, by default, AWS S3). The token and the ciphertext are never stored _together_ in a single database.

By itself, a token is a meaningless piece of data. In order to gain access to the plaintext data, you must also have a copy of the ciphertext.

Only with a copy of the token _and_ the ciphertext are you able to decrypt the original plaintext.

This process is referred to as "Tokenization" of data and constitutes the basic process through which LunaSec works.
By tokenizing sensitive data, you immediately increase the security of a system by preventing many _single points of failure_ in that system from resulting in a data leak.

By having sensitive data encrypted by default, you create a _centralized point of access_ that makes managing _authorization_ of encrypted data simpler. 
And, because the encryption key is never stored alongside the encrypted data, you don't create a "gold mine" of sensitive data. 
An actual data leak requires compromise of _both_ databases in order to decrypt the data.

## Who built LunaSec?
LunaSec was created by security engineers from companies like Uber, Snapchat, and Capital One with experience working on systems with large quantities of sensitive data.
We built LunaSec because we were frustrated that most "security tools" were inaccessible to developers due to not being production ready or being very difficult to learn/adopt.
And, even worse, developers would often be confused by security tooling and unintentionally implement broken crypto or other bugs.

We built LunaSec to solve these problems for common use cases that we have seen in our careers, from consulting for companies while building LunaSec, and from our lessons working alongside developers building _real, production_ software.

Backing LunaSec is a VC-funded, YCombinator backed company providing commercial. 
We provide support for the software, and we also offer additional features for the LunaSec platform under a separate "source available" software license. 
(It's all on Github in a separate folder, you just have to pay us to _legally_ use it in production)

If you're interested in using LunaSec in a production environment with strict uptime, compliance, or security requirements, please [contact us](https://www.lunasec.io/contact) about our premium software and support plans.

## What makes LunaSec's approach unique?
Simply put: LunaSec is better than the alternatives because we optimize for _real world_ security by optimizing for Developer Experience _first_ and security _second_.

The cryptography and principles behind LunaSec are actually pretty simple (and boring) to understand. 
The unique part of what we offer is in _how_ we expose those primitives to you as a developer.
You don't have to read our white paper or a dozen Wikipedia articles to get started.
Just check out our examples and see for yourself.

## Why is LunaSec easier to use?
Most security tools are hard to use, are closed source, or both. Most of them aren't built by developers -- they're built by security experts that have never written production software before.

We designed LunaSec to be _simple_ to use for normal developers _without_ a PHD in mathematics or cryptography.
That means LunaSec will always provide _clean and easy APIs_, will ship with plenty of _examples and docs_, and will always be _open source_ so that you can debug or fix problems _yourself_.

Most of the security vendor software we've used takes months to get onboarded with due to a lengthy "enterprise sales process".
And, even after you get a contract signed, you're still blocked when the black box VM image they give you ships with production shattering bugs.
You can't patch the bugs because you don't have the source code. You're stuck. 

We've seen some security vendors move away from VM images towards "hosted SaaS" solutions instead.
Unfortunately, these solutions are often worse because they don't live in your infrastructure. 
You can't run it on your laptop or in your CI for testing. And, if they have downtime or bad performance, your software inherits those problems too.
They're still black boxes.

We don't want to be another one of those companies. We believe that open source is simply _the only choice_ for production software.

## LunaSec Features

### No Proxy Required
No more dealing with "security proxies" that require manually updating HTTP request schemas in a Web UI every time a new field is added to an endpoint.
LunaSec works as a "sidecar" in your front-end _and_ backend to provide security. 
That means, if your LunaSec instance is down, it won't instantly break your entire app. It will gracefully degrade. (Like real production software should!)

### Everything Lives in Git
Store all configuration files in source control so that you can perform meaningful code reviews + track history.
This also lets you test your changes in CI _before_ they roll out to production. 
No more crappy Web UIs that have to be tweaked every time a deploy rolls out (sensing a theme here?).

The code should be the only source of truth, and we make that possible.

### Development === Production
Your development environment will be one-to-one with your production environment. 
No more chasing bugs that only exist in production, or tunneling your dev instance to production because you can't host locally.

We know how frustrating it is to write software only to have it break in production a few hours later. We've been there. Never again!

### Works with GraphQL (or gRPC)
Because our approach works alongside your front-end code, you can use any non-REST protocol seamlessly.

We also provide enhanced support to make using GraphQL with LunaSec easy. Check out our docs on that here.

### Simple Onboarding
It's so easy, I'm not even going to explain it. 

Just read this code to add Tokenization to a simple React app:
```jsx
import React from 'react';

// A form that renders an input for a user to write their Social Security Number (SSN).
export function renderInsecureComponent(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" value={props.value} onChange={props.onChange} name="ssn" />
      <input type="submit" />
    </form>
  );
}
```

We can add tokenization by simply replacing the components used in the form.
```jsx
import React from 'react';
import {SecureForm, SecureInput} from '@lunasec/react-sdk';

// The returned output from SecureInput is now a token instead of the actual SSN.
// And, if a token is passed to this component, it will automatically be detokenized (or fail if the user is unauthorized).
export function renderSecureComponent(props) {
  return (
    <SecureForm onSubmit={props.onSubmit}>
      <SecureInput type="text" token={props.value} onChange={props.onChange} name="ssn" />
      <input type="submit" />
    </SecureForm>
  );
}
```
