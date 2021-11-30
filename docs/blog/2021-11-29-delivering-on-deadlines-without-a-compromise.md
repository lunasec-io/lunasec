---
title: Delivering on Deadlines without a Compromise
description: BuildKit intermediate caching in CI
slug: delivering-on-deadlines
authors:
- name: Chris Thompson
  title: Developer at Lunasec
  url: https://github.com/breadchris
  image_url: https://github.com/breadchris.png
  tags: [security, sdlc, hacking, vulnerabilities]
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

Writing a few lines of code is pretty easy. You might have taken an Intro to CS class or taught yourself
from a programming language book and got pretty comfortable going from an idea in your head to code that actually runs.
You probably also have a Github account with a few personal projects that you work on occasionally when
you feel inspired. Looking at the code after some time, you might ask yourself "did I really write this?"
as you notice the same code copy and pasted a few times in odd places. You remind yourself it is ok,
this is just for me, no one else is going to see this.

![personal project](/img/github-repo-of-project.png)

At your job it is a different story. Every line of code you write is important. Pushing a line of broken code
could cause a problem for you, your team, the company, or even customers. Every day you have a standup
or send chat messages with your coworkers making sure the design is being adhered to or if there is a need
to reassess it. There is a board where you and your team keep track of features that need to be added,
bugs that need to be squashed, and code that needs to be refactored, integrated, benchmarked, upgraded, cherry-picked, formatted, etc.

![enterprise fizz buzz](/img/enterprise-fizz-buzz.png)

Where does security come in? Maybe your company requires a security review of your code depending on its criticality,
but does that security engineer really understand enough context about your service to understand your authorization logic?
You might have some [security scanners](https://owasp.org/www-community/Source_Code_Analysis_Tools) that run
and give you a green checkmark, what does that mean? Is your code _provably_ secure now?

![checkmarx application security testing](/img/checkmarx_application-security-testing.png)
*Static analysis tools, such as Checkmarx, have a limited set of vulnerabilities it looks for. Even when a potential
vulnerability is found, think about how much time is needed to verify the vulnerability is real, determine it is important enough to fix, 
write a fix, and then deploy it.*

The most impactful security vulnerabilities are most often found after code has been released. An attacker will have spent
enough time understanding the full context of a vulnerability by investigating how your company's infrastructure works.
Imagine a line of code you wrote or copied from Stack Overflow (or generated with Github Co-Pilot) to ship a feature for
a fast approaching deadline was the line of code used by the hacker to gain access to your company's most sensitive data.
[Bug bounty programs](https://en.wikipedia.org/wiki/Bug_bounty_program) are great for having vulnerabilities like this
reported, but doesn't solve the problem. Your company will still need to have an entire team dedicated to monitoring this
program for fielding reports and then driving their resolution. Even with a bug bounty program, you and your company are
still at the mercy of the hacker and whether they are going to ethically disclose their vulnerability to you or not.

What if security vulnerabilities just simply couldn't exist, or if they did, have them be as useful to an attacker as
dull safety scissors.

What I mean is: Let's make frameworks that are secure by default.

A good example of this in action is the `dangerouslySetInnerHTML` function of the ReactJS framework. ReactJS is a javascript
library for building websites and one of its key features is that it creates a virtual DOM before writing to the page's
actual DOM. Building pages like this means that there is no opportunity for a hacker to inject HTML into the page since
the ReactJS component, which could contain hacker controlled data, only ever treats this data as just data. [Cross-site scripting
(XSS)](https://owasp.org/www-community/attacks/xss/) becomes very difficult to perform, but this also means it becomes very difficult to insert _any_ HTML into a page. A developer
needing to insert some legacy HTML code is not an uncommon task, and should be allowed. This is where `dangerouslySetInnerHTML`
is used. The beauty of this function is that it is an escape hatch for a developer, while at the same time _should_
recognize, by themselves, without need of a security expert telling them,
be using sparingly (unless they like to live `dangerously`, in which case probably, they probably will have it everywhere in their code).

```typescript jsx
function createMarkup(content: string) {
  return {__html: content};
}

function DangerousComponent(content: string) {
  return <div dangerouslySetInnerHTML={createMarkup(content)} />;
}

function SecureComponent(content: string) {
  return <div>{content}</div>;
}
```
*Even though these two components look similar, the `DangerousComponent` contains an XSS vulnerability while the
`SecureComponent` is not vulnerable since React protects code from XSS by default.*

As businesses begin to identify core issues in their technology, which are the catalysts for the innumerable breaches which
happen every year, a stronger push will emerge for shifting the focus of security from _retroactive analysis_ to _proactive protections_.
The secure by default design is not a new idea, but it is a relatively new trend in software security that is just starting to gain traction.
The [Building Security in Maturity Model (BSIMM)](https://www.bsimm.com/) identifies that the majority of large companies are
focused on this task of building security tools for developers in "Integrate and deliver security features" where it is
suggested that companies centralize efforts to deliver security features to its developers to coalesce efforts that
individual teams might be working on, or unaware of.
The sibling project [Software Assurance Maturity Model (SAMM)](https://owaspsamm.org/) by OWASP, echos this point in the Security Architecture section:
["Direct the software design process toward known secure services and secure-by-default designs."](https://owaspsamm.org/model/design/security-architecture/).

The goal of the LunaSec stack is to create drop-in, secure-by-default components which provide the security and compliance
requirements companies are looking for, without any compromise in a team's speed or efficiency when meeting deadlines.

To understand the value that LunaSec provides, let us take a look at some code you might find yourself writing as a web developer:

```typescript jsx
return (
  <>
    <h4>Sensitive Information Collection</h4>
    <form>
      <label>Street Address</label>
      <input type='text' placeholder='123 Blueberry Lane' />
    </form>
  </>
)
```

Looking at this code in isolation, it is impossible to know if a vulnerability exists which could leak the user's address.
What other code is running on the page? Are there any third party scripts that are loaded? Where does the data go when
it gets sent to the backend? Traditionally, it is a knowledgeable developer's job or security engineer's job to review this code,
with the full context of where data comes and goes to identify if there exists a potential security vulnerability.
If even a single path to this or some other code (another file, another service, another datastore, etc.) exists where there
is a vulnerability, then the data entered by the user here is compromised.

Now if we take the same code, and modify it slightly to use a LunaSec component:

```typescript jsx
return (
  <>
    <h4>Sensitive Information Collection</h4>
    <SecureForm>
      <label>Street Address</label>
      <SecureInput type='text' placeholder='123 Blueberry Lane' />
    </SecureForm>
  </>
)
```

Even if the same vulnerable code path or configuration exists, because of the [secure-by-default design](https://lunasec.io/docs/pages/overview/security/intro.md)
of the LunaSec stack, the address of the user cannot be leaked without multiple points of compromise.

We believe that by creating an open source offering, we can build respect with the developers who use the product, trust
with security engineers who review the source code for weaknesses, and generate value for the companies who rely on its effectiveness to thwart hackers.

If you are interested in learning more about what LunaSec has to offer, you can check out our [demo](https://app.lunasec.dev), review our [docs](https://www.lunasec.io/docs/pages/overview/introduction/), and check out the code
[here](https://github.com/lunasec-io/lunasec). For any questions about security in general, [contact us](https://www.lunasec.io/contact), and we will provide
you with best in class security advice from our engineers.

----------
_Credits:_
- Photo of random number generator from [here](https://www.reddit.com/r/badcode/comments/hkxndd/i_mean_its_o1_so_who_cares/?utm_source=share&utm_medium=web2x&context=3)
- Logo of Checkmarx from [here](https://www.gartner.com/pi/vendorimages/checkmarx_application-security-testing_1636037356500.png)