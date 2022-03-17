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
Source code in this repository is variously licensed under one of the following licenses:
- Apache License Version 2.0 ("Apache"),
- An Apache compatible license,
- Business Source License v1.1 ("BSL"),
- Creative Commons Attribution-ShareAlike 4.0 International.

All source code should have information at the beginning of its respective file 
which specifies its licensing information. Below are sections to provide 
guidance about which licenses apply to which folders of this repository.

_The source code license header is the authority if this document is in conflict.
If you notice any errors, please email us at contact@lunasec.io and we'll fix them._

## Understanding Our Licenses

TL;DR: It's probably Apache 2.0 unless you see a `bsl` folder somewhere in the path.

Most of our code is Apache 2.0. The rest of our code is under a "source available" license called the
"Business Source License" (or BSL for short).The only components

If it's a library or SDK you download and include in your code from somewhere like NPM, it's going to be Apache 2.0.

If it's a CLI or Sidecar, it's going to be Apache 2.0.

If it's a service we *don't offer* as a SaaS, it's going to be Apache 2.0. (Like LunaDefend)

If it's a service we *offer* as a SaaS, it's might be BSL. (Like LunaTrace)

_If you are in doubt or have questions about the license that any code uses, please email us at
contact@lunasec.io and we will be happy to update our docs to clarify._

### Apache 2.0

[View License](./licenses/Apache.txt)

At a high level, we've opted to make the majority of our source code available under the highly
permissive "Apache 2.0" license. Any code that was designed to be incorporated into _your_ codebase
is licensed under Apache 2.0. This license is great for developers using our software and is a
"true" Open Source license.

### Business Source License v1.1

[View License](./licenses/BSL-LunaTrace.txt)

TL;DR: If you see a folder with `bsl` somewhere in the path of a file, then it's BSL licensed!

Where we've chosen to deviate from Apache 2.0 for source code, we have opted to use a "source
available" license known as the "Business Source License" (BSL for short).

BSL is a new type of license that tries to unify the goals of Open Source software developers with
the goals of those using the software. All code published under our BSL will _eventually_ become
Open Source software under the Apache 2.0 license roughly 3 years after it has been written.

In those first 3 years though, BSL licensed code has certain restrictions that limit how it may be used
_without purchasing a license from us_. These restrictions are defined under the
"Additional Usage Grants" at the top of the license.

Note: These restrictions don't apply if you're using our SaaS (even on the "free tier"). That's because, by using our
SaaS, you're never actually running any BSL-licensed software on your servers. (Our clients don't count because they're
permissively licensed under Apache 2.0.)

**To summarize our BSL license:**
- You're free to use the code without any restrictions for non-production use such as during development,
- You're free to use the code if you're a small business with under $10m USD in annual revenue and under 100 employees,
- You're free to use the code as long as you're not using it to build a SaaS around it,
- You have to email us to ask for written permission if you want to turn off the anonymous analytics that we collect.

If you are worried about these restrictions and how they may impact you, please email us and we can clarify.

In general, our goal is simple: We want to let people use our software as freely as possible while also allowing
ourselves to be paid enough to continue supporting and developing it.

If you'd like to support us, please check out our [SaaS offering](https://www.lunasec.io/) or email us about
purchasing an on-prem license at [sales@lunasec.io](mailto:sales@lunasec.io)

### Creative Commons Attribution-ShareAlike 4.0 International

[View License](./licenses/cc-by-sa-4.0.txt)

All files that are documentation are not "source code" and are distributed under a different "Creative
Commons" license.

This isn't done for any malicious purposes. It's just more complicated because documentation needs to be
licensed differently than ordinary source code. Why? Unfortunately, it's common for documentation to be
copied, modified, and rebranded with minimal indication to the reader that the documentation has been "forked".

The "Creative Commons Attribution-ShareAlike 4.0 International" (CC-BY-SA-4.0) license that we've chosen
is [described by the authors](https://creativecommons.org/licenses/?lang=en) as achieving the following:

> This license lets others remix, adapt, and build upon your work even for commercial purposes, as long as
> they credit you and license their new creations under the identical terms. This license is often compared
> to “copyleft” free and open source software licenses. All new works based on yours will carry the same
> license, so any derivatives will also allow commercial use. **This is the license used by Wikipedia, and
> is recommended for materials that would benefit from incorporating content from Wikipedia and similarly
> licensed projects.**

It's what Wikipedia uses, and it's what many other startups use for their docs too.

## Licenses by Project

Currently, the only project with any source code that is licensed under BSL is the "LunaTrace Web Backend".

The LunaTrace Web Backend is a standalone admin dashboard + database that's designed to work in conjunction with the
other parts of the LunaTrace and LunaDefend software. It's optional and operates as software _outside_
of the the critical path of your deployed servers.

The "sidecar agent", libraries, and other software that are a part of LunaTrace are permissively licensed
under Apache 2.0.

All other packages in this repo are distributed under the Apache 2.0.

Documentation is licensed under the CC-BY-SA-4.0 license.

------------------

Thank you!
- The LunaSec Team
