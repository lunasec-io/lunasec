module lunasec

go 1.17

require (
	lunasec/lunadefend v1.0.0
	lunasec/lunatrace v1.0.0
)

replace (
	lunasec/lunadefend => ./go
	lunasec/lunatrace => ./lunatrace/cli
	lunasec/lunatrace/inventory => ./lunatrace/cli/pkg/inventory
)
