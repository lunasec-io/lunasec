package cwe

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestFetchCWEsFromMitre(t *testing.T) {
	cwes, err := FetchCWEsFromMitre()
	assert.Nil(t, err, "error should not be defined when downloading cwes")
	assert.Greater(t, len(cwes.Weaknesses), 0, "there should be more than zero cwes in list")
}
