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
package util

import (
	"archive/zip"
	"bytes"
	"github.com/rs/zerolog/log"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

func FileExt(path string) string {
	return strings.ToLower(filepath.Ext(path))
}

func searchDir(searchDir string, callback filepath.WalkFunc) {
	err := filepath.Walk(searchDir, callback)
	if err != nil {
		log.Error().
			Err(err).
			Str("searchDir", searchDir).
			Msg("Unable to walk directory")
		panic(err)
	}
}

// SearchDirs walks each search directory calling callback for every located file.
func SearchDirs(searchDirs []string, callback filepath.WalkFunc) {
	for _, dir := range searchDirs {
		searchDir(dir, callback)
	}
}

func ResolveSymlinkFilePathAndInfo(symlinkPath string) (path string, info os.FileInfo, err error) {
	path, err = filepath.EvalSymlinks(symlinkPath)
	if err != nil {
		log.Warn().
			Str("symlinkPath", symlinkPath).
			Err(err).
			Msg("unable to read symlink to file")
		return
	}

	_, err = os.Stat(path)
	if err != nil {
		log.Warn().
			Str("path", path).
			Str("symlinkPath", symlinkPath).
			Err(err).
			Msg("unable to read evaluated path")
		return
	}

	// use file info of the resolved file
	info, err = os.Lstat(path)
	if err != nil {
		log.Warn().
			Str("path", path).
			Err(err).
			Msg("unable to read file info of symlink file")
		return
	}
	return
}

// NewZipFromReader ...
func NewZipFromReader(file io.ReadCloser, size int64) (*zip.Reader, error) {
	in := file.(io.Reader)

	if _, ok := in.(io.ReaderAt); ok != true {
		buffer, err := ioutil.ReadAll(in)

		if err != nil {
			return nil, err
		}

		in = bytes.NewReader(buffer)
		size = int64(len(buffer))
	}

	reader, err := zip.NewReader(in.(io.ReaderAt), size)
	if err != nil {
		return nil, err
	}

	return reader, nil
}

func CopyFile(in, out string) (int64, error) {
	i, e := os.Open(in)
   if e != nil { return 0, e }
   defer i.Close()
   o, e := os.Create(out)
   if e != nil { return 0, e }
   defer o.Close()
   return io.Copy(o, i)
}