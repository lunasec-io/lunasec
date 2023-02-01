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
lunatrace-npm-cli
=================

This is the LunaTrace CLI for NPM and Yarn. It is basically a wrapper around the "Arborist" NPM library.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @lunasec/lunatrace-npm-cli
$ lunatrace-npm-cli COMMAND
running command...
$ lunatrace-npm-cli (--version)
lunatrace-npm-cli/0.0.0 darwin-x64 node-v16.13.1
$ lunatrace-npm-cli --help [COMMAND]
USAGE
  $ lunatrace-npm-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`lunatrace-npm-cli show-tree /path/to/tree`](#show-tree)

## `show-tree`

Prints out the NPM dependency tree for the specified path.

```
USAGE
  $ lunatrace-npm-cli show-tree [PROJECT_PATH] 

ARGUMENTS
  PROJECT_PATH  Folder that should contain a package.json and package-lock.json

DESCRIPTION
  Prints out the NPM dependency tree for the specified path.

EXAMPLES
  $ lunatrace-npm-cli show-tree /path/to/tree
  Package tree: 
  cacheable-request@7.0.2
  ... big tree of data ...
```

### Built With

We are using `oclif` to build this CLI. It is a great tool to build CLIs with Node.js and TypeScript!

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
