package util

import "strings"

func NormalizeVersionName(version string) string {
	return strings.ReplaceAll(version, "v", "")
}
