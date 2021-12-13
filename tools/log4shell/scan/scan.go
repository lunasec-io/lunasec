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
package scan

import (
	"archive/zip"
	"bytes"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"io"
	"io/ioutil"
	"log"
	"os"
)

func scanClassFile(path string, file *zip.File) {
	reader, err := file.Open()
	if err != nil {
		log.Printf("unable to open class file %s in %s: %v", file.Name, path, err)
		return
	}

	fileHash, err := util.HexEncodedSha256FromReader(reader)
	if err != nil {
		log.Printf("unable to hash class file %s in %s: %v", file.Name, path, err)
		return
	}

	if versionInfo, ok := constants.KnownVulnerableClassFileHashes[fileHash]; ok {
		log.Printf("[+] identified vulnerable class path %s in %s - %s", file.Name, path, versionInfo)
	}
}

func scanArchive(path string, file *zip.File) {
	reader, err := file.Open()
	if err != nil {
		log.Printf("unable to open archive %s in %s: %v", file.Name, path, err)
		return
	}
	defer reader.Close()

	buffer, err := ioutil.ReadAll(reader)
	if err != nil {
		log.Printf("unable to read archive %s in %s: %v", file.Name, path, err)
		return
	}

	newPath := path + "::" + file.Name
	archiveReader := bytes.NewReader(buffer)
	archiveSize := int64(len(buffer))

	scanArchiveForVulnerableClassFiles(newPath, archiveReader, archiveSize)
}

func scanFile(path string, file *zip.File) {
	fileExt := util.FileExt(file.Name)
	switch fileExt {
	case constants.ClassFileExt:
		scanClassFile(path, file)
		return
	case constants.JarFileExt, constants.WarFileExt:
		scanArchive(path, file)
		return
	}
}

func scanArchiveForVulnerableClassFiles(path string, reader io.ReaderAt, size int64) {
	zipReader, err := zip.NewReader(reader, size)
	if err != nil {
		log.Printf("unable to open archive %s: %v", path, err)
		return
	}

	for _, zipFile := range zipReader.File {
		scanFile(path, zipFile)
	}
}

func scanLocatedArchive(path string, info os.FileInfo) {
	file, err := os.Open(path)
	if err != nil {
		log.Printf("unable to open %s: %v", path, err)
		return
	}
	defer file.Close()

	scanArchiveForVulnerableClassFiles(path, file, info.Size())
}

// SearchDirsForVulnerableClassFiles walks each search dir looking for .class files in archives which have a hash
// matching a known vulnerable file hash. The search will also recursively crawl nested archives while searching.
func SearchDirsForVulnerableClassFiles(searchDirs []string) {
	locatedFileCallback := func (path string, info os.FileInfo, accessError error) (err error) {
		if accessError != nil {
			log.Printf("unable to access file %s: %v", path, accessError)
			return
		}

		if info.IsDir() {
			return
		}

		fileExt := util.FileExt(path)
		switch fileExt {
		case constants.JarFileExt, constants.WarFileExt:
			scanLocatedArchive(path, info)
		}
		return
	}

	util.SearchDirs(searchDirs, locatedFileCallback)
}
