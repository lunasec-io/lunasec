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
# LunaTrace Go Services

## Vulnerabilities

### ML

#### Scrape
Go through every vulnerability reference, scrape it, and store it to the db (vulns.db in the example command). The formatted content will end up in `normalized_content`.
```shell
go run cmd/ingestworker/main.go vulnerability process --db vulns.db scrape
```

For scraping a specific vulnerability
```shell
go run cmd/ingestworker/main.go vulnerability process --db vulns.db scrape --vuln GHSA-9j49-mfvp-vmhm
```

#### Embeddings

Make sure `.lunatrace.yaml` contains the following:
```yaml
openai:
  api_key: xxx
pinecone:
  api_key: xxx
  environment: xxx
  index: xxx
```

Generate embeddings for scraped references
```shell
go run cmd/ingestworker/main.go vulnerability process --db test.db embedding
```

a specific vulnerability can be embedded
```shell
go run cmd/ingestworker/main.go vulnerability process --db test.db embedding --vuln GHSA-9j49-mfvp-vmhm
```

## Setup analysiscli
```shell
 go build -o bin/analysiscli cmd/analysiscli/main.go
 ln -s /home/breadchris/projects/lunasec/lunatrace/bsl/ingest-worker/bin/analysiscli /home/breadchris/.local/bin/analysiscli
```

## Service Configuration Variables
See the [config](config) folder for the development configurations for each of the services.
For example, the default config for the [ingestworker](config/ingestworker/dev.yaml) looks like this.

```yaml
graphql:
  url: http://localhost:4455/v1/graphql
  secret: myadminsecretkey
db:
  dsn: postgres://postgres:postgrespassword@localhost:5431/lunatrace?sslmode=disable
```

This file will help populate the [config struct](pkg/config/ingestworker/config.go) for the ingestworker. Note that in this config struct
there are environment variables and default values defined. This is not required for local development, but having environment variables defined
for the config options is important for production since fargate does not let you mount a config file to have these values populated. 

Each of the top level fields in the struct represent a configuration for the various [fx modules](https://github.com/uber-go/fx) that a particular service uses.
Not having configuration values defined for an fx module will throw an error during the module loading test and/or runtime. 

To see how a module accesses these configuration variables, you can look at [dbfx](pkg/dbfx/config.go)
```go
package dbfx

type Config struct {
    DSN string `yaml:"dsn"`
}

func NewConfig(provider config.Provider) (config Config, err error) {
    value := provider.Get("db")

    err = value.Populate(&config)
    // ...
}
```

The `dsn` yaml field matches up to the `dsn` that is defined in the development config yaml as well as the `dsn` defined in the [config struct](pkg/config/ingestworker/config.go)
for the ingestworker. dbfx is pulling in this configuration value in locally to be used.

Structuring configuration values in this way lets us reliably reuse the dbfx module across different services easily. For example,
the dbfx module is also being used in the queuehandler and so its configuration for the db is identical to that of the ingestworker:
```yaml
db:
  dsn: postgres://postgres:postgrespassword@localhost:5431/lunatrace?sslmode=disable
```

So there are two types of configs at play, there is the app config which will accept configuration values from the user
(yaml or env vars) (and creates a  config.Provider ) and then the fx module config which is some contained functionality
(connecting to a db) which requires some configuration value. The two are bridged by the config.Provider which will be passed to the fx module:

```go
func NewConfig(provider config.Provider) (config Config, err error) {
    value := provider.Get("db")
```

and the fx module accesses the key from the config where it knows the values exist

