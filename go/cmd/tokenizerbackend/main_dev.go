// +build dev

package main

import (
	"log"

	"github.com/refinery-labs/loq/pkg/tokenizerbackend"
)

func main() {
	log.SetFlags(log.Lshortfile)
	server := tokenizerbackend.NewDevServer()
	log.Fatal(server.ListenAndServe())
}
