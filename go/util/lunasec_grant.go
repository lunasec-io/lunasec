package util

import (
	"errors"
	"regexp"
)

var base64RegexPattern = "(?:[A-Za-z\\d+/]{4})*(?:[A-Za-z\\d+/]{3}=|[A-Za-z\\d+/]{2}==)"

var lunasecGrantRegex = regexp.MustCompile("^lunasec-grant-(authentication|detokenization)_(" + base64RegexPattern + "\\." + base64RegexPattern + "\\." + base64RegexPattern + ")$")

func ParseLunaSecGrantToGrantTypeAndJwt(s string) (string, string, error) {
	if !lunasecGrantRegex.MatchString(s) {
		return "", "", errors.New("invalid grant")
	}

	grantType := lunasecGrantRegex.FindStringSubmatch(s)[0]
	encodedJwt := lunasecGrantRegex.FindStringSubmatch(s)[1]

	return grantType, encodedJwt, nil
}
