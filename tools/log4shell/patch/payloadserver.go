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
//
package patch

import (
	"embed"
	"fmt"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
	"github.com/rs/zerolog/log"
	"html/template"
	"net/http"
)

type PayloadServer interface {
	Start()
}

type HotpatchPayloadServer struct {
	remotePayloadUrl string
	port int64
	payloadFiles embed.FS
	payloadUrl string
	payload string
}

func NewHotpatchPayloadServer(remotePayloadUrl string, port int64, payloadFiles embed.FS, payload string) PayloadServer {
	return &HotpatchPayloadServer{
		remotePayloadUrl: remotePayloadUrl,
		port: port,
		payloadFiles: payloadFiles,
		payloadUrl: "/Log4ShellHotpatch.class",
		payload: payload,
	}
}

func WithLogging(h http.Handler) http.Handler {
    logFn := func(rw http.ResponseWriter, r *http.Request) {
        uri := r.RequestURI
        method := r.Method
        h.ServeHTTP(rw, r)

        log.Info().
        	Str("uri", uri).
        	Str("method", method).
        	Str("client", r.RemoteAddr).
        	Msg("Log4Shell hotpatch being downloaded by remote client")
    }
    return http.HandlerFunc(logFn)
}

func (s *HotpatchPayloadServer) Start() {
	httpFS := http.FS(s.payloadFiles)
	fileServer := http.FileServer(httpFS)

	landingPageTemplate, err := template.New("landing-page").Parse(constants.PayloadLandingPage)
	if err != nil {
		log.Error().
			Err(err).
			Msg("Unable to parse landing page template")
		return
	}

	landingPageVars := types.LandingPage{
		Payload: s.payload,
	}

	http.Handle(s.payloadUrl, WithLogging(fileServer))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		err = landingPageTemplate.Execute(w, landingPageVars)
		if err != nil {
			log.Error().Err(err).Msg("Unable to template landing page")
		}
	})

	go func() {
		addr := fmt.Sprintf("0.0.0.0:%d", s.port)

		log.Info().
			Str("localAddr", addr).
			Str("remotePayloadUrl", s.remotePayloadUrl).
			Msg("Started live patch payload server, visit this address in your browser to view instructions and warnings")

		err := http.ListenAndServe(addr, nil)
		if err != nil {
			log.Error().
				Err(err).
				Msg("unable to start payload server")
			panic(err)
		}
	}()
}
