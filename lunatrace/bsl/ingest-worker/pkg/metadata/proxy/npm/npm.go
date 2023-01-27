// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
package npm

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-jet/jet/v2/postgres"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/proxy"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/visualizer"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"

	"go.uber.org/fx"

	. "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/table"
)

type ProxyDeps struct {
	fx.In

	Config proxy.Config
	DB     *sql.DB
}

type npmProxy struct {
	deps ProxyDeps
}

func JSONMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Content-Type", "application/json")
		c.Next()
	}
}

var (
	releasesForPackageCache = map[string][]string{}
	depsForPackageCache     = map[string][]visualizer.Dep{}
)

func (s *npmProxy) handleGetReleasesForPackage(c *gin.Context) {
	packageName := c.Query("package")

	if releases, ok := releasesForPackageCache[packageName]; ok {
		c.JSON(http.StatusOK, visualizer.GetReleasesForPackageResponse{Releases: releases})
	}

	stmt := Package.LEFT_JOIN(
		Release,
		Release.PackageID.EQ(Package.ID),
	).SELECT(
		Release.Version,
	).WHERE(
		Package.Name.EQ(postgres.String(packageName)).
			AND(
				Package.PackageManager.EQ(postgres.NewEnumValue("npm")),
			),
	)

	var out []struct {
		model.Release
	}

	err := stmt.Query(s.deps.DB, &out)
	if err != nil {
		log.Error().
			Err(err).
			Str("package", packageName).
			Msg("failed to query for package releases")
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	var versions []string
	for _, o := range out {
		versions = append(versions, o.Version)
	}
	releasesForPackageCache[packageName] = versions

	c.JSON(http.StatusOK, visualizer.GetReleasesForPackageResponse{
		Releases: versions,
	})
}

func (s *npmProxy) handleGetDepsForPackage(c *gin.Context) {
	packageName := c.Query("package")
	packageVersion := c.Query("version")

	cacheKey := packageName + packageVersion
	if deps, ok := depsForPackageCache[cacheKey]; ok {
		c.JSON(http.StatusOK, visualizer.GetDepsForPackageResponse{
			Deps: deps,
		})
		return
	}

	stmt := Package.LEFT_JOIN(
		Release,
		Release.PackageID.EQ(Package.ID),
	).LEFT_JOIN(
		ReleaseDependency,
		ReleaseDependency.ReleaseID.EQ(Release.ID),
	).SELECT(
		ReleaseDependency.PackageName,
		ReleaseDependency.PackageVersionQuery,
	).WHERE(
		Package.Name.EQ(postgres.String(packageName)).AND(
			Release.Version.EQ(postgres.String(packageVersion)),
		),
	)

	var out []struct {
		model.ReleaseDependency
	}

	err := stmt.Query(s.deps.DB, &out)
	if err != nil {
		log.Error().
			Err(err).
			Str("package", packageName).
			Str("version", packageVersion).
			Msg("failed to query for package dependencies")
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Debug().
		Int("count", len(out)).
		Str("package", packageName).
		Str("version", packageVersion).
		Msg("collected package dependencies")

	var deps []visualizer.Dep
	for _, o := range out {
		deps = append(deps, visualizer.Dep{
			PackageName:         o.PackageName,
			PackageVersionQuery: o.PackageVersionQuery,
		})
	}
	depsForPackageCache[cacheKey] = deps

	c.JSON(http.StatusOK, visualizer.GetDepsForPackageResponse{
		Deps: deps,
	})
}

func (s *npmProxy) handleGetPackage(c *gin.Context) {
	packageName := c.Param("package")
	packageScoped := c.Param("package_scoped")

	formattedPackage := packageName
	if packageScoped != "" {
		// packageName is actually the organization scope now, packageScoped is the name of the package in the scope
		formattedPackage = packageName + "/" + packageScoped
	}

	var (
		doc     []byte
		deleted bool
	)

	row := s.deps.DB.QueryRow(`SELECT doc, deleted FROM npm.revision WHERE id = $1 ORDER BY seq DESC LIMIT 1`, formattedPackage)

	err := row.Scan(&doc, &deleted)
	if err != nil {
		c.Error(err)
		c.JSON(http.StatusNotFound, gin.H{
			"error": "unable to find document for requested package",
		})
		return
	}

	if deleted {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "requested package does not have package document available",
		})
		return
	}

	c.Writer.Write(doc)
}

func (s *npmProxy) Serve() error {
	gin.SetMode(s.deps.Config.Stage)

	r := gin.Default()
	r.Use(JSONMiddleware())

	r.GET("/:package", s.handleGetPackage)
	r.GET("/:package/:package_scoped", s.handleGetPackage)
	r.GET("/package/dependencies", s.handleGetDepsForPackage)
	r.GET("/package/releases", s.handleGetReleasesForPackage)
	return r.Run(":" + s.deps.Config.Port)
}

func NewProxy(deps ProxyDeps) proxy.RegistryProxy {
	return &npmProxy{
		deps: deps,
	}
}
