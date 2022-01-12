module lunasec

go 1.17

require (
	lunadefend v1.0.0
	lunatrace v1.0.0
	log4shell v1.6.0
)

replace (
	lunadefend => ./go
	lunatrace => ./lunatrace/cli
	log4shell => ./tools/log4shell
)
