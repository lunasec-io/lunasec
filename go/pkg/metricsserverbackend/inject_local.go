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
	"github.com/google/wire"
	"go.opencensus.io/trace"
	"gocloud.dev/blob"
	"gocloud.dev/blob/fileblob"
	"gocloud.dev/postgres"
	"gocloud.dev/runtimevar"
	"gocloud.dev/runtimevar/filevar"
	"gocloud.dev/server"
	"gocloud.dev/server/requestlog"
)

// This file wires the generic interfaces up to local implementations. It won't
// be directly included in the final binary, since it includes a Wire injector
// template function (SetupLocal), but the declarations will be copied into
// wire_gen.go when Wire is run.

// SetupLocal is a Wire injector function that sets up the application using
// local implementations.
func SetupLocal(ctx context.Context, flags *CLIFlags) (*server.Server, func(), error) {
	// This will be filled in by Wire with providers from the provider sets in
	// wire.Build.
	wire.Build(
		wire.InterfaceValue(new(requestlog.Logger), requestlog.Logger(nil)),
		wire.InterfaceValue(new(trace.Exporter), trace.Exporter(nil)),
		server.Set,
		applicationSet,
		dialLocalSQL,
		localBucket,
		localRuntimeVar,
	)
	return nil, nil, nil
}

// localBucket is a Wire provider function that returns a directory-based Bucket
// based on the command-line flags.
func localBucket(flags *CLIFlags) (*blob.Bucket, error) {
	return fileblob.OpenBucket(flags.Bucket, nil)
}

// dialLocalSQL is a Wire provider function that connects to a MySQL database
// (usually on localhost).
func dialLocalSQL(ctx context.Context, flags *CLIFlags) (*sql.DB, error) {
	var psqlUri = fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", flags.DBUser, flags.DBPassword, flags.DBHost, flags.DBName)

	fmt.Println(psqlUri)

	return postgres.Open(ctx, psqlUri)
}

// localRuntimeVar is a Wire provider function that returns the Message of the
// Day variable based on a local file.
func localRuntimeVar(flags *CLIFlags) (*runtimevar.Variable, func(), error) {
	v, err := filevar.OpenVariable(flags.MOTDVar, runtimevar.StringDecoder, &filevar.Options{
		WaitDuration: flags.MOTDVarWaitTime,
	})
	if err != nil {
		return nil, nil, err
	}
	return v, func() { v.Close() }, nil
}
