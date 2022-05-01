---
title: LunaDefend v1 Public Release
description: Celebrating the release of the first fully Open Source data security platform
slug: lunasec-v1-public-release
authors:
- name: Free Wortley
  title: Founder of LunaSec
  url: https://github.com/freeqaz
  image_url: https://github.com/freeqaz.png
tags: [releases, lunasec]
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
We are proud to announce that LunaDefend has hit Version 1.0 and has been publicly released on our 
[GitHub](https://github.com/lunasec-io/lunasec) page. With this release, we've officially hit **stable** and are now 
offering enterprise and open-source support for LunaDefend.

AWS, NodeJS, and React is the fully supported stack at the moment, and now we are hard at work adding support for more environments.

Please take a moment to learn about LunaDefend by reading the rest of this post and trying the [example app](https://www.lunasec.io/docs/pages/lunadefend/overview/demo-app/overview/) (it's really easy).

Read on....
<!--truncate-->

## What problems does LunaDefend solve?
LunaDefend is a data security platform that's designed to work alongside your software to make storing and managing sensitive
data much simpler.

We started with a simple question: Why are so many companies constantly leaking data?

As it turns out, that's actually a very nuanced and difficult question to answer. Most companies _do_ want to securely
store their user's data. They don't want to experience a security breach. They just aren't able to store user data securely because it's not easy
to get right. Even large companies storing highly sensitive data suffer due to simple reasons like not
[updating a dependency](https://arstechnica.com/information-technology/2017/09/massive-equifax-breach-caused-by-failure-to-patch-two-month-old-bug/)
or because of [one engineer's actions](https://www.cnn.com/2019/07/29/business/capital-one-data-breach/index.html) 
being able to bring the whole house of cards down.

There has to be a better way to at least make it _harder_ for companies to be caught with their pants down when it comes to security. It's embarrassing!

## What is LunaDefend?
LunaDefend does a lot, but the main way it works is by replacing sensitive data with meaningless identifiers known as "Tokens". Think of a long
random number like a UUID (eg, `lunasec-a215783b-1f0d-4e2a-8e53-76951b9c60fe`). Your code then only ever deals with these 
Tokens directly. All sensitive data lives in a dedicated encrypted database that's managed by LunaDefend.

A lot of security products do that, but LunaDefend builds more security ontop of that idea, more than anyone else,
because a lot of other pieces are needed to make that encryption actually *secure*.

### The problems are myriad:
- Encryption by itself isn't very useful if somebody can simply query the Database and grab the decryption keys.
- You need to be able to restrict access to decryption keys if you want to be able to meaningfully protect data.
- A logical system is required to determine who is authorized to decrypt data.
- A means of authenticating users to ensure your authorization logic can't be spoofed is necessary.
- A bug in one of your dependencies can bring down the security of the entire system.


How do you effectively address and mitigate such a litany of problems? Does every line of code need to go through a security review now? Do you need an approved list of dependencies and versions now? Does it become necessary to implement organization-wide security procedures that nobody understands or cares about because they're just developers trying to do their job... 

... You get the point!


Once you start adding in all the necessary components to make a secure system, it becomes painful, fast. There
is a lot of complexity to manage. It's simply too much complexity for most developers to deal with while still
doing their jobs. The incentives for security are just not aligned with having security forced onto teams.

That's the problem we aim to solve with LunaDefend: We've built a suite of software libraries and services that you can
integrate directly into your code. They're designed in a way that enables you to split access to sensitive data away 
from your code. That means you're free to develop software without security reviews while also still guaranteeing that 
sensitive data remains safe.

We made a few different levels for how far you may want to integrate LunaDefend.  The deeper you go, [the more protection from attacks you get](https://www.lunasec.io/docs](/pages/lunadefend/overview/security/levels/). 
When you need more protection, you can integrate more protection.

## Why is LunaDefend's approach unique?
Our secret is simple: We're a team of Security Engineers that have also built and shipped production software. 
We've been on both sides of the fence.

Our approach is unique because we have seen how software exists in the real world. Unfortunately, software in the real
world is painful and full of compromises. These compromises degrade security over time and form cracks in the system.
Eventually those cracks cascade and result in security issues like data leaks.

With LunaDefend, we hope to provide the tools and foundation to make it easier to keep data secure. Nothing is completely 
free -- LunaDefend still requires some effort to onboard -- but we hope at least to make it easier than it was before and to
make it simpler for companies to prioritize security in the future.

In that spirit, here are a few reasons we think LunaDefend is unique:

### We know how painful most security tools are to use.
They take weeks to learn. They don't scale. They break and you can't debug them.

That's why we've designed LunaDefend to be [easy to use](https://www.lunasec.io/docs](/pages/lunadefend/overview/demo-app/walkthrough/) 
by Software Developers that aren't experts in security.

### We've seen how painful many security tools are to use or migrate to.
It's easier when you tackle a problem one step at a time. 

That's why LunaDefend is [modular](https://www.lunasec.io/docs](/pages/lunadefend/overview/security/levels/), so that its adoption can be gradual.

### We've seen every company re-invent the wheel time after time.
That's why LunaDefend was made [Open Source](https://github.com/lunasec-io/lunasec/blob/master/LICENSE) under a 
permissive Open Source license (Apache 2.0).

We hope to build a community of like-minded individuals to make security tooling available for everybody to use.


### We've seen how technical debt bogs down developers and prevents them from fixing bugs (even when they would like to).
That's why LunaDefend doesn't require re-writing your software from scratch -- you just simply [drop in a line of code](https://www.lunasec.io/docs](/pages/lunadefend/overview/example-usage/#lunasecreact-sdk)
to get onboard an app.  For example, you can import any NPM module [without fear](https://www.bleepingcomputer.com/news/security/52-percent-of-all-javascript-npm-packages-could-have-been-hacked-via-weak-credentials/)
once you've fully onboarded with LunaDefend.

### We're a business too!
Purely Open Source projects are difficult to get support for because they exist only as passion projects for the maintainers.

We're able to provide paid support and enterprise features because LunaDefend is a business backed by 
[YCombinator](https://www.ycombinator.com/companies/lunasec) and other top Silicon Valley Venture Capital firms.

(Read through our [docs](https://www.lunasec.io/docs](/pages/lunadefend/overview/introduction/) for more context about what LunaDefend
does differently.)

## How to support LunaDefend
If you like what we're doing, and you would like to show your support, we have a few ways that you can help us out:

- Throw us a Star on [Github](https://github.com/lunasec-io/lunasec).
- Post about us on social media and spread the word by telling your friends.
- Try out our [example app](https://www.lunasec.io/docs](/pages/lunadefend/overview/demo-app/overview/) and [tutorials](https://www.lunasec.io/docs](/pages/lunadefend/getting-started/dedicated-tokenizer/introduction/).
- Deploy LunaDefend in your infrastructure ([guide](https://www.lunasec.io/docs](/pages/lunadefend/deployment/deploy-with-aws/)).
- [Contact us](https://www.lunasec.io/contact) about our paid services (premium support, custom onboarding, and enterprise features).

Thank you for being a part of Open Source security software with LunaDefend!

<br/><br/>
