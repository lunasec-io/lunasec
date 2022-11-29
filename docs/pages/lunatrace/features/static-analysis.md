---
id: "static-analysis"
title: "Static Analysis"
sidebar_label: "Static Analysis"
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

## How does LunaTrace use Static Analysis?

LunaTrace uses Static Analysis to predict the likelihood of exploitation of a vulnerability and prioritize findings
effectively. Vulnerability priority can be increased if a vulnerable code path is easily accessible or decreased if it
is inaccessible.

## Language Support

Static Analysis features are currently supported for JavaScript. Support for more languages is planned.

## Analysis Methods

### Reachability Analysis

#### Not Imported or Called
LunaTrace can detect if a package which contains a vulnerability is declared as a dependency but not imported or called.
These findings are deprioritized because it is not possible to trigger the vulnerability in the application under normal
conditions.

#### Vulnerabile Function Not Called
Certain vulnerabilities in the [Vulnerability Database](../vulnerability-database) contain enchanced metadata including
a function that must be invoked to exploit the vulnerability. When metadata is available, LunaTrace can detect if the
function is called and use it to confirm or deprioritize the finding.
