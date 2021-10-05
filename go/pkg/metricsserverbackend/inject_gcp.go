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

//go:build wireinject
// +build wireinject

package metricsserverbackend

import (
	"context"
	"database/sql"
	"fmt"
	"net/url"

	"github.com/google/wire"
	"gocloud.dev/blob"
	"gocloud.dev/blob/gcsblob"
	"gocloud.dev/gcp"
	"gocloud.dev/gcp/gcpcloud"
	"gocloud.dev/mysql/gcpmysql"
	"gocloud.dev/runtimevar"
	"gocloud.dev/runtimevar/gcpruntimeconfig"
	"gocloud.dev/server"
	pb "google.golang.org/genproto/googleapis/cloud/runtimeconfig/v1beta1"
)

// This file wires the generic interfaces up to Google Cloud Platform (GCP). It
// won't be directly included in the final binary, since it includes a Wire
// injector template function (SetupGCP), but the declarations will be copied
// into wire_gen.go when Wire is run.

// SetupGCP is a Wire injector function that sets up the application using GCP.
func SetupGCP(ctx context.Context, flags *CLIFlags) (*server.Server, func(), error) {
	// This will be filled in by Wire with providers from the provider sets in
	// wire.Build.
	wire.Build(
		gcpcloud.GCP,
		wire.Struct(new(gcpmysql.URLOpener), "CertSource"),
		applicationSet,
		gcpBucket,
		gcpMOTDVar,
		openGCPDatabase,
	)
	return nil, nil, nil
}

// gcpBucket is a Wire provider function that returns the GCS Bucket based on
// the command-line flags.
func gcpBucket(ctx context.Context, flags *CLIFlags, client *gcp.HTTPClient) (*blob.Bucket, func(), error) {
	b, err := gcsblob.OpenBucket(ctx, client, flags.Bucket, nil)
	if err != nil {
		return nil, nil, err
	}
	return b, func() { b.Close() }, nil
}

// openGCPDatabase is a Wire provider function that connects to a GCP Cloud SQL
// MySQL database based on the command-line flags.
func openGCPDatabase(ctx context.Context, opener *gcpmysql.URLOpener, id gcp.ProjectID, flags *CLIFlags) (*sql.DB, func(), error) {
	db, err := opener.OpenMySQLURL(ctx, &url.URL{
		Scheme: "gcpmysql",
		User:   url.UserPassword(flags.DBUser, flags.DBPassword),
		Host:   string(id),
		Path:   fmt.Sprintf("/%s/%s/%s", flags.CloudSqlRegion, flags.DBHost, flags.DBName),
	})
	if err != nil {
		return nil, nil, err
	}
	return db, func() { db.Close() }, nil
}

// gcpMOTDVar is a Wire provider function that returns the Message of the Day
// variable from Runtime Configurator.
func gcpMOTDVar(ctx context.Context, client pb.RuntimeConfigManagerClient, project gcp.ProjectID, flags *CLIFlags) (*runtimevar.Variable, func(), error) {
	variableKey := gcpruntimeconfig.VariableKey(project, flags.RuntimeConfigName, flags.MOTDVar)
	v, err := gcpruntimeconfig.OpenVariable(client, variableKey, runtimevar.StringDecoder, &gcpruntimeconfig.Options{
		WaitDuration: flags.MOTDVarWaitTime,
	})
	if err != nil {
		return nil, nil, err
	}
	return v, func() { v.Close() }, nil
}
