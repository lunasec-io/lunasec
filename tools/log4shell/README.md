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
# Log4Shell

A CLI tool for identifying and patching the Log4Shell vulnerability.

## Usage

### Scanning
Scan directories for known vulnerable Log4j dependencies.

```shell
$ log4shell scan  <dir1> <dir2> ...
```

Output findings to a file in json format with `--output`.

```shell
$ log4shell scan --output findings.json <dir>
... 
$ cat findings.json
{"vulnerable_libraries":[{"path":"test/vulnerable-log4j2-versions/target/dependency/log4j-core-2.0-rc1.jar","file_name":"org/apache/logging/log4j/core/lookup/JndiLookup.class","hash":"39a495034d37c7934b64a9aa686ea06b61df21aa222044cc50a47d6903ba1ca8","version_info":"log4j 2.0-rc1","cve":"CVE-2021-44228"}, ...]}
```

To output findings, as the tool discovers them, in json format, use `--json`.

```shell
$ log4shell scan --json test/vulnerable-log4j2-versions 
{"severity":"10.0","path":"test/vulnerable-log4j2-versions/target/dependency/log4j-core-2.0-rc1.jar","fileName":"org/apache/logging/log4j/core/lookup/JndiLookup.class","versionInfo":"log4j 2.0-rc1","cve":"CVE-2021-44228","time":1639624662,"message":"identified vulnerable path"}
...
```

Depending on what you are scanning, you might run into a wall of warnings like `"WRN unable to open archive error="zip: not a valid zip file"`.
You can disable these by passing `--ignore-warnings`.

```shell
$ log4shell scan --ignore-warnings <dir1> <dir2> ...
```

It can be common to run into symlink'ed jar files, and by default they are resolved. To not have this happen
use the `--no-follow-symlinks` flag.

```shell
$ log4shell scan --no-follow-symlinks <dir1> <dir2> ...
```

You may exclude subdirectories while searching by using `--exclude`. This can be used multiple times in the command to
exclude multiple subdirectories.

```shell
$ log4shell scan --exclude <subdir1> --exclude <subdir2> <dir1> <dir2>
```

### Live Patch
Run a Live Patch server.

```shell
$ log4shell livepatch
```

Read more about how this works [here](https://www.lunasec.io/docs/blog/log4shell-live-patch/).

## Building

```
docker build . -t log4shell
docker run --network=host log4shell
```

or 

Make sure you have Maven installed, then:
```
make build && ./log4shell
```

## Releases

Find the compiled tool for your OS [here](https://github.com/lunasec-io/lunasec/releases/).


## How to manually release to github
```shell
git tag -a v<VERSION>-log4shell -m "<RELEASE NAME>"
git push origin v<VERSION>-log4shell
GITHUB_TOKEN=<GITHUB_PERSONAL_ACCESS_TOKEN> goreleaser release --rm-dist
```