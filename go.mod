module github.com/lunasec-io/lunasec

go 1.17

replace (
	lunasec/lunadefend => ./go
	lunasec/lunatrace => ./lunatrace/cli
	lunasec/lunatrace/snapshot => ./lunatrace/cli/pkg/inventory
)
