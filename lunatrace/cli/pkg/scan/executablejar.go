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
package scan

import (
	"bytes"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/rs/zerolog/log"
	"io"
	"os"
)

func readerAtStartOfArchive(path string, file *os.File) (reader types.ReaderAtCloser, offset int64, err error) {
	// By default, we assume our original file will be our returned reader
	reader = file

	fileHeader := make([]byte, len(constants.BashHeader))

	_, err = file.ReadAt(fileHeader, 0)
	if err != nil {
		log.Warn().
			Str("path", path).
			Err(err).
			Msg("unable to read header from file")
		return
	}

	/*
		 For the old executable Spring Jar format, it contains a shebang followed by the archive's bytes:

			$ head zipkin-server-2.23.15-exec.jar
			#!/bin/bash
			#
			#    .   ____          _            __ _ _
			#   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
			#  ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
			#   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
			#    '  |____| .__|_| |_|_| |_\__, | / / / /
			#   =========|_|==============|___/=/_/_/_/
			#   :: Spring Boot Startup Script ::
			#
		    ...
		    PK........

			See https://github.com/lunasec-io/lunasec/issues/328
	*/
	if bytes.HasPrefix(fileHeader, []byte(constants.BashHeader)) {
		var fileContents []byte

		fileContents, err = io.ReadAll(file)
		if err != nil {
			log.Warn().
				Str("path", path).
				Err(err).
				Msg("unable to read data from bash executable jar file")
			return
		}

		idx := bytes.Index(fileContents, constants.ZipHeader)
		if idx == -1 {
			log.Warn().
				Str("path", path).
				Err(err).
				Msg("unable to locate start of archive in bash executable jar file")
			return
		}
		reader = types.NopReaderAtCloser(bytes.NewReader(fileContents[idx:]))
		offset = int64(idx)
	}
	return
}
