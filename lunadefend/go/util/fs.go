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
	"archive/tar"
	"compress/gzip"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
)

func GetHomeDirectory(relativeDir string) (dir string, err error) {
	var (
		userHome string
	)

	userHome, err = os.UserHomeDir()
	if err != nil {
		return
	}

	dir = path.Join(userHome, relativeDir)
	err = os.MkdirAll(dir, 0o755)
	return
}

func CopyDirectory(scrDir, dest string) error {
	if err := CreateIfNotExists(dest, 0755); err != nil {
		return err
	}

	entries, err := ioutil.ReadDir(scrDir)
	if err != nil {
		return err
	}
	for _, entry := range entries {
		sourcePath := filepath.Join(scrDir, entry.Name())
		destPath := filepath.Join(dest, entry.Name())

		fileInfo, err := os.Stat(sourcePath)
		if err != nil {
			return err
		}

		switch fileInfo.Mode() & os.ModeType {
		case os.ModeDir:
			if err := CreateIfNotExists(destPath, 0755); err != nil {
				return err
			}
			if err := CopyDirectory(sourcePath, destPath); err != nil {
				return err
			}
		case os.ModeSymlink:
			if err := CopySymLink(sourcePath, destPath); err != nil {
				return err
			}
		default:
			if err := Copy(sourcePath, destPath); err != nil {
				return err
			}
		}

		isSymlink := entry.Mode()&os.ModeSymlink != 0
		if !isSymlink {
			if err := os.Chmod(destPath, entry.Mode()); err != nil {
				return err
			}
		}
	}
	return nil
}

func Copy(srcFile, dstFile string) error {
	out, err := os.Create(dstFile)
	if err != nil {
		return err
	}

	defer out.Close()

	in, err := os.Open(srcFile)
	defer in.Close()
	if err != nil {
		return err
	}

	_, err = io.Copy(out, in)
	if err != nil {
		return err
	}

	return nil
}

func Exists(filePath string) bool {
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return false
	}

	return true
}

func CreateIfNotExists(dir string, perm os.FileMode) error {
	if Exists(dir) {
		return nil
	}

	if err := os.MkdirAll(dir, perm); err != nil {
		return fmt.Errorf("failed to create directory: '%s', error: '%s'", dir, err.Error())
	}

	return nil
}

func CopySymLink(source, dest string) error {
	link, err := os.Readlink(source)
	if err != nil {
		return err
	}
	return os.Symlink(link, dest)
}

func ExtractTgzWithCallback(srcFile string, callback func(filename string, data []byte) (err error)) (err error) {
	f, err := os.Open(srcFile)
	if err != nil {
		return
	}
	defer f.Close()

	gzf, err := gzip.NewReader(f)
	if err != nil {
		return
	}

	tarReader := tar.NewReader(gzf)

	for true {
		var (
			header *tar.Header
		)

		header, err = tarReader.Next()

		if err == io.EOF {
			break
		}

		if err != nil {
			return
		}

		name := header.Name

		switch header.Typeflag {
		case tar.TypeReg: // = regular file
			var data []byte

			data, err = io.ReadAll(tarReader)
			if err != nil {
				return
			}

			err = callback(name, data)
			if err != nil {
				return
			}
		}
	}

	err = nil
	return
}
