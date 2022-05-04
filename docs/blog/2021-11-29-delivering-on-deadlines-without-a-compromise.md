---
title: How Data Breaches happen and why Secure by Default software is the future
description: Your software delivery model is broken, but it's not your fault. Delivering on time while also protecting yourself from data breaches is a herculean task. It doesn't have to be though, and we'll show you why!
slug: how-data-breaches-happen-and-why-secure-by-default-software-is-the-future
tags: [security, data-security, data-breaches]
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
from a programming language book, and eventually you became pretty comfortable going from an idea in your head to code 
that actually runs.

You probably have a GitHub account with a few personal projects that you work on occasionally when
you feel inspired. Looking at the code after some time, you might ask yourself "did I really write this?"
It's with a fresh perspective that you notice the same code copy and pasted a few times in odd places. 

For a personal project, that's probably okay. For a professional project involving a team of developers, it can 
quickly become a painful problem.

<!--truncate-->

![personal project](/img/github-repo-of-project.png)

_Example Personal Project_

### Professional Software Development Is Hard Work!

At work, every line of code you push to production is important. Writing a line of broken code
could cause a problem for you, your team, the company, or even customers. Even just adding 
[an extra space](https://github.com/MrMEEE/bumblebee-Old-and-abbandoned/issues/123) can create chaos!

### Constant Vigilance!

![mad eye moody from Harry Potter](/img/mad-eye-moody.jpg)

_Pictured: The author before his morning coffee..._

Every day you either have a stand-up or send chat messages with your coworkers to stay in sync. Constant communication 
ensures the design is being adhered to, or change it when it's not working well. There is likely a task board where you 
and your team keep track of what's being worked on. Features that need to be added,
bugs that need to be squashed, code that needs to be refactored, integrated, benchmarked, upgraded, cherry-picked, formatted, etc.

Keeping up-to-date with your team is a key part of your job, even if it's grueling. We often joke about 
Jira tickets and Java design patterns (like [Enterprise FizzBuzz](https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition)),
but reality is that these tools exist to help you stay organized and avoid stepping on each other's toes.

### Where does security come in?

At many companies, whenever you're working on a project that touches something sensitive or is otherwise critical to the business (like 
[GDPR](https://gdpr.eu/checklist/) or [PCI](https://checkify.com/checklists/pci-compliance-checklist/) compliance),
you're required to undergo a security review before deploying your code to production. This is often a grueling and 
time-consuming process that takes weeks (or months) for a Security Engineer to complete.

Because security reviews are expensive, lengthy, and painful to undergo, they're often reserved only for large changes
like building an entirely new service. Instead, for the rest of the code, security reviews are often replaced in favor 
of [security scanners](https://owasp.org/www-community/Source_Code_Analysis_Tools) that developers run themselves.

### Self-Service Security

![checkmarx application security testing](/img/checkmarx_application-security-testing.png)

_Static analysis tools, such as Checkmarx, have a limited set of vulnerabilities they look for. Even when a potential
vulnerability is found, time is still required to verify the vulnerability is real, determine if it's actually important
enough to fix, write and validate the code to patch it, and finally deploy it._

Unfortunately, security scanners are often more trouble than they're worth. They often create a lot of false positives,
and they often don't have enough information to validate or fix the issues that they find. It's on you as the developer
to sort through the issues and fix them.

That's not even the worst part: The green checkmark the scanner shows you frequently lulls you into a false sense of security.
After all, you spent hours dealing with the issues it told you about! Surely, that means something, right?

Well, unfortunately, even if it _looks like_ you've fixed all the issues with the code, it's often not enough to keep 
attackers from finding bugs anyway.

Frequently, the most impactful security vulnerabilities are found _after_ code has been released. This is really painful
because it gives external entities (like hackers) the opportunity to exploit the bug. By the time you're aware that a
bug is being exploited by somebody, you're on the verge of a PR disaster. You've got to move quickly to patch it, figure
out the impact, and notify all everybody involved of the hack.

### Business > Security

Imagine you needed to ship a feature for a fast approaching deadline. And, as a part of quickly reaching that deadline, you 
imported a line of code from Stack Overflow, generated some code with [GitHub Copilot](https://copilot.github.com/)), or
installed a package from NPM. Because the business needed the feature urgently, and you were only modifying existing code,
you only needed to run the security scanners. No issues found, you're good!

But, a few months later, you're still hacked. Only then do you realize: The line of code used by the hacker to gain 
access to your company's most sensitive data was the one you added without fully understanding the security implications
of it.

You might feel silly, but you shouldn't feel beat yourself up about it because you're not alone. Even 
[Facebook](https://hackaday.com/2021/10/22/supply-chain-attack-npm-library-used-by-facebook-and-others-was-compromised/) 
deals with these types of issues. The needs of the business often trump security, and that's just reality!

### Accepting Reality

A clever solution to this problem is to just _let the hackers hack you_ and to just directly pay them when they find bugs.

For many years now, companies have been creating [Bug Bounty Programs](https://en.wikipedia.org/wiki/Bug_bounty_program)
to directly pay hackers for bugs they find. These programs are great for helping to find, but they only partially remedy
the problem. Your company will likely need to have an entire team dedicated to 
monitoring this program. It takes a lot of time to review reports, validate them, and then work developers to fix the 
issues. That often puts these programs out of scope for smaller teams, or requires outsourcing the triage to
contractors that aren't deep experts of your business.

And, even with a Bug Bounty Program, you're still at the mercy of the hacker. You don't know whether 
they are going to ethically disclose their vulnerability to you or not, or if they can make more money by exploiting it.

### The DevSecOps Movement

The phrase "[DevSecOps](https://www.redhat.com/en/topics/devops/what-is-devsecops)" is used to describe a trend that 
aims to continuously improve the security of software while it is being developed. With a DevSecOps process, developers 
are empowered by security teams to address security requirements directly, rather than waiting for the security team to
perform a code review.

Security Scanners are often employed as a part of DevSecOps, but they're insufficient to rely on alone (for the reasons
described above). Because of that, additional tools and strategies are being employed like 
Secure by Default and Zero Trust Architecture that are designed to make true DevSecOps possible. We'll explain what that
means in the next section.

### Flipping the Equation

What if security vulnerabilities just simply couldn't exist? Or if they did, have them be as useful to an attacker as
dull safety scissors? What if, when a bug is found, it's no longer a security issue?

Those are the questions that have led many companies to implement a 
"[Secure by Default](https://www.ncsc.gov.uk/information/secure-default)" policy for their code. 

A good example of this in action is the `dangerouslySetInnerHTML` function of the ReactJS framework. ReactJS is a Javascript
library for building websites, and one of its key features is that it creates a virtual DOM before writing to the page's
actual DOM. Building pages like this means that there is no opportunity for a hacker to inject HTML into the page since
the ReactJS component, which could contain hacker controlled data, only ever treats this data as just data.

This pattern makes [Cross-Site Scripting(XSS)](https://owasp.org/www-community/attacks/xss/) attacks very difficult to perform
by limiting the number of places they can even be performed. An XSS attack is only possible where `dangerouslySetInnerHTML`
is used. A developer needing to insert some legacy HTML code isn't an uncommon task so XSS still happens, but the beauty
of this function is that it is an escape hatch for a developer. It makes it easier for a developer to realize that what 
they are doing is dangerous. It lets developers remember, without needing a security expert to tell them,
that it must be used sparingly (unless they like to live `dangerously`, in which case probably, they probably will have it everywhere in their code).

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

_Even though these two components look similar, the `DangerousComponent` contains an XSS vulnerability while the
`SecureComponent` is not vulnerable since React protects code from XSS by default._

### The Great Migration

As businesses begin to identify core issues in their technology, many of which are the catalysts for the innumerable breaches which
happen every year, a stronger push will emerge for shifting the focus of security from _retroactive analysis_ to 
_proactive protections_. The Secure by Default design is not a new idea, but it is a relatively new trend in software 
security that is just starting to gain traction along with [Zero Trust Architecture](https://www.nist.gov/publications/zero-trust-architecture).

The [Building Security in Maturity Model (BSIMM)](https://www.bsimm.com/) identifies that the majority of large companies are
focused on this task of building security tools for developers in "Integrate and deliver security features" where it is
suggested that companies centralize efforts to deliver security features to its developers to coalesce efforts that
individual teams might be working on, or unaware of.

The sibling project [Software Assurance Maturity Model (SAMM)](https://owaspsamm.org/) by OWASP, echos this point in 
the Security Architecture section:
["Direct the software design process toward known secure services and secure-by-default designs."](https://owaspsamm.org/model/design/security-architecture/).

### Our Involvement with Security

We're building an Open Source project called [LunaDefend](https://github.com/lunasec-io/lunasec) to help developers address
these problems. The goal of LunaDefend is to create drop-in, Secure by Default components that provide strong security and
compliance guarantees, while not impacting a team's speed or efficiency when meeting deadlines. It's possible through
the clever usage of Data Encryption through a process known as [Tokenization](https://www.lunasec.io/docs/pages/lunadefend/-it-works/tokens/).

Here's an example of the LunaDefend React SDK in action:

```tsx jsx="true"
// This React Component is vulnerable to XSS, and it leaks data to attackers.
export function renderInsecureComponent(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <label dangerouslySetInnerHTML={props.ssnLabel} />
      <input name="ssn" value={props.value} onChange={props.onChange} errorHandler={props.handleError} />
      <input type="submit" />
    </form>
  );
};
```

Now if we take the same code, and modify it slightly to use a LunaDefend component:

```tsx jsx="true"
import {SecureForm, SecureInput} from '@lunasec/react-sdk';

// This is still vulnerable to XSS, but it doesn't leak data to attackers anymore because of LunaDefend.
// The only data that's leaked is an encrypted version of the SSN that does not give an attacker anything valuable.
export function renderInsecureComponent(props) {
  return (
    <SecureForm onSubmit={props.onSubmit}>
      <label dangerouslySetInnerHTML={props.ssnLabel} />
      <SecureInput name="ssn" token={props.value} onChange={props.onChange} errorHandler={props.handleError} />
      <input type="submit" />
    </SecureForm>
  );
};
```

Even if the same vulnerable code path or configuration exists, because of LunaDefend's 
[Secure by Default design](https://lunasec.io/docs/pages/lunadefend/-it-works/security/introduction/), the sensitive user data cannot be leaked without multiple 
points of compromise. (The SSN is encrypted, and decryption happens in a hardened environment with limited surface area
for an attacker to find bugs in.)

### Continuous Security

We believe Secure by Default is the future of Security Software because it's the only way to guarantee security every 
time a developer writes a line of code. It's not just us either -- even the 
[US Government](https://www.forbes.com/sites/forbestechcouncil/2021/09/01/zero-trust-plays-a-key-role-in-the-executive-order-to-improve-the-nations-cybersecurity/)
is adopting this security model now by embracing 
[Zero Trust Architecture](https://www.microsoft.com/en-us/security/business/zero-trust) everywhere!

The next few years will see a lot of companies adopting this model, and we're excited to see what the future holds.

### Help Us Make Secure By Default a Reality!

If you enjoyed this article, please take a moment to star our 
[GitHub repository](https://github.com/lunasec-io/lunasec), share this post with others, and consider adding 
yourself the list of companies protecting their data with LunaDefend.  It's Open Source and free to use!

To get started, you can check out our [Live Demo](https://app.lunasec.dev)
and [Documentation](https://lunasec.io/docs/pages/lunadefend/overview/introduction/) to learn more about what we're building,
how it works, and how to get started using it with your production software.

For any questions about LunaDefends, this post, or about security in general, feel free to [contact us](https://www.lunasec.io/contact).
We're always happy to hear your feedback and learn about the problems people are facing!

----------
_Credits:_
- Photo of random number generator from [here](https://www.reddit.com/r/badcode/comments/hkxndd/i_mean_its_o1_so_who_cares/?utm_source=share&utm_medium=web2x&context=3)
- Logo of Checkmarx from [here](https://www.gartner.com/pi/vendorimages/checkmarx_application-security-testing_1636037356500.png)
- Photo of Mad Eye Moody [here](https://images.ctfassets.net/usf1vwtuqyxm/7dYWcZ42yI2SI0I0qiIo4Y/85daaa4ffeee3938a1a05f388764be76/AlastorMoody_WB_F4_AlastorMoodyAngryInClassroom_Still_080615_Land.jpg?w=914&q=70&fm=jpg)
