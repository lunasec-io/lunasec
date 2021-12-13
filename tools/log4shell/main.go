// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
package main

import (
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/scan"
	"github.com/urfave/cli/v2"
	"log"
	"os"
)

func main() {
	if os.Getenv("DEBUG") != "" {
		log.SetFlags(log.Lshortfile)
	}

	app := &cli.App{
		Name: "log4shell",
		Version: constants.Version,
		Description: "Identify code assets that are vulnerable to the log4shell vulnerability. Read more at log4shell.com.",
		Commands: []*cli.Command{
			{
				Name: "scan",
				Aliases: []string{"s"},
				Usage:   "Scan directories, passed as arguments, for archives (.jar, .war) which contain class files that are vulnerable to the log4shell vulnerability.",
				Action: func (c *cli.Context) error {
					searchDirs := c.Args().Slice()
					log.Printf("scanning directories: %+v", searchDirs)

					scan.SearchDirsForVulnerableClassFiles(searchDirs)
					return nil
				},
			},
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
