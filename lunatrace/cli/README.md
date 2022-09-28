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
# LunaTrace

Quickly collect Software Bill of Materials (SBOM) from your applications, scan for known
vulnerabilities and then identify what running servers contain a vulnerable application.

## Cli Commands

### Log4Shell
The Log4Shell CLI can be found [here](cmd/log4shell/README.md).

### Generating graphql types/client
```shell 
yarn run gq http://localhost:8080/v1/graphql -H "X-Hasura-Admin-Secret: myadminsecretkey" -H "X-Hasura-Role: service" --introspect > ../schema.graphql

go run github.com/Khan/genqlient genqlient.yaml
```

### LunaTrace
This cli command can be placed in your CI to collect application SBOMs.

### LunaTrace 

## Building

```shell
make log4shell
make lunatrace
make lunatrace-agent
```

## Release

```shell
goreleaser release --rm-dist
```

