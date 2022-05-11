#!/usr/bin/env bash

find . -name '*.go' -print0 | xargs -0 sed -i -e "s|\"lunasec/lunadefend|\"github.com/lunasec-io/lunasec/go|"
find . -name '*.go' -print0 | xargs -0 sed -i -e "s|\"lunasec/lunatrace/snapshot|\"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/snapshot|"
find . -name '*.go' -print0 | xargs -0 sed -i -e "s|\"lunasec/lunatrace|\"github.com/lunasec-io/lunasec/lunatrace/cli|"

rm {go,lunatrace/cli,lunatrace/cli/pkg/snapshot}/go.{sum,mod}
