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
package util

import (
	"archive/zip"
	"bytes"
	"fmt"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/rs/zerolog/log"
	"io"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
	"strings"
)

func ResolveZipFile(zipReader *zip.Reader) types.ResolveArchiveFile {
	return func(path string) (io.ReadCloser, error) {
		return zipReader.Open(path)
	}
}

func ResolveDiskFile(path string) (io.ReadCloser, error) {
	return os.Open(path)
}

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
	if e != nil {
		return 0, e
	}
	defer i.Close()
	o, e := os.Create(out)
	if e != nil {
		return 0, e
	}
	defer o.Close()
	return io.Copy(o, i)
}

// Unzip will decompress a zip archive, moving all files and folders
// within the zip file (parameter 1) to an output directory (parameter 2).
// from: https://golangcode.com/unzip-files-in-go/
func Unzip(reader *zip.Reader, dest string) (filenames []string, err error) {
	var (
		outFile *os.File
		rc      io.ReadCloser
	)

	for _, f := range reader.File {
		// Store filename/path for returning and using later on
		fpath := filepath.Join(dest, f.Name)

		// Check for ZipSlip. More Info: http://bit.ly/2MsjAWE
		if !strings.HasPrefix(fpath, filepath.Clean(dest)+string(os.PathSeparator)) {
			return filenames, fmt.Errorf("%s: illegal file path", fpath)
		}

		filenames = append(filenames, fpath)

		if f.FileInfo().IsDir() {
			// Make Folder
			os.MkdirAll(fpath, os.ModePerm)
			continue
		}

		// Make File
		if err = os.MkdirAll(filepath.Dir(fpath), os.ModePerm); err != nil {
			return filenames, err
		}

		outFile, err = os.OpenFile(fpath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
		if err != nil {
			return filenames, err
		}

		rc, err = f.Open()
		if err != nil {
			return filenames, err
		}

		_, err = io.Copy(outFile, rc)

		// Close the file without defer to close before next iteration of loop
		outFile.Close()
		rc.Close()

		if err != nil {
			return
		}
	}
	return
}

func EnsureDirIsCleanedUp(dir string) {
	constants.CleanupDirs = append(constants.CleanupDirs, dir)
}

func RemoveDirFromCleanup(dir string) {
	var (
		newCleanupDirs []string
	)
	for _, cleanupDir := range constants.CleanupDirs {
		if dir == cleanupDir {
			continue
		}
		newCleanupDirs = append(newCleanupDirs, cleanupDir)
	}
	constants.CleanupDirs = newCleanupDirs
}

func RemoveCleanupDirs() {
	for _, cleanupDir := range constants.CleanupDirs {
		os.RemoveAll(cleanupDir)
	}
}

func ReadFileFromStdin(srcFile *os.File) (err error) {
	_, err = io.Copy(srcFile, os.Stdin)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to read sbom from stdin")
		return
	}
	return
}

func GetFileFromStdin(filename string) (tmpFile *os.File, err error) {
	var (
		name string
	)

	name, err = os.MkdirTemp("", "lunatrace")
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to create temporary directory")
		return
	}

	tmpPath := path.Join(name, filename)
	tmpFile, err = os.Create(tmpPath)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to create temporary file")
		return
	}

	err = ReadFileFromStdin(tmpFile)
	if err != nil {
		defer func() {
			cleanupErr := os.Remove(tmpFile.Name())
			log.Error().
				Err(cleanupErr).
				Msg("unable to clean up temporary file")
		}()

		log.Error().
			Err(err).
			Msg("unable to copy from stdin to temporary file")
		return
	}
	return
}

func CleanupTmpFileDirectory(tmpDir string) {
	log.Debug().
		Str("tmpDir", tmpDir).
		Msg("cleaning up created tmp dir")
	err := os.RemoveAll(tmpDir)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to cleanup temporary directory")
	}
}
