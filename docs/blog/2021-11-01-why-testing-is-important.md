---
title: The Importance of Testing
description: Our philosophy on testing
slug: testing-philosophy
authors:
- name: Free Wortley
  title: Founder of LunaSec
  url: https://github.com/freeqaz
  image_url: https://github.com/freeqaz.png
tags: [testing, CI]
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

This post is meant to give you context about why we worked so hard on our testing setup (and why we assume we're idiots).

<!--truncate-->

### The 100x Engineer
Modern software requirements are brutal.  Not only does software need to support a long list of features, but it also
needs to support millions of users, keep their data secure, and also be built (and fixed) as quickly as possible.

Fortunately, for the modern developer, they don't have to start from scratch.  Resources are available and better than
ever to build software rapidly.

No more physical servers. You have cloud providers!

Stop writing algorithms from scratch. Just import a library!

What used to require an entire company to achieve is now possible to build as a single individual.  
Compared to 20 years ago, we're living in the future.

### Ignorance is bliss...
Unfortunately, it's not always daisies.  By depending on the work of others, you're also entrusting that they did it properly.

For the modern developer, libraries are effectively APIs powered by a magical black box.
What you gain in productivity, you trade for in headaches when the magic runs out.

Debugging dependencies sucks.  After all, you didn't write the code, you only used it.  Find a bug in AWS somewhere?  Good luck!

Using tools is bliss, until it isn't.

### Testing is the key
That's why it's so important for us to ensure that the software we publish as LunaSec is high quality.
With great power comes great responsibility for developers building libraries.

To respect our users, our software must be well-designed, documented, and tested before every release. We
_really_ don't want to be the reason for that bug in your software!

Achieving that means that we need to replicate, as closely as possible, the environment where our software would be used by others.
We need to find the bugs in our code, and fix them, before our users do.

### Coming to terms with being an idiot
Even if you're a good programmer most of the time, you're still an idiot sometimes.  As a former colleague once said...

"You can't remember not to forget!" - A former colleague

If we wanted to live up to our goals of shipping high quality software, we needed to ensure we never skipped a step in our release process.
We needed to automate the process to make it idiot-proof.

That's what led us to build our [CI pipeline](/blog/lunasec-ci).
