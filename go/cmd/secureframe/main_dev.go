// +build dev

package main

import (
	"log"

	"github.com/refinery-labs/loq/pkg/secureframe"
)

func main() {
	log.SetFlags(log.Lshortfile)
	server := secureframe.NewDevServer()
	log.Fatal(server.ListenAndServe())
}
