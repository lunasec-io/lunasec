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

Scan a directory for known vulnerable Log4j dependencies.

```shell
log4shell scan <dir>
```

Run a Live Patch server.

```shell
log4shell livepatch
```

## Building

```
docker build . -t log4shell
docker run --network=host log4shell
```

or 

Make sure you have Maven installed, then:
```
./build-payload.sh && go build . && ./log4shell
```

## Releases

Find the compiled tool for your OS [here](https://github.com/lunasec-io/lunasec/releases/).
