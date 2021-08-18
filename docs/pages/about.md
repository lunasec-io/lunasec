---
sidebar_position: 1
---

# What is the LunaSec Stack?
The goal of the LunaSec Stack is to decrease the developer burden and risk of storing sensitive data in production environments.
The LunaSec Stack is composed of many Open Source products that are designed and maintained by the Security Engineers at LunaSec.

Our suite of libraries, services, and other tools are designed to enable you to run your infrastructure with all of your data encrypted at rest, 
as well as laying the groundwork for adding end-to-end encryption, centralized authorization, service-to-service authentication, and more.

LunaSec products are designed to "drop in" to existing apps with minimal code changes. When fully integrated across the
full stack of the application, LunaSec hardens software to prevent any single security vulnerability from compromising the entire system.

No software is guaranteed to be perfectly secure, but with LunaSec you can easily decrease your risk by an order of
magnitude (or three) _without_ rewriting everything from scratch.

All software is supported by the LunaSec company. We are a Venture-funded, YCombinator-backed company founded in 2019 and based in Seattle, WA. 

Our team built LunaSec using the lessons we learned working as Security Engineers at Uber, Snapchat, Capital One, 
and from our experience helping 50+ other YCombinator startups level up their security.

## Software Components of the LunaSec Stack:
Our software is designed to be incrementally adopted, with every layer adopted protecting you against additional categories of threats.

### LunaSec Data Tokenizer
A suite of "Data Tokenization" libraries and services that let you migrate sensitive data out of existing applications
and replace each record with a unique UUID-like "Token" instead.
This service is the "core" that enables to rest of the LunaSec components to operate.

### LunaSec Token Storage Engine
A hardened key-value database that stores sensitive data and encrypts each record with a unique decryption key.
The reference implementation uses AWS S3 with AES256 encryption.

### LunaSec Secure Authorizers
An "Access Control" service to define centralized authorization rules for decrypting data.
This enables you to tightly control access to sensitive data all from one place instead of in every endpoint or service.

### LunaSec Secure Frame
A secure sandbox that is embedded alongside your front-end React applications.
The Secure Frame replaces data entry forms with drop-in "Secure Form" components that tokenize sensitive data by
default, reduce compliance scope, and protect against Cross-Site Scripting (XSS).

Onboarding is simply replacing your `<form>` and `<input>` elements with our drop-in replacement components.

### LunaSec Secure Function Enclave
A serverside component that is embedded into your existing application code and enables you to seamlessly call functions inside of an ephemeral, sandboxed virtual machine.
Code running inside of the sandbox is able to decrypt data and has
networking disabled by default (all communication happens over local RPC).

Onboarding is simply dropping the SDK into your code, decorating your functions, and building a container with your code.

### LunaSec Secure Auth Proxy
A service that sits between the browser and your backend.
This service centralizes and simplifies user session management,
hardens backend applications by adding request verification with cryptographic signatures,
and provides a secure "gateway" to access other LunaSec services automatically.

### LunaSec CLI
A command line utility that provides a number of functions.
You can use this to manually decrypt data for a given token, deploy LunaSec infrastructure into production, and more.

Out of the box, the CLI uses the AWS CDK to deploy a copy of the LunaSec infrastructure into your AWS account.

### LunaSec Enterprise
We offer commercial support for companies interested in getting extra features, professional support, and access to other tooling we offer.

With our Enterprise service, you get:
- Managed support (onboarding, on-prem deployments, and automatic security patches),
- Advanced disaster recovery tooling and audit tooling,
- Tooling for supporting larger organizations with LDAP integration, a centralized admin dashboard, and other features,
- Support for high availability, high performance, and multi-datacenter use cases,
- Features to further reduce compliance costs and scope (PCI, SOC2, HIPAA, GDPR, etc),
- Additional advanced security modules for ultra-secure data storage,
- Hardware Security Module integrations with FIPS certification.

Please [contact us](https://www.lunasec.io/contact) to learn more.

Note: Our enterprise code is available under a separate "source available" license.

## Who is LunaSec for?
LunaSec is designed for developers building software that needs to store sensitive data and operate in real-world, production environments.
If you've ever struggled with lengthy security reviews, painful compliance requirements, or otherwise jumped through
hoops in the name of "data security" or "compliance", then you'll likely be interested in what LunaSec offers.

Our open source software can be used to enhance the security of new or existing software, and is designed for production
use cases that require _high availability and scalability_ by default. By making security _simple and centralized_ we
hope to unblock developers and enable them to write code _without_ having to worry about the security of every line
they write (or every library they import).

We all know that software security is frequently overlooked in the name of meeting "deadlines" or is otherwise never prioritized by management.
Very few developers are judged by the security of their code -- only on their impact to the business's bottom line.
We aim to fix that by removing the problem of "productivity vs security" by making all code _secure by default_.

## How does LunaSec improve security?
We make software "secure by default" in order to prevent malicious or unintentional exposure of sensitive data
(Social Security Numbers, Driver's License photos, Home addresses, etc).

We bootstrap the security of the system off of a simple idea: In order to open a lock, you need access to both the key _and_ the lock.
Access to only one yields you nothing. A key is not useful without a lock, and a lock is not useful with the key to unlock it.

LunaSec protects against data exposure by encrypting data with a _unique_ encryption key per record.
Instead of storing the unencrypted "plaintext" data in your database, you instead store a _reference_ to that data known as a *token* (the "key").
The encrypted data (or "ciphertext") is then stored in a separate LunaSec database (the "lock").
The token and the ciphertext are never stored _together_ in a single database.

Tokens live in your application and the Ciphertext lives in the vault (which is, by default, AWS S3). Alone, a token is a meaningless string like this: `lunasec-31d88fd2-d193-45b5-b668-f7ebb70498ee`.

Only with a copy of the token _and_ the ciphertext are you able to decrypt the original plaintext.

This process is referred to as "Tokenization" of data and constitutes the basic process that LunaSec builds on top of.
By tokenizing sensitive data, you immediately increase the security of a system by preventing many classes of vulnerabilities in that system from immediately resulting in a data leak.
An actual data leak requires compromise of _both_ databases in order to decrypt the original data.

With LunaSec, you gain a _centralized repository_ where your encrypted, sensitive data lives.
This gives you the ability to enforce strong authorization logic whenever somebody requests the data.
You become the gatekeeper of your encrypted data and you can control _who_ or _when_ decryption is allowed.

And, because the encryption key is never stored alongside the encrypted data, you don't create a "gold mine" of sensitive data.
Even if you break into the vault, you still can't decrypt the data without a copy of the Token that was used to encrypt it.

This is the basic overview of how the LunaSec Tokenization flow protects your data. Every other component of the LunaSec Stack
adds onto this basic example by further hardening your system against unauthorized data access. Every component is additive and,
with LunaSec Stack fully deployed in your environment, you prevent any _individual_ mistake from compromising _everything_ all at once.

Note: This guarantee also applies to every LunaSec component itself.
Even with the ability to break the security of an individual LunaSec service, you still can't compromise the entire system.
We designed _everything_ to be secure by default -- both your code _and_ ours.

## Who built LunaSec?
LunaSec was created by security engineers from companies like Uber, Snapchat, and Capital One with experience working on systems with large quantities of sensitive data.
We built LunaSec because we were frustrated that most "security tools" were inaccessible to developers due to not being production ready or being very difficult to learn/adopt.
And, even worse, developers would often be confused by security tooling and unintentionally implement broken crypto or other bugs.

We built LunaSec to solve these problems for common use cases that we have seen in our careers, from consulting for companies while building LunaSec, and from our lessons working alongside developers building _real, production_ software.

LunaSec itself is a VC-funded, YCombinator-backed company based in Seattle, WA.
We make money by offering paid support and by providing extra features that seamlessly integrate with the Open Source version.
We're an "Open Core" business with code under either an "Open Source" or a "Source Available" license. Source Available means: It's all on Github and you can go read it, but you have to pay us to _legally_ use it in production.

We believe this approach is the best compromise that enables to give back to the Open Source community while still allowing us to build a successful business.

If you're interested in using LunaSec in a production environment, please consider [contacting us](https://www.lunasec.io/contact) about our premium software and support plans.

## What makes LunaSec's approach unique?
Simply put: The LunaSec Stack is better than the alternatives because we optimize for the _real world_ of building software by optimizing for Developer Experience.
Nobody wants to use another confusing library that takes weeks to understand and is impossible to debug.

We built the LunaSec Stack to be _easy to use_, _easy to debug_, and to work with _existing_ code.

That's why our software is Open Source (or "Source Available"), our components are modular, and it's all written in common, statically typed languages like TypeScript and Golang.
If you find our docs lacking, you're confused, or you just want to learn more, then please go [read the source code](https://github.com/lunasec-io/)!

As a part of making our goals attainable, we've designed the LunaSec Stack to be incorporated incrementally into software.
It's not all-or-nothing.
We believe that successfully blending security with the "real world" of modern software when security can be added on an "as needed" basis.

Please follow our guide about how to incrementally add LunaSec components to your production system.

## How does LunaSec encrypt data?
The cryptography and principles behind LunaSec are actually pretty simple to understand.
We didn't invent any new math or create any scientific breakthroughs to build the platform.
With a couple of hours of digging through the source code, you could probably understand enough to build it yourself too!
(And, if you conform to our OpenAPI spec, it'd probably even work with the rest of the LunaSec Stack.)

### Encryption at Rest
Under the hood, we use AES256 to encrypt the data. The implementation of this was written by Amazon as a part of the AWS S3 SDK.

We use S3's serverside encryption by default, in order to minimize performance overhead on mobile phones, to make our SDK have less attack service and implementation complexity, and to allow the encryption algorithm to exist independently of the Tokenizer SDK version used.

Note: If you want to use clientside encryption due to security or compliance requirements, we recommend [contacting us](https://www.lunasec.io/contact) about our hardened Enterprise features.

### Key Storage
You may be wondering about where the encryption key comes from. It's not the Token, but we also don't store

The unique part of what we offer is in _how_ we expose those primitives to you as a developer.
You don't have to read our white paper or a dozen Wikipedia articles to get started.
Just check out our examples and see for yourself.

## Why is LunaSec better?
Most security tools are hard to use, are closed source, or both. Most of them aren't built by developers -- they're built by security experts that have never written production software before.

We designed LunaSec to be _simple_ to use for normal developers _without_ an advanced understanding of software security or cryptography.
That means LunaSec will always provide _clean and easy APIs_, will ship with plenty of _examples and docs_, and will always be _open source_ so that you can debug or fix problems _yourself_.

Most of the security vendor software we've used takes months to get onboarded with due to a lengthy "enterprise sales process".
And, even after you get a contract signed, you're still blocked when the black box VM image they give you ships with production shattering bugs.
You can't patch the bugs because you don't have the source code. You're stuck.

We've seen some security vendors move away from VM images towards "hosted SaaS" solutions instead.
Unfortunately, these solutions are often worse because they don't live in your infrastructure.
You can't run it on your laptop or in your CI for testing. And, if they have downtime or bad performance, your software inherits those problems too.
They're still black boxes.

We don't want to be another one of those companies. We believe that open source is simply _the only choice_ for production software.

## LunaSec Stack Features

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
Code is king. Here's an example of adding Tokenization to a simple React app:
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

We can add tokenization by simply replacing the components used in the form with the LunaSec replacements.
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

The entire LunaSec Stack is designed with the same goal in mind: As easy as possible to get started with.

You can view additional examples and tutorials here.
