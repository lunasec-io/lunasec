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
// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package metricsserverbackend

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/aws/aws-sdk-go/aws/client"
	"go.opencensus.io/trace"
	"gocloud.dev/aws"
	"gocloud.dev/aws/rds"
	"gocloud.dev/blob"
	"gocloud.dev/blob/fileblob"
	"gocloud.dev/blob/s3blob"
	"gocloud.dev/mysql/awsmysql"
	"gocloud.dev/postgres"
	"gocloud.dev/runtimevar"
	"gocloud.dev/runtimevar/awsparamstore"
	"gocloud.dev/runtimevar/filevar"
	"gocloud.dev/server"
	"gocloud.dev/server/requestlog"
	"gocloud.dev/server/xrayserver"
	"net/http"
	"net/url"
)

// Injectors from inject_aws.go:

// SetupAWS is a Wire injector function that sets up the application using AWS.
func SetupAWS(ctx context.Context, flags *CLIFlags) (*server.Server, func(), error) {
	client := _wireClientValue
	certFetcher := &rds.CertFetcher{
		Client: client,
	}
	urlOpener := &awsmysql.URLOpener{
		CertSource: certFetcher,
	}
	db, cleanup, err := openAWSDatabase(ctx, urlOpener, flags)
	if err != nil {
		return nil, nil, err
	}
	session, err := aws.NewDefaultSession()
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	bucket, cleanup2, err := awsBucket(ctx, session, flags)
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	variable, err := awsMOTDVar(ctx, session, flags)
	if err != nil {
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	metricsserverbackendApplication := newApplication(db, bucket, variable)
	router := newRouter(metricsserverbackendApplication)
	ncsaLogger := xrayserver.NewRequestLogger()
	v, cleanup3 := appHealthChecks(db)
	xRay := xrayserver.NewXRayClient(session)
	exporter, cleanup4, err := xrayserver.NewExporter(xRay)
	if err != nil {
		cleanup3()
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	sampler := trace.AlwaysSample()
	defaultDriver := _wireDefaultDriverValue
	options := &server.Options{
		RequestLogger:         ncsaLogger,
		HealthChecks:          v,
		TraceExporter:         exporter,
		DefaultSamplingPolicy: sampler,
		Driver:                defaultDriver,
	}
	serverServer := server.New(router, options)
	return serverServer, func() {
		cleanup4()
		cleanup3()
		cleanup2()
		cleanup()
	}, nil
}

var (
	_wireClientValue        = http.DefaultClient
	_wireDefaultDriverValue = &server.DefaultDriver{}
)

// Injectors from inject_local.go:

// SetupLocal is a Wire injector function that sets up the application using
// local implementations.
func SetupLocal(ctx context.Context, flags *CLIFlags) (*server.Server, func(), error) {
	db, err := dialLocalSQL(ctx, flags)
	if err != nil {
		return nil, nil, err
	}
	bucket, err := localBucket(flags)
	if err != nil {
		return nil, nil, err
	}
	variable, cleanup, err := localRuntimeVar(flags)
	if err != nil {
		return nil, nil, err
	}
	metricsserverbackendApplication := newApplication(db, bucket, variable)
	router := newRouter(metricsserverbackendApplication)
	logger := _wireLoggerValue
	v, cleanup2 := appHealthChecks(db)
	exporter := _wireExporterValue
	sampler := trace.AlwaysSample()
	defaultDriver := _wireDefaultDriverValue
	options := &server.Options{
		RequestLogger:         logger,
		HealthChecks:          v,
		TraceExporter:         exporter,
		DefaultSamplingPolicy: sampler,
		Driver:                defaultDriver,
	}
	serverServer := server.New(router, options)
	return serverServer, func() {
		cleanup2()
		cleanup()
	}, nil
}

var (
	_wireLoggerValue   = requestlog.Logger(nil)
	_wireExporterValue = trace.Exporter(nil)
)

// inject_aws.go:

// awsBucket is a Wire provider function that returns the S3 Bucket based on the
// command-line flags.
func awsBucket(ctx context.Context, cp client.ConfigProvider, flags *CLIFlags) (*blob.Bucket, func(), error) {
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
func awsMOTDVar(ctx context.Context, sess client.ConfigProvider, flags *CLIFlags) (*runtimevar.Variable, error) {
	return awsparamstore.OpenVariable(sess, flags.MOTDVar, runtimevar.StringDecoder, &awsparamstore.Options{
		WaitDuration: flags.MOTDVarWaitTime,
	})
}

// inject_local.go:

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
