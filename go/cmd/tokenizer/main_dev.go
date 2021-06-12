// +build dev

package main

import (
	"log"

	"github.com/refinery-labs/loq/pkg/tokenizer"
)

func main() {
	server := tokenizer.NewLocalDevServer()
	log.Fatal(server.ListenAndServe())
}
