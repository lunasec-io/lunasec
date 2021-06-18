package util

import (
	"bytes"
	"compress/flate"
	"errors"
	"io"
	"regexp"
	"strings"
)

var lunasecGrantRegex = regexp.MustCompile("^lunasec-grant-(authentication|detokenization)-([1-9A-HJ-NP-Za-km-z])+$")

func GetJwtFromGrant(s string) (string, error) {
	if !lunasecGrantRegex.MatchString(s) {
		return "", errors.New("invalid grant")
	}

	encodedJwt := lunasecGrantRegex.FindStringSubmatch(s)[1]

	decodedGrant := Decode(encodedJwt)

	inflatedGrant := flate.NewReader(bytes.NewReader(decodedGrant))

	jwtBuf := new(strings.Builder)
	_, err := io.Copy(jwtBuf, inflatedGrant)
	if err != nil {
		return "", errors.New("unable to inflate jwt")
	}

	return jwtBuf.String(), nil
}
