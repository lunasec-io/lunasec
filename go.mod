module github.com/lunasec-io/lunasec

go 1.17

replace (
	github.com/lunasec-io/lunasec/go => ./go
	github.com/lunasec-io/lunasec/lunatrace/cli => ./lunatrace/cli
	github.com/lunasec-io/lunasec/lunatrace/cli/pkg/inventory => ./lunatrace/cli/pkg/inventory
)
