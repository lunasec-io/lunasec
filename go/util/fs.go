package util

import (
	"archive/tar"
	"compress/gzip"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
)

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

        switch fileInfo.Mode() & os.ModeType{
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