module github.com/lunasec-io/lunasec

go 1.18

// genqlient doesn't have support for omitempty yet, use a patched version
// https://github.com/Khan/genqlient/issues/190
replace github.com/Khan/genqlient => github.com/ajvpot/genqlient v0.4.1-0.20220601222338-9a6fa43de94e

require (
	github.com/Joker/jade v1.1.3
	github.com/Khan/genqlient v0.4.0
	github.com/adrg/xdg v0.4.0
	github.com/anchore/grype v0.36.1
	github.com/anchore/stereoscope v0.0.0-20220406160859-c03a18a6b270
	github.com/anchore/syft v0.46.0
	github.com/apex/gateway v1.1.2
	github.com/aws/aws-lambda-go v1.19.1
	github.com/aws/aws-sdk-go v1.44.12
	github.com/awslabs/aws-lambda-go-api-proxy v0.13.2
	github.com/blang/semver/v4 v4.0.0
	github.com/breadchris/ldapserver v1.1.0
	github.com/cenkalti/backoff/v4 v4.1.3
	github.com/dmarkham/enumer v1.5.5
	github.com/go-git/go-git/v5 v5.4.2
	github.com/google/go-containerregistry v0.8.1-0.20220209165246-a44adc326839
	github.com/google/licensecheck v0.3.1
	github.com/google/uuid v1.3.0
	github.com/lor00x/goldap v0.0.0-20180618054307-a546dffdd1a3
	github.com/pkg/errors v0.9.1
	github.com/prashantv/gostub v1.1.0
	github.com/prometheus/procfs v0.7.3
	github.com/rs/cors v1.8.2
	github.com/rs/zerolog v1.26.1
	github.com/spf13/viper v1.11.0
	github.com/stretchr/testify v1.7.1
	github.com/urfave/cli/v2 v2.6.0
	go.uber.org/config v1.4.0
	go.uber.org/fx v1.17.1
	go.uber.org/zap v1.21.0
	golang.org/x/crypto v0.0.0-20220511200225-c6db032c6c88
	gopkg.in/square/go-jose.v2 v2.6.0
	gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b
)

require go.opentelemetry.io/otel v1.3.0 // indirect
