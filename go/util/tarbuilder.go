package util

import (
	"archive/tar"
	"bytes"
)

type InMemoryFile struct {
	Name, Body string
}

func BuildInMemoryTarFile(files []InMemoryFile) (buf bytes.Buffer, err error) {
	tw := tar.NewWriter(&buf)
	for _, file := range files {
		hdr := &tar.Header{
			Name: file.Name,
			Mode: 0600,
			Size: int64(len(file.Body)),
		}
		if err = tw.WriteHeader(hdr); err != nil {
			return
		}
		if _, err = tw.Write([]byte(file.Body)); err != nil {
			return
		}
	}
	if err = tw.Close(); err != nil {
		return
	}
	return
}
