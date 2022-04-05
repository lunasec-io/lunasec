module lunasec

go 1.17

require gopkg.in/square/go-jose.v2 v2.6.0

require (
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/google/go-cmp v0.5.5 // indirect
	github.com/stretchr/testify v1.7.0 // indirect
	golang.org/x/crypto v0.0.0-20211215165025-cf75a172585e // indirect
	gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b // indirect
)

replace (
	lunasec/lunadefend => ./go
	lunasec/lunatrace => ./lunatrace/cli
	lunasec/lunatrace/snapshot => ./lunatrace/cli/pkg/inventory
)
