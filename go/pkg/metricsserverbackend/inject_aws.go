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
	"net/url"

	awsclient "github.com/aws/aws-sdk-go/aws/client"
	"github.com/google/wire"
	"gocloud.dev/aws/awscloud"
	"gocloud.dev/blob"
	"gocloud.dev/blob/s3blob"
	"gocloud.dev/mysql/awsmysql"
	"gocloud.dev/runtimevar"
	"gocloud.dev/runtimevar/awsparamstore"
	"gocloud.dev/server"
)

// This file wires the generic interfaces up to Amazon Web Services (AWS). It
// won't be directly included in the final binary, since it includes a Wire
// injector template function (SetupAWS), but the declarations will be copied
// into wire_gen.go when Wire is run.

// SetupAWS is a Wire injector function that sets up the application using AWS.
func SetupAWS(ctx context.Context, flags *CLIFlags) (*server.Server, func(), error) {
	// This will be filled in by Wire with providers from the provider sets in
	// wire.Build.
	wire.Build(
		awscloud.AWS,
		wire.Struct(new(awsmysql.URLOpener), "CertSource"),
		applicationSet,
		awsBucket,
		awsMOTDVar,
		openAWSDatabase,
	)
	return nil, nil, nil
}

// awsBucket is a Wire provider function that returns the S3 Bucket based on the
// command-line flags.
func awsBucket(ctx context.Context, cp awsclient.ConfigProvider, flags *CLIFlags) (*blob.Bucket, func(), error) {
	b, err := s3blob.OpenBucket(ctx, cp, flags.Bucket, nil)
	if err != nil {
		return nil, nil, err
	}
	return b, func() { b.Close() }, nil
}

// openAWSDatabase is a Wire provider function that connects to an AWS RDS
// MySQL database based on the command-line flags.
func openAWSDatabase(ctx context.Context, opener *awsmysql.URLOpener, flags *CLIFlags) (*sql.DB, func(), error) {
	db, err := opener.OpenMySQLURL(ctx, &url.URL{
		Scheme: "awsmysql",
		User:   url.UserPassword(flags.DBUser, flags.DBPassword),
		Host:   flags.DBHost,
		Path:   "/" + flags.DBName,
	})
	if err != nil {
		return nil, nil, err
	}
	return db, func() { db.Close() }, nil
}

// awsMOTDVar is a Wire provider function that returns the Message of the Day
// variable from SSM Parameter Store.
func awsMOTDVar(ctx context.Context, sess awsclient.ConfigProvider, flags *CLIFlags) (*runtimevar.Variable, error) {
	return awsparamstore.OpenVariable(sess, flags.MOTDVar, runtimevar.StringDecoder, &awsparamstore.Options{
		WaitDuration: flags.MOTDVarWaitTime,
	})
}
