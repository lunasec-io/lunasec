---
id: "introduction"
title: "Introduction"
sidebar_label: "Introduction"
sidebar_position: 1
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
## What is LunaDefend?
LunaDefend makes it easy and secure for web applications to process and store sensitive data through *Tokenization*. 

Sensitive data is exchanged for a non-sensitive _Token_ that is meaningless by itself.  Tokens must be exchanged
for the raw data in a process called *Detokenization*.

LunaDefend helps to protect yourself from the impact of 0-day exploits by giving you an additional layer of protection 
against data leaks. It's also the only Open Source Tokenization platform being used in production today, and offers
more features than paid alternatives like Very Good Security, HashiCorp Vault, or BlueFin.

With LunaDefend you're able to harden your app against 
[common security problems](/pages/how-it-works/security/introduction/) and become compliant with privacy regulations (SOC2, PCI-DSS, GDPR, HIPAA, etc).

:::info

If you're looking for an even faster compliance solution with hands-on guidance from our team, please [contact us](https://www.lunasec.io/contact)
to inquire about our paid services.

:::

## How does LunaDefend work with my app?

Imagine that you have a simple React form like this. Values are stored as plaintext. An attacker only needs a single vulnerability like Cross-Site Scripting or SQL Injection to leak your data publicly!
```tsx title="Before"
export function renderInsecureComponent(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input name="ssn" value={props.value} onChange={props.onChange} errorHandler={props.handleError} />
      <input type="submit" />
    </form>
  );
}
```

This is the same form with LunaDefend.  `<SecureInput>` now returns a token instead of the actual SSN. An attacker is no longer
able to leak sensitive data, even if the main application is compromised.  The app is now compliant with security regulations.
```tsx title="After"
import {SecureForm, SecureInput} from '@lunasec/react-sdk';

export function renderSecureComponent(props) {
  return (
    <SecureForm onSubmit={props.onSubmit}>
      <SecureInput name="ssn" token={props.value} onChange={props.onChange} errorHandler={props.handleError} />
      <input type="submit" />
    </SecureForm>
  );
}
```
This seamlessly creates an iFrame in your page, isolating the sensitive data completely without any change to how your app looks or functions.

Behind the scenes, the [LunaDefend Stack](/pages/how-it-works/features) has secure "sidecars" for each layer of your full-stack web app.  

## Try it out, live!

You can go check out our [Live Demo](https://app.lunasec.dev) app right now. Sign up and then
you can insert some data into the different Secure Components. All sensitive data in the app is automatically encrypted and decrypted.

In fact, it works seamlessly enough that you probably will mistake the Demo App for any other app.

:::tip
LunaDefend is meant to be invisible, but you
can see it working by inspecting elements on the page and watching your network requests tab.
:::

## Onboard with LunaDefend

We've put in great effort to ensure a high-quality Developer Experience throughout the onboarding process.
A lunch break is all it takes to onboard your app with our SDKs _and_ deploy your own dedicated LunaDefend Stack into 
production.

To check out how we made that possible, please follow our [Getting Started guide](/pages/getting-started/dedicated-tokenizer/introduction).

## How is it that easy?

LunaDefend was designed by Security Engineers to embed into existing apps with minimal code changes.
You don't need to audit or rewrite everything from scratch to become secure and compliant. 

We built it by leveraging our experience working as Application Security engineers to help dozens of startups and teams
at large tech companies reach their security goals.  We were tired of seeing the same problems repeating across teams,
but without any alternatives. That's why we made LunaDefend an Open Source project.

If you'd like our team of Security Engineers to help you learn more about LunaDefend, or to help you reach your security
goals, please [contact us](https://www.lunasec.io/contact). We offer paid, professional support to accelerate onboarding
time and training, as well as security reviews and engagements. 

## Example: Building a site that stores sensitive information
A user on your site might need to upload information like their Social Security Number, a copy of their photo ID, or maybe a PDF containing both.

Now, let's say a ransomware hacker gets some of that secret information through any of these common vulnerabilities:
- SQL injection attack,
- Misconfigured database access,
- Database backups are stolen,
- A malicious library module is added,
- A vulnerability in the database, the operating system, or any other code you depend on
- Cross Site Scripting(XSS)
- Any user with database access shares data (intentionally or unintentionally).

Using LunaDefend the data is entered and stored separately from your main application, even on the frontend.  You store in the database a token
like: `lunasec-351d1033-0e9f-4a1b-bbb6-adec04837a5c`.  Instead of the sensitive text or file, a successful attacker gets that token, 
and there's not much they can do with it. The token is not the full decryption key, only part of it.  The other required pieces can
only be accessed from within the Dedicated Tokenizer Service, where authentication for the user can be checked, audit logs can be produced, 
and keys can be rotated if necessary.  

LunaDefend provides controls for where and by whom those tokens can be exchanged for sensitive data.  An attacker with the token can't get
past those unless they compromise multiple parts of the system which have been designed by our team to be hardened against attack.

## Who is LunaDefend for? 
LunaDefend is designed for web apps that need to store sensitive data and operate in real-world, production environments.  It is fast,
mostly open-source, inexpensive to host, and nearly infinitely scalable.

It can be used to ensure the security of new web apps or can be retrofitted into existing applications quickly.  The point is that it is
much faster, cheaper, and easier than security auditing and overhauling your entire application, a notoriously difficult and expensive process.

Software security is often overlooked or deemed too difficult/expensive to implement properly. By isolating sensitive parts of the application, LunaDefend
helps developers protect sensitive information without having to worry about the security of every line
they write or library they import.  To see a list of the most common vulnerabilities and how LunaDefend protects you from them, [click here](/pages/how-it-works/security/mitre-cwe-top-25-weaknesses).

If you've ever been hacked or struggled with lengthy security reviews, painful compliance requirements, or otherwise jumped through
hoops for "data security" or "compliance", then it's likely that LunaDefend can help you.

## Why is LunaDefend better?
It's not just for looks.  The other tokenization tools we have audited can make an application compliant with laws and regulations, but they don't actually secure
data against a number of common attacks. LunaDefend *actually* protects your data, even in the browser.

LunaDefend is mainly Open Source.  Most security tools are hard to use, closed source, or both. We believe that open source is the best choice for production software.

LunaDefend is simple for normal developers without an advanced understanding of software security or cryptography.
LunaDefend does its best to provide clean and easy APIs, ship with plenty of examples and docs, and will always be open source or source available so that you can debug, understand, or even fix problems yourself.

You can start integrating LunaDefend right now. Most of the security vendor software we've used takes months to get onboarded with due to a lengthy sales process.
After signup, you can be blocked when the black box VM image they give you ships with bugs.
You can't patch the bugs because you can't change the source code. You're stuck.

We've seen some security vendors move away from VM images towards "hosted SaaS" solutions instead.
These solutions have their own downsides because they don't live in your infrastructure.
You can't run them on your laptop or in your CI for testing. And, if they have downtime or bad performance, your software inherits those problems too.
They're still black boxes.

In summary, LunaDefend is a largely open-source piece of software that you can start using right now and host, change, and extend as needed.

#### No Proxy Required
LunaDefend is not a proxy. There is no schema of sensitive fields to maintain, that configuration is in your code.

LunaDefend works as a "sidecar" in your frontend and backend to provide security.
That means if your LunaDefend instance is down it won't take your entire application offline.

#### Your configuration lives in your code
Store all configuration files in source control so that you can perform meaningful code reviews + track history.
This also lets you test your changes in CI _before_ they roll out to production.
You don't need to tweak any dashboard settings when deployments happen, the changes go with your code.

#### Development == Production
Your development environment will match your production environment, because LunaDefend runs in both.  Our scripts 
will set up AWS Localstack automatically, meaning the whole system can run on your development machine with next to no configuration.
Once installed, you don't even need internet access.
No more chasing bugs that only exist in production, or tunneling your dev instance to production because you can't host locally.

#### Works with GraphQL and Express natively (or gRPC)
Our library integrates with Express and GraphQL natively, and can be extended to work with any protocol.

## Who wrote it?
All software is supported by the LunaDefend company. We are a Venture-funded, YCombinator-backed company founded in 2019 and based in Seattle, WA.

The LunaDefend Stack is composed of many, mostly open source, products that are designed and maintained by the Security Engineers at LunaDefend.  We built them using the lessons we learned working as Security Engineers at Uber, Snapchat, Capital One,
and from our experience helping 50+ other YCombinator startups level up their security.
