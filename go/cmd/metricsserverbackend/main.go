// Copyright 2018 The Go Cloud Development Kit Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// guestbook is a sample application that records visitors' messages, displays a
// cloud banner, and an administrative message.
package main

import (
	"context"
	"flag"
	"github.com/lunasec-io/lunasec-monorepo/pkg/metricsserverbackend"
	"gocloud.dev/server"
	"log"
)

var envFlag string

func main() {
	// Determine environment to set up based on flag.
	cf := new(metricsserverbackend.CLIFlags)
	flag.StringVar(&envFlag, "env", "local", "environment to run under (gcp, aws, azure, or local)")
	addr := flag.String("listen", ":8080", "port to listen for HTTP on")
	flag.StringVar(&cf.Bucket, "bucket", "", "bucket name")
	flag.StringVar(&cf.DBHost, "db_host", "", "database host or Cloud SQL instance name")
	flag.StringVar(&cf.DBName, "db_name", "metricsserverbackend", "database name")
	flag.StringVar(&cf.DBUser, "db_user", "metricsserverbackend", "database user")
	flag.StringVar(&cf.DBPassword, "db_password", "", "database user password")
	flag.StringVar(&cf.MOTDVar, "motd_var", "", "message of the day variable location")
	flag.DurationVar(&cf.MOTDVarWaitTime, "motd_var_wait_time", 1, "polling frequency of message of the day")
	flag.StringVar(&cf.CloudSqlRegion, "cloud_sql_region", "", "region of the Cloud SQL instance (GCP only)")
	flag.StringVar(&cf.RuntimeConfigName, "runtime_config", "", "Runtime Configurator config resource (GCP only)")
	flag.Parse()

	ctx := context.Background()
	var srv *server.Server
	var cleanup func()
	var err error
	switch envFlag {
	case "aws":
		srv, cleanup, err = metricsserverbackend.SetupAWS(ctx, cf)
	case "local":
		// The default MySQL instance is running on localhost
		// with this root password.
		if cf.DBHost == "" {
			cf.DBHost = "localhost"
		}
		if cf.DBPassword == "" {
			cf.DBPassword = "password"
		}
		srv, cleanup, err = metricsserverbackend.SetupLocal(ctx, cf)
	default:
		log.Fatalf("unknown -env=%s", envFlag)
	}
	if err != nil {
		log.Fatal(err)
	}
	defer cleanup()

	// Listen and serve HTTP.
	log.Printf("Running, connected to %q cloud", envFlag)
	log.Fatal(srv.ListenAndServe(*addr))
}

