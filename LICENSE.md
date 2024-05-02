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
- Business Source License v1.1 ("BSL"), (No longer in use)
- Creative Commons Attribution-ShareAlike 4.0 International.

All source code should have information at the beginning of its respective file 
which specifies its licensing information. Below are sections to provide 
guidance about which licenses apply to which folders of this repository.

_The source code license header is the authority if this document is in conflict.
If you notice any errors, please email us at contact@lunasec.io and we'll fix them._

## Understanding Our Licenses

TL;DR: It's probably Apache 2.0 unless specified. Our code was previously licensed under BSL and has since been fully Open Sourced as Apache 2.0. (LunaSec is no longer a company offering or supporting any of our products here.)

_If you are in doubt or have questions about the license that any code uses, please email us at
contact@lunasec.io and we will be happy to update our docs to clarify._

### Apache 2.0

[View License](./licenses/Apache.txt)

At a high level, we've opted to make the majority of our source code available under the highly
permissive "Apache 2.0" license. Any code that was designed to be incorporated into _your_ codebase
is licensed under Apache 2.0. This license is great for developers using our software and is a
"true" Open Source license.

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
