// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
package util

import (
	"archive/tar"
	"compress/gzip"
	"fmt"
	"io"
	"os"
	"path"

	"github.com/rs/zerolog/log"
)

func ExtractTar(gzipStream io.Reader, dir string, compressed bool) error {
	var err error

	if compressed {
		gzipStream, err = gzip.NewReader(gzipStream)
		if err != nil {
			return fmt.Errorf("NewReader failed: %v", err)
		}
	}

	tarReader := tar.NewReader(gzipStream)

	for true {
		header, err := tarReader.Next()

		if err == io.EOF {
			break
		}

		if err != nil {
			return err
		}

		outFilePath := path.Join(dir, header.Name)

		switch header.Typeflag {
		case tar.TypeDir:
			if err := os.MkdirAll(outFilePath, 0755); err != nil {
				log.Error().
					Err(err).
					Str("out file path", outFilePath).
					Msg("unable to make directory for tar dir")
				return err
			}
		case tar.TypeSymlink:
		case tar.TypeReg:
			outFileDir, _ := path.Split(outFilePath)
			err = os.MkdirAll(outFileDir, 0755)
			if err != nil {
				log.Error().
					Err(err).
					Str("out dir", outFileDir).
					Msg("unable to make directory for tar file path")
				return err
			}

			outFile, err := os.Create(outFilePath)
			if err != nil {
				log.Error().
					Err(err).
					Str("out dir", outFilePath).
					Msg("unable to create file for tar file path")
				return err
			}

			if _, err := io.Copy(outFile, tarReader); err != nil {
				outFile.Close()
				log.Error().
					Err(err).
					Str("out file", outFile.Name()).
					Msg("unable to copy contents of tar file path")
				return err
			}
			outFile.Close()
		default:
			return fmt.Errorf(
				"unknown type: %s in %s",
				string(header.Typeflag),
				header.Name)
		}
	}
	return nil
}
