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
# LunaTrace Semgrep rules

This is a sandbox/incubator for rules that will be put into our analysis engine when scanning dependencies.

## Imported and Called
This rule will locate all instances where a vulnerable package is both imported and called within a file.

```shell
semgrep -c incubator/imported-and-called.yaml code/imported-and-called/match
```

```shell
diff <(semgrep -c incubator/imported-and-called.yaml --json code/imported-and-called/match | jq -r '.results[] | .path' | sort) <(find code/imported-and-called/match -name "*.js" | sort)
```
