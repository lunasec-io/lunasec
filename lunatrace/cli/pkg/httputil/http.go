// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
package httputil

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"

	"github.com/rs/zerolog/log"
)

func ParseHostAndPortFromUrlString(urlStr string) (host string, port int64, err error) {
	parsedUrl, err := url.Parse(urlStr)
	if err != nil {
		return
	}

	host = parsedUrl.Hostname()
	port, err = strconv.ParseInt(parsedUrl.Port(), 10, 0)
	return
}

func HttpRequest(method, url string, headers map[string]string, body *bytes.Buffer) (data []byte, err error) {
	defer func() {
		log.Debug().
			Str("data", string(data)).
			Msg("response from http request")
	}()

	if body == nil {
		body = bytes.NewBuffer([]byte{})
	}

	req, err := http.NewRequest(method, url, body)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to create new http request")
		return
	}

	for k, v := range headers {
		req.Header.Add(k, v)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to make http request")
		return
	}
	defer resp.Body.Close()

	data, err = ioutil.ReadAll(resp.Body)

	if resp.StatusCode != http.StatusOK {
		err = fmt.Errorf("error in response: %s", resp.Status)
		return
	}
	return
}
