package main

import (
	"bytes"
	"encoding/json"
	"github.com/go-jet/jet/v2/generator/postgres"
	_ "github.com/lib/pq"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/cmd/graphql"
	"github.com/rs/zerolog/log"
	"github.com/wundergraph/graphql-go-tools/pkg/astprinter"
	"github.com/wundergraph/graphql-go-tools/pkg/introspection"
	"io/ioutil"
	"net/http"
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

	schemaOutputPretty := outWriter.Bytes()

	err = ioutil.WriteFile("schema.graphql", schemaOutputPretty, 0644)
	if err != nil {
		log.Error().Msg("failed to write schema to schema.graphql")
		return
	}
	log.Info().Msg("Successfully wrote schema to schema.graphql")
}

func generateSql() {
	err := postgres.GenerateDSN("postgres://postgres:postgrespassword@localhost:5431/lunatrace?sslmode=disable", "package", "./sqlgen")
	if err != nil {
		log.Error().Err(err).Msg("failed to generate jet generated sql")
		return
	}
}

func main() {
	generateGql()

	generateSql()
}
