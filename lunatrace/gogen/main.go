package gogen

import (
	"bytes"
	"encoding/json"
	"github.com/rs/zerolog/log"
	"io/ioutil"
	"net/http"
)

func main() {
	url := "http://localhost:8080/v1/graphql"

	reqBody, err := json.Marshal(map[string]string{
		"query": introspectionQuery,
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
		log.Error().Msg("failed to read response from server")
		return
	}

	print(res)
}
