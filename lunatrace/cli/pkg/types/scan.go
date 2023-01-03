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
package types

import (
	"archive/zip"
	"io"
	"os"
	"path"
)

type ReaderAtCloser interface {
	io.ReaderAt
	io.Closer
}

// NopReaderAtCloser returns a ReadCloser with a no-op Close method wrapping
// the provided ReaderAtCloser r.
func NopReaderAtCloser(r io.ReaderAt) ReaderAtCloser {
	return nopCloser{r}
}

type nopCloser struct {
	io.ReaderAt
}

func (nopCloser) Close() error { return nil }

type ZipFileToScan struct {
	File *zip.File
}

type DiskFileToScan struct {
	Filename string
	Path     string
}

type FileToScan interface {
	Name() string
	Reader() (io.ReadCloser, error)
}

func (s *ZipFileToScan) Name() string {
	return s.File.Name
}

func (s *ZipFileToScan) Reader() (io.ReadCloser, error) {
	return s.File.Open()
}

func (s *DiskFileToScan) Name() string {
	return path.Join(s.Path, s.Filename)
}

func (s *DiskFileToScan) Reader() (io.ReadCloser, error) {
	return os.Open(s.Name())
}
