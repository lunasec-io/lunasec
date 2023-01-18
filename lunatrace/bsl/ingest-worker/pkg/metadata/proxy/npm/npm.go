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
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata/proxy"
	"go.uber.org/fx"
	"net/http"
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
	return r.Run(":" + s.deps.Config.Port)
}

func NewProxy(deps ProxyDeps) proxy.RegistryProxy {
	return &npmProxy{
		deps: deps,
	}
}
