package main

import (
	"github.com/refinery-labs/loq/pkg/tokenizer"
	"log"
)

func startHTTPServer() {
	server := tokenizer.NewHttpServerSidecar()
	log.Fatal(server.ListenAndServe())
}

func main() {
	startHTTPServer()
}
