---
id: "introduction"
title: "Introduction"
sidebar_label: "Introduction"
sidebar_position: 1
---

## What is LunaSec?
LunaSec makes it easy and secure for applications to process and store sensitive data through *Tokenization*. 

Sensitive data is exchanged for a non-sensitive token that is meaningless by itself.  It must be exchanged
for the real data in a process called *Detokenization*.

LunaSec offers more attack protection than other tokenizers, has more features, and the core of the system is free and open source.

LunaSec can quickly help an app become secure and regulation compliant.

A list of features can be found [here](../features).

## How does LunaSec work with my app?
```tsx title="A React form secured with LunaSec"
import React from 'react';
import {SecureForm, SecureInput} from '@lunasec/react-sdk';

// Secure components send their contents to your LunaSec server.
// SecureInput now returns a token instead of the actual SSN.
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

You will need to add a
LunaSec library to your frontend(as shown here), another to your backend, and to host a copy of the Tokenizer Backend 
server. For instructions, follow the [Getting Started guide](/pages/getting-started/dedicated-tokenizer/introduction).

This framework is designed by security engineers to drop in to existing apps with minimal code changes.
That way you don't need to audit or rewrite everything from scratch to become secure and compliant.  The parts of the system
that touch sensitive data will have already been secured and audited by our team.

If you're unsure of what level of security you need, please [contact us](https://www.lunasec.io/contact). We offer paid, professional support to accelerate onboarding time and to ensure your deployment
meets your security goals.

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

Using LunaSec the data is entered and stored separately from your main application, even on the frontend.  You store in the database a token
like: `lunasec-351d1033-0e9f-4a1b-bbb6-adec04837a5c`.  Instead of the sensitive text or file, a successful attacker gets that token, 
and there's not much they can do with it. The token is not the full decryption key, only part of it.  The other required pieces can
only be accessed from within the Dedicated Tokenizer Service, where authentication for the user can be checked, audit logs can be produced, 
and keys can be rotated if necessary.  

LunaSec provides controls for where and by whom those tokens can be exchanged for sensitive data.  An attacker with the token can't get
past those unless they compromise multiple parts of the system which have been designed by our team to be hardened against attack.

## Who is LunaSec for? 
LunaSec is designed for web apps that need to store sensitive data and operate in real-world, production environments.  It is fast,
mostly open-source, inexpensive to host, and nearly infinitely scalable.

It can be used to ensure the security of new web apps or can be retrofitted into existing applications quickly.  The point is that it is
much faster, cheaper, and easier than security auditing and overhauling your entire application, a notoriously difficult and expensive process.

Software security is often overlooked or deemed too difficult/expensive to implement properly. By isolating sensitive parts of the application, LunaSec
helps developers protect sensitive information without having to worry about the security of every line
they write or library they import.  To see a list of the most common vulnerabilities and how LunaSec protects you from them, [click here](/pages/overview/security/mitre-cwe-top-25-weaknesses).

If you've ever been hacked or struggled with lengthy security reviews, painful compliance requirements, or otherwise jumped through
hoops for "data security" or "compliance", then it's likely that LunaSec can help you.

## Why is LunaSec better?
It's not just for looks.  The other tokenization tools we have audited can make an application compliant with laws and regulations, but they don't actually secure
data against a number of common attacks. LunaSec *actually* protects your data, even in the browser.

LunaSec is open mainly open source.  Most security tools are hard to use, closed source, or both. We believe that open source is the best choice for production software.

LunaSec is simple for normal developers without an advanced understanding of software security or cryptography.
LunaSec does its best to provide clean and easy APIs, ship with plenty of examples and docs, and will always be open source or source available so that you can debug, understand, or even fix problems yourself.

You can start integrating LunaSec right now. Most of the security vendor software we've used takes months to get onboarded with due to a lengthy sales process.
After signup, you can be blocked when the black box VM image they give you ships with bugs.
You can't patch the bugs because you can't change the source code. You're stuck.

We've seen some security vendors move away from VM images towards "hosted SaaS" solutions instead.
These solutions have their own downsides because they don't live in your infrastructure.
You can't run them on your laptop or in your CI for testing. And, if they have downtime or bad performance, your software inherits those problems too.
They're still black boxes.

In summary, LunaSec is a largely open-source piece of software that you can start using right now and host, change, and extend as needed.

#### No Proxy Required
LunaSec is not a proxy. There is no schema of sensitive fields to maintain, that configuration is in your code.

LunaSec works as a "sidecar" in your frontend and backend to provide security.
That means if your LunaSec instance is down it won't take your entire application offline.

#### Your configuration lives in your code
Store all configuration files in source control so that you can perform meaningful code reviews + track history.
This also lets you test your changes in CI _before_ they roll out to production.
You don't need to tweak any dashboard settings when deployments happen, the changes go with your code.

#### Development == Production
Your development environment will match your production environment, because LunaSec runs in both.  Our scripts 
will set up AWS Localstack automatically, meaning the whole system can run on your development machine with next to no configuration.
Once installed, you don't even need internet access.
No more chasing bugs that only exist in production, or tunneling your dev instance to production because you can't host locally.

#### Works with GraphQL and Express natively (or gRPC)
Our library integrates with Express and GraphQL natively, and can be extended to work with any protocol.

## Who wrote it?
All software is supported by the LunaSec company. We are a Venture-funded, YCombinator-backed company founded in 2019 and based in Seattle, WA.

The LunaSec Stack is composed of many, mostly open source, products that are designed and maintained by the Security Engineers at LunaSec.  We built them using the lessons we learned working as Security Engineers at Uber, Snapchat, Capital One,
and from our experience helping 50+ other YCombinator startups level up their security.