package pineconefx

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

type Vector struct {
	ID       string            `json:"id"`
	Values   []float32         `json:"values"`
	Metadata map[string]string `json:"metadata"`
}

type UpsertRequest struct {
	Vectors []*Vector `json:"vectors"`
}

/*
https://github.com/pinecone-io/pinecone-python-client/blob/337a9a11d5/pinecone/core/api_action.py#L13
class WhoAmIResponse(NamedTuple):

	username: str = 'UNKNOWN'
	user_label: str = 'UNKNOWN'
	projectname: str = 'UNKNOWN'
*/
type WhoAmIResponse struct {
	UserName    string `json:"user_name"`
	UserLabel   string `json:"user_label"`
	ProjectName string `json:"project_name"`
}

func getProjectName(environment, apiKey string) (string, error) {
	url := fmt.Sprintf("https://controller.%s.pinecone.io/actions/whoami", environment)

	resp, err := callAPI[any, WhoAmIResponse]("GET", url, apiKey, nil)
	if err != nil {
		return "", err
	}
	return resp.ProjectName, nil
}

func callAPI[Req any, Resp any](method, url, apiKey string, req *Req) (resp Resp, err error) {
	var body io.Reader

	if req != nil {
		var reqBody []byte

		reqBody, err = json.Marshal(req)
		if err != nil {
			return
		}
		body = strings.NewReader(string(reqBody))
	}

	httpReq, err := http.NewRequest(method, url, body)
	if err != nil {
		return
	}

	httpReq.Header.Add("Api-Key", apiKey)
	httpReq.Header.Add("Content-Type", "application/json")

	httpResp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return
	}
	defer httpResp.Body.Close()

	respBody, err := io.ReadAll(httpResp.Body)
	if err != nil {
		return
	}

	err = json.Unmarshal(respBody, &resp)
	if err != nil {
		return
	}
	return
}
