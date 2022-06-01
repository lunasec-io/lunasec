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
# Go monorepo

This monorepo contains all go services and tools that are a part of Lunasec.

### Build

To build an application, specify the *tag* and the *name* for what you want build in this form:
```shell
make <name> tag=<tag>
```

For example, to build the tokenizer cli tool:
```shell
make tokenizer tag=cli
```
