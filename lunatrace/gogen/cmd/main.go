// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"path"
	"strings"

	"github.com/go-jet/jet/v2/generator/metadata"
	"github.com/go-jet/jet/v2/generator/postgres"
	"github.com/go-jet/jet/v2/generator/template"
	postgres2 "github.com/go-jet/jet/v2/postgres"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
	"github.com/wundergraph/graphql-go-tools/pkg/astprinter"
	"github.com/wundergraph/graphql-go-tools/pkg/introspection"
	"gopkg.in/yaml.v3"

	"github.com/lunasec-io/lunasec/lunatrace/gogen/cmd/graphql"
)

func generateGql() {
	url := "http://localhost:8080/v1/graphql"

	reqBody, err := json.Marshal(map[string]string{
		"query": graphql.IntrospectionQuery,
	})
	if err != nil {
		log.Error().Msg("failed to marshal query")
		return
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(reqBody))
	if err != nil {
		log.Error().Msg("failed to create request")
		return
	}

	req.Header.Add("X-Hasura-Admin-Secret", "myadminsecretkey")
	req.Header.Add("X-Hasura-Role", "service")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Error().Msg("failed to query graphql server")
		return
	}

	res, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Error().Msg("failed to unmarshal response")
		return
	}

	type IntrospectResponse struct {
		Data json.RawMessage `json:"data"`
	}

	var introspectResponse IntrospectResponse

	err = json.Unmarshal(res, &introspectResponse)
	if err != nil {
		log.Error().Msg("failed to read response from server")
		return
	}

	converter := introspection.JsonConverter{}
	buf := bytes.NewBuffer(introspectResponse.Data)
	doc, err := converter.GraphQLDocument(buf)
	if err != nil {
		log.Error().Msg("failed to convert bytes to graphql document")
		return
	}

	outWriter := &bytes.Buffer{}
	err = astprinter.PrintIndent(doc, nil, []byte("  "), outWriter)
	if err != nil {
		log.Error().Msg("failed to write graphql doc schema to bytes")
		return
	}

	schemaOutput := outWriter.Bytes()

	schemaScanner := bufio.NewScanner(bytes.NewReader(schemaOutput))
	formattedSchema := bytes.NewBuffer([]byte{})

	// reserved graphql characters are still present in the schema "__Directive", remove those
	removingLines := false
	for schemaScanner.Scan() {
		line := schemaScanner.Text()

		if strings.Contains(line, "__") && strings.HasSuffix(line, "{") {
			removingLines = true
			continue
		}
		if removingLines && strings.Contains(line, "}") {
			removingLines = false
			continue
		}
		if removingLines {
			continue
		}

		formattedSchema.WriteString(line + "\n")
	}

	err = ioutil.WriteFile("schema.graphql", formattedSchema.Bytes(), 0644)
	if err != nil {
		log.Error().Msg("failed to write schema to schema.graphql")
		return
	}
	log.Info().Msg("Successfully wrote schema to schema.graphql")
}

type GenqlientBinding struct {
	Type string `yaml:"type"`
}

type Genqlient struct {
	Bindings map[string]GenqlientBinding `yaml:"bindings"`
}

func generateSql() {
	file, err := ioutil.ReadFile("genqlient.yaml")
	if err != nil {
		log.Error().Err(err).Msg("failed to read genqlient.yaml")
		return
	}

	var genqlient Genqlient

	err = yaml.Unmarshal(file, &genqlient)
	if err != nil {
		log.Error().Err(err).Msg("failed to parse genqlient.yaml")
		return
	}

	t := template.Default(postgres2.Dialect).
		UseSchema(func(schema metadata.Schema) template.Schema {
			return template.DefaultSchema(schema).
				UseModel(template.DefaultModel().
					UseTable(func(table metadata.Table) template.TableModel {
						return template.DefaultTableModel(table).
							UseField(func(column metadata.Column) template.TableModelField {
								defaultTableModelField := template.DefaultTableModelField(column)

								// TODO (cthompson) this needs more testing, but works for right now
								// if there are problems with generated code, check this out first
								if genqlientType, ok := genqlient.Bindings[column.Name]; ok {
									importPath, importType := path.Split(genqlientType.Type)

									parts := strings.Split(importType, ".")
									importPackage := parts[0]

									defaultTableModelField.Type = template.Type{
										ImportPath: path.Join(importPath, importPackage),
										Name:       importType,
									}
								}
								return defaultTableModelField
							})
					}),
				)
		})

	err = postgres.GenerateDSN(
		"postgres://postgres:postgrespassword@localhost:5431/lunatrace?sslmode=disable",
		"npm",
		"./sqlgen",
	)

	err = postgres.GenerateDSN(
		"postgres://postgres:postgrespassword@localhost:5431/lunatrace?sslmode=disable",
		"package",
		"./sqlgen",
		t,
	)
	if err != nil {
		log.Error().Err(err).Msg("failed to generate jet generated sql")
		return
	}
}

func main() {
	generateGql()

	generateSql()
}
