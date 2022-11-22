package cwe

import (
	"archive/zip"
	"bytes"
	"encoding/xml"
	"github.com/rs/zerolog/log"
	"io"
	"net/http"
)

// WeaknessCatalog has cwe items
// http://cwe.mitre.org/data/index.html
type WeaknessCatalog struct {
	Weaknesses []Weakness `xml:"Weaknesses>Weakness"`
}

// Weakness has CWE weakness item
type Weakness struct {
	ID                  string `xml:"ID,attr"`
	Name                string `xml:"Name,attr"`
	Description         string `xml:"Description"`
	ExtendedDescription string `xml:"Extended_Description"`
}

func readFile(f *zip.File, cwes *WeaknessCatalog) (err error) {
	src, err := f.Open()
	if err != nil {
		return
	}
	defer src.Close()

	fileContents, err := io.ReadAll(src)
	if err != nil {
		return
	}

	if err = xml.Unmarshal(fileContents, cwes); err != nil {
		return
	}
	return
}

func FetchCWEsFromMitre() (cwes WeaknessCatalog, err error) {
	url := "https://cwe.mitre.org/data/xml/cwec_latest.xml.zip"
	resp, err := http.Get(url)
	if err != nil {
		log.Error().Err(err).Msg("failed to download cwe data")
		return
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Error().Err(err).Msg("failed to read cwe data")
		return
	}

	b := bytes.NewReader(body)

	reader, err := zip.NewReader(b, b.Size())
	if err != nil {
		log.Error().Err(err).Msg("failed to create new zip reader for cwes")
		return
	}

	for _, f := range reader.File {
		err = readFile(f, &cwes)
		if err != nil {
			log.Error().
				Err(err).
				Str("file", f.Name).
				Msg("failed to read and parse file")
			return
		}
	}
	return
}
