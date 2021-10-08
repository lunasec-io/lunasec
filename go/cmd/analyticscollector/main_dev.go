//go:build dev

package main

import "github.com/lunasec-io/lunasec-monorepo/pkg/analyticscollector"

func main() {
	analyticscollector.Handler()
}
