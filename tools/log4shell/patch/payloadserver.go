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
	"github.com/rs/zerolog/log"
	"io"
	"net/http"
)

type PayloadServer interface {
	Start()
}

type HotpatchPayloadServer struct {
	payloadFiles embed.FS
	payloadUrl string
}

func NewHotpatchPayloadServer(payloadFiles embed.FS) PayloadServer {
	return &HotpatchPayloadServer{
		payloadFiles: payloadFiles,
		payloadUrl: "/Log4ShellHotpatch.class",
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

	http.Handle(s.payloadUrl, WithLogging(fileServer))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, "Log4Shell Hotpatch service provided by LunaSec. To understand more about this vulnerability please refer to <a href=\"https://log4shell.com\">log4shell.com</a>.")
	})

	go func() {
		addr := fmt.Sprintf("0.0.0.0:%d", constants.HotpatchServerPort)
		log.Info().
			Str("addr", addr).
			Msg("starting hotpatch payload server")
		err := http.ListenAndServe(addr, nil)
		if err != nil {
			log.Error().
				Err(err).
				Msg("unable to start payload server")
			panic(err)
		}
	}()
}
